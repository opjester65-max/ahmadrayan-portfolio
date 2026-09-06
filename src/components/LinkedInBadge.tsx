import React, { useEffect, useRef } from "react";
import { Linkedin, ShieldCheck, ExternalLink } from "lucide-react";

interface LinkedInBadgeProps {
  darkMode?: boolean;
  className?: string;
  type?: "VERTICAL" | "HORIZONTAL";
  size?: "medium" | "large";
}

export const LinkedInBadge: React.FC<LinkedInBadgeProps> = ({
  darkMode = true,
  className = "",
  type = "VERTICAL",
  size = "medium",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const triggerLinkedInRender = () => {
      if (typeof (window as unknown as { LIRenderAll?: () => void }).LIRenderAll === "function") {
        (window as unknown as { LIRenderAll: () => void }).LIRenderAll();
      }
    };

    triggerLinkedInRender();
    const timer1 = setTimeout(triggerLinkedInRender, 400);
    const timer2 = setTimeout(triggerLinkedInRender, 1200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [darkMode, type, size]);

  return (
    <div
      className={`rounded-xl border border-border-color bg-bg-primary p-4 shadow-sm transition-all duration-300 ${className}`}
    >
      {/* Badge Header Bar */}
      <div className="flex items-center justify-between border-b border-border-color pb-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-[#0A66C2] flex items-center justify-center text-white shadow-xs">
            <Linkedin className="w-3.5 h-3.5 fill-current" />
          </div>
          <div>
            <span className="text-[9px] font-mono uppercase tracking-widest text-text-secondary font-bold block leading-tight">
              Verified Presence
            </span>
            <span className="text-xs font-bold text-text-primary font-sans leading-tight block">
              Official LinkedIn Badge
            </span>
          </div>
        </div>
        <div className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-semibold">
          <ShieldCheck className="w-3 h-3" />
          <span>Active Ingress</span>
        </div>
      </div>

      {/* Official LinkedIn Profile Badge container */}
      <div
        ref={containerRef}
        key={`li-badge-${darkMode ? "dark" : "light"}-${type}-${size}`}
        className="flex flex-col items-center justify-center min-h-[160px] py-1 overflow-x-auto"
      >
        <div
          className="badge-base LI-profile-badge"
          data-locale="en_US"
          data-size={size}
          data-theme={darkMode ? "dark" : "light"}
          data-type={type}
          data-vanity="ahmadrayandev"
          data-version="v1"
        >
          <a
            className="badge-base__link LI-simple-link inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-bg-secondary border border-border-color text-xs font-mono font-semibold text-text-primary hover:text-[#0A66C2] transition-colors shadow-xs"
            href="https://pk.linkedin.com/in/ahmadrayandev?trk=profile-badge"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className="w-4 h-4 text-[#0A66C2]" />
            <span>Ahmad Rayan Qasim (@ahmadrayandev)</span>
            <ExternalLink className="w-3 h-3 text-text-secondary" />
          </a>
        </div>
      </div>

      {/* Footer Info Strip */}
      <div className="mt-3 pt-2.5 border-t border-border-color flex items-center justify-between text-[10px] font-mono text-text-secondary">
        <span>Vanity: @ahmadrayandev</span>
        <a
          href="https://www.linkedin.com/in/ahmadrayandev"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#0A66C2] dark:hover:text-blue-400 transition-colors inline-flex items-center gap-1 font-semibold"
        >
          <span>Connect Direct</span>
          <ExternalLink className="w-2.5 h-2.5" />
        </a>
      </div>
    </div>
  );
};
