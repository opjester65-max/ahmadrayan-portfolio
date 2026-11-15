import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import firebaseConfig from "../../firebase-applet-config.json";

export const SCOPES = [
  "https://www.googleapis.com/auth/drive",
  "https://www.googleapis.com/auth/drive.file",
  "https://www.googleapis.com/auth/drive.readonly",
  "https://www.googleapis.com/auth/spreadsheets",
  "https://www.googleapis.com/auth/spreadsheets.readonly",
];

export const SHEET_TITLE = "Portfolio Contact Submissions";
export const TAB_TITLE = "Submissions";
export const SHEET_HEADERS = ["Timestamp", "Name", "Email", "Subject", "Message"];

const SHEET_ID_STORAGE_KEY = "portfolio_google_sheet_id";

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();
SCOPES.forEach((scope) => provider.addScope(scope));

// Strictly in-memory token caching (never persisted in localStorage/sessionStorage)
let isSigningIn = false;
let cachedAccessToken: string | null = null;

export interface LinkedSheetInfo {
  spreadsheetId: string;
  spreadsheetUrl: string;
  sheetTitle: string;
  createdNew?: boolean;
}

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
  sanitized?: ContactPayload & { timestamp: string };
}

export interface SheetSubmissionResult {
  spreadsheetId: string;
  spreadsheetUrl: string;
  sheetTitle: string;
  updatedRange: string;
  timestamp: string;
  userEmail?: string | null;
}

const STRICT_EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

/**
 * Sanitizes text before writing to Google Sheets to strip control chars
 * and prevent spreadsheet formula injection (=, +, -, @).
 */
export function sanitizeCellInput(
  raw: string,
  options: { maxLength: number; multiline?: boolean }
): string {
  const { maxLength, multiline = false } = options;
  let cleaned = String(raw || "")
    .replace(/\r\n/g, "\n")
    .replace(multiline ? /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g : /[\x00-\x1F\x7F]/g, " ")
    .trim();

  if (!multiline) {
    cleaned = cleaned.replace(/\s+/g, " ");
  } else {
    cleaned = cleaned.replace(/\n{4,}/g, "\n\n\n");
  }

  if (cleaned.length > maxLength) {
    cleaned = cleaned.slice(0, maxLength).trim();
  }

  // Neutralize formula injection prefixes if USER_ENTERED is used
  if (/^[=+\-@]/.test(cleaned)) {
    cleaned = `'${cleaned}`;
  }

  return cleaned;
}

export function validateAndSanitizeSubmission(data: ContactPayload): ValidationResult {
  const errors: Record<string, string> = {};

  const trimmedName = data.name.trim();
  const trimmedEmail = data.email.trim().toLowerCase();
  const trimmedSubject = data.subject.trim();
  const trimmedMessage = data.message.trim();

  if (!trimmedName) {
    errors.name = "Name is required";
  } else if (trimmedName.length < 2) {
    errors.name = "Name must be at least 2 characters";
  } else if (trimmedName.length > 100) {
    errors.name = "Name must be 100 characters or fewer";
  }

  if (!trimmedEmail) {
    errors.email = "Email address is required";
  } else if (trimmedEmail.length > 254 || !STRICT_EMAIL_REGEX.test(trimmedEmail)) {
    errors.email = "Invalid email format (e.g., name@domain.com)";
  }

  if (trimmedSubject.length > 150) {
    errors.subject = "Subject must be 150 characters or fewer";
  }

  if (!trimmedMessage) {
    errors.message = "Message is required";
  } else if (trimmedMessage.length < 5) {
    errors.message = "Message must be at least 5 characters";
  } else if (trimmedMessage.length > 5000) {
    errors.message = "Message must be 5,000 characters or fewer";
  }

  if (Object.keys(errors).length > 0) {
    return { valid: false, errors };
  }

  const timestamp = `${new Date().toISOString().replace("T", " ").slice(0, 19)} UTC`;

  return {
    valid: true,
    errors: {},
    sanitized: {
      timestamp,
      name: sanitizeCellInput(trimmedName, { maxLength: 100 }),
      email: sanitizeCellInput(trimmedEmail, { maxLength: 254 }),
      subject: sanitizeCellInput(trimmedSubject || "Collaboration Request", {
        maxLength: 150,
      }),
      message: sanitizeCellInput(trimmedMessage, { maxLength: 5000, multiline: true }),
    },
  };
}

export const initGoogleAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: (user: User | null) => void
) => {
  return onAuthStateChanged(auth, (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        onAuthSuccess?.(user, cachedAccessToken);
      } else if (!isSigningIn) {
        cachedAccessToken = null;
        onAuthFailure?.(user);
      }
    } else {
      cachedAccessToken = null;
      onAuthFailure?.(null);
    }
  });
};

export const signInWithGoogleForSheets = async (): Promise<{
  user: User;
  accessToken: string;
}> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error("Failed to obtain Google OAuth access token.");
    }
    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = (): string | null => cachedAccessToken;
export const getCurrentGoogleUser = (): User | null => auth.currentUser;

export const disconnectGoogleSheets = async (): Promise<void> => {
  cachedAccessToken = null;
  await auth.signOut();
};

const getSavedSheetId = (): string => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(SHEET_ID_STORAGE_KEY) || "";
  }
  return "";
};

const saveSheetIdReference = (id: string) => {
  if (typeof window !== "undefined" && id) {
    localStorage.setItem(SHEET_ID_STORAGE_KEY, id);
  }
};

const clearSavedSheetId = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(SHEET_ID_STORAGE_KEY);
  }
};

async function fetchSheetMetadata(
  spreadsheetId: string,
  accessToken: string
): Promise<{
  spreadsheetId: string;
  spreadsheetUrl: string;
  sheetId: number;
  sheetTitle: string;
} | null> {
  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(
      spreadsheetId
    )}?fields=spreadsheetId,spreadsheetUrl,properties.title,sheets(properties(sheetId,title))`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  if (res.status === 401) {
    cachedAccessToken = null;
    throw new Error("Google session expired. Please sign in with Google again.");
  }
  if (res.status === 404 || res.status === 403) {
    return null;
  }
  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    throw new Error(errBody?.error?.message || `Sheets API error (${res.status})`);
  }

  const data = await res.json();
  const firstSheet = data.sheets?.[0]?.properties;
  if (!firstSheet) {
    throw new Error("Spreadsheet has no sheets.");
  }

  return {
    spreadsheetId: data.spreadsheetId,
    spreadsheetUrl:
      data.spreadsheetUrl ||
      `https://docs.google.com/spreadsheets/d/${data.spreadsheetId}/edit`,
    sheetId: firstSheet.sheetId ?? 0,
    sheetTitle: firstSheet.title,
  };
}

async function applySheetFormatting(
  spreadsheetId: string,
  sheetId: number,
  sheetTitle: string,
  accessToken: string,
  forceFormat = false
): Promise<void> {
  const headerRange = `${sheetTitle}!A1:E1`;
  const checkRes = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(
      spreadsheetId
    )}/values/${encodeURIComponent(headerRange)}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  let needsHeaders = true;
  if (checkRes.ok) {
    const checkData = await checkRes.json();
    const row1: string[] = checkData.values?.[0] || [];
    const matches = SHEET_HEADERS.every(
      (h, idx) => (row1[idx] || "").trim().toLowerCase() === h.toLowerCase()
    );
    if (matches) {
      needsHeaders = false;
    }
  }

  if (needsHeaders) {
    const putRes = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(
        spreadsheetId
      )}/values/${encodeURIComponent(headerRange)}?valueInputOption=RAW`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          range: headerRange,
          majorDimension: "ROWS",
          values: [SHEET_HEADERS],
        }),
      }
    );

    if (!putRes.ok) {
      const errBody = await putRes.json().catch(() => ({}));
      throw new Error(errBody?.error?.message || "Failed to initialize sheet headers.");
    }
  }

  if (!needsHeaders && !forceFormat) {
    return;
  }

  const columnWidths = [195, 180, 240, 220, 440];
  const requests: any[] = [
    {
      updateSheetProperties: {
        properties: {
          sheetId,
          gridProperties: {
            frozenRowCount: 1,
          },
        },
        fields: "gridProperties.frozenRowCount",
      },
    },
    {
      repeatCell: {
        range: {
          sheetId,
          startRowIndex: 0,
          endRowIndex: 1,
          startColumnIndex: 0,
          endColumnIndex: 5,
        },
        cell: {
          userEnteredFormat: {
            backgroundColor: { red: 0.024, green: 0.306, blue: 0.231 },
            horizontalAlignment: "LEFT",
            verticalAlignment: "MIDDLE",
            textFormat: {
              foregroundColor: { red: 1, green: 1, blue: 1 },
              fontSize: 10,
              bold: true,
            },
          },
        },
        fields:
          "userEnteredFormat(backgroundColor,textFormat,horizontalAlignment,verticalAlignment)",
      },
    },
    {
      repeatCell: {
        range: {
          sheetId,
          startRowIndex: 1,
          endRowIndex: 1000,
          startColumnIndex: 0,
          endColumnIndex: 5,
        },
        cell: {
          userEnteredFormat: {
            wrapStrategy: "WRAP",
            verticalAlignment: "TOP",
            textFormat: {
              fontSize: 10,
            },
          },
        },
        fields: "userEnteredFormat(wrapStrategy,verticalAlignment,textFormat.fontSize)",
      },
    },
    {
      updateDimensionProperties: {
        range: {
          sheetId,
          dimension: "ROWS",
          startIndex: 0,
          endIndex: 1,
        },
        properties: {
          pixelSize: 36,
        },
        fields: "pixelSize",
      },
    },
    ...columnWidths.map((pixelSize, colIdx) => ({
      updateDimensionProperties: {
        range: {
          sheetId,
          dimension: "COLUMNS",
          startIndex: colIdx,
          endIndex: colIdx + 1,
        },
        properties: { pixelSize },
        fields: "pixelSize",
      },
    })),
  ];

  await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(
      spreadsheetId
    )}:batchUpdate`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ requests }),
    }
  );
}

/**
 * Automatically locates or creates the "Portfolio Contact Submissions" spreadsheet
 * in Google Drive, applies formatting and headers, and returns its metadata.
 */
export async function ensurePortfolioSheet(
  accessToken: string
): Promise<LinkedSheetInfo> {
  // 1. Check previously cached spreadsheet ID
  const existingId = getSavedSheetId();
  if (existingId) {
    const meta = await fetchSheetMetadata(existingId, accessToken);
    if (meta) {
      await applySheetFormatting(
        meta.spreadsheetId,
        meta.sheetId,
        meta.sheetTitle,
        accessToken
      );
      saveSheetIdReference(meta.spreadsheetId);
      return {
        spreadsheetId: meta.spreadsheetId,
        spreadsheetUrl: meta.spreadsheetUrl,
        sheetTitle: meta.sheetTitle,
        createdNew: false,
      };
    } else {
      clearSavedSheetId();
    }
  }

  // 2. Search Google Drive for an existing "Portfolio Contact Submissions" spreadsheet
  const driveQuery = `name='${SHEET_TITLE}' and mimeType='application/vnd.google-apps.spreadsheet' and trashed=false`;
  const driveRes = await fetch(
    `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(
      driveQuery
    )}&fields=files(id,name)&pageSize=1`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  if (driveRes.status === 401) {
    cachedAccessToken = null;
    throw new Error("Google session expired. Please sign in with Google again.");
  }

  if (driveRes.ok) {
    const driveData = await driveRes.json();
    const matchedFile = driveData.files?.[0];
    if (matchedFile?.id) {
      const meta = await fetchSheetMetadata(matchedFile.id, accessToken);
      if (meta) {
        await applySheetFormatting(
          meta.spreadsheetId,
          meta.sheetId,
          meta.sheetTitle,
          accessToken,
          true
        );
        saveSheetIdReference(meta.spreadsheetId);
        return {
          spreadsheetId: meta.spreadsheetId,
          spreadsheetUrl: meta.spreadsheetUrl,
          sheetTitle: meta.sheetTitle,
          createdNew: false,
        };
      }
    }
  }

  // 3. Auto-create a brand new formatted "Portfolio Contact Submissions" Google Sheet
  const createRes = await fetch("https://sheets.googleapis.com/v4/spreadsheets", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      properties: {
        title: SHEET_TITLE,
      },
      sheets: [
        {
          properties: {
            title: TAB_TITLE,
            gridProperties: {
              frozenRowCount: 1,
              rowCount: 1000,
              columnCount: 5,
            },
          },
        },
      ],
    }),
  });

  if (createRes.status === 401) {
    cachedAccessToken = null;
    throw new Error("Google session expired. Please sign in with Google again.");
  }

  if (!createRes.ok) {
    const errBody = await createRes.json().catch(() => ({}));
    throw new Error(
      errBody?.error?.message || `Failed to create Google Sheet (${createRes.status})`
    );
  }

  const created = await createRes.json();
  const createdId: string = created.spreadsheetId;
  const createdUrl: string =
    created.spreadsheetUrl || `https://docs.google.com/spreadsheets/d/${createdId}/edit`;
  const createdTab = created.sheets?.[0]?.properties;
  const sheetId = createdTab?.sheetId ?? 0;
  const sheetTitle = createdTab?.title || TAB_TITLE;

  await applySheetFormatting(createdId, sheetId, sheetTitle, accessToken, true);
  saveSheetIdReference(createdId);

  return {
    spreadsheetId: createdId,
    spreadsheetUrl: createdUrl,
    sheetTitle,
    createdNew: true,
  };
}

export async function appendSubmissionToGoogleSheet(
  payload: ContactPayload & { timestamp: string },
  onLog?: (msg: string) => void
): Promise<SheetSubmissionResult> {
  let token = getAccessToken();
  let userEmail = auth.currentUser?.email || null;

  // Automatically authenticate via built-in Google OAuth if no active token is cached
  if (!token) {
    onLog?.("Opening built-in Google Workspace authentication...");
    const authResult = await signInWithGoogleForSheets();
    token = authResult.accessToken;
    userEmail = authResult.user.email;
  }

  onLog?.("Verifying linked Google Sheet & column schema...");
  const sheetInfo = await ensurePortfolioSheet(token);
  onLog?.(
    sheetInfo.createdNew
      ? `Created & formatted Google Sheet: '${SHEET_TITLE}'`
      : `Connected to Google Sheet: '${SHEET_TITLE}' (Tab: ${sheetInfo.sheetTitle})`
  );

  const appendRange = `${sheetInfo.sheetTitle}!A:E`;
  onLog?.(`Appending validated row to ${appendRange}...`);

  const appendRes = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(
      sheetInfo.spreadsheetId
    )}/values/${encodeURIComponent(
      appendRange
    )}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        majorDimension: "ROWS",
        values: [
          [
            payload.timestamp,
            payload.name,
            payload.email,
            payload.subject,
            payload.message,
          ],
        ],
      }),
    }
  );

  if (appendRes.status === 401) {
    cachedAccessToken = null;
    throw new Error(
      "Google OAuth session expired. Please submit again or click 'Sign in with Google' to refresh access."
    );
  }

  if (!appendRes.ok) {
    const errBody = await appendRes.json().catch(() => ({}));
    throw new Error(
      errBody?.error?.message || `Failed to append row (${appendRes.status})`
    );
  }

  const appendData = await appendRes.json();
  const updatedRange =
    appendData?.updates?.updatedRange || `${sheetInfo.sheetTitle}!A:E`;

  return {
    spreadsheetId: sheetInfo.spreadsheetId,
    spreadsheetUrl: sheetInfo.spreadsheetUrl,
    sheetTitle: sheetInfo.sheetTitle,
    updatedRange,
    timestamp: payload.timestamp,
    userEmail,
  };
}
