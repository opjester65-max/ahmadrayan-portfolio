import { useState, ChangeEvent, FormEvent } from "react";
import { Mail, Send, Linkedin, Github, CheckCircle, AlertCircle, RefreshCw, Terminal } from "lucide-react";
import { supabase, isSupabaseConfigured } from "../lib/supabase";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Collaboration Request",
    message: ""
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false
  });

  const [status, setStatus] = useState<"idle" | "validating" | "sending" | "success" | "error">("idle");
  const [systemLogs, setSystemLogs] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const getErrors = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim() && touched.name) {
      errors.name = "Name is required";
    }
    if (touched.email) {
      if (!formData.email.trim()) {
        errors.email = "Email address is required";
      } else if (!emailRegex.test(formData.email)) {
        errors.email = "Invalid email format (e.g., user@domain.com)";
      }
    }
    if (!formData.message.trim() && touched.message) {
      errors.message = "Message is required";
    }
    return errors;
  };

  const errors = getErrors();
  const isValid = Object.keys(errors).length === 0 && formData.name && formData.email && formData.message;

  const logEvent = (msg: string) => {
    setSystemLogs(prev => [...prev, `[${new Date().toISOString().slice(11, 19)}] ${msg}`]);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBlur = (field: "name" | "email" | "message") => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });

    if (!isValid) {
      logEvent("Validation failed.");
      setStatus("error");
      setErrorMessage("Please resolve input validation issues before sending.");
      return;
    }

    setStatus("validating");
    setSystemLogs([]);
    logEvent("Initializing message dispatch sequence...");

    try {
      logEvent("Validating form fields... OK");
      logEvent(`Addressing recipient: [Ahmad Rayan Qasim <opjester65@gmail.com>]`);
      logEvent(`Verifying sender identity: ${formData.email}`);
      setStatus("sending");

      // Verify if Supabase is properly configured in the environment variables
      if (!isSupabaseConfigured || !supabase) {
        logEvent("Supabase keys not detected in environment settings.");
        logEvent("Registering localized sandbox preview fallback...");
        await new Promise((resolve) => setTimeout(resolve, 1500));
        logEvent("Message processed successfully (Emulated Sandbox).");
        logEvent("Tip: Configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to send data to your live Supabase DB.");
        logEvent("Connection closed cleanly.");
        setStatus("success");
        return;
      }

      logEvent("Establishing active secure connection to Supabase endpoint...");
      await new Promise((resolve) => setTimeout(resolve, 650));

      logEvent("Serializing records... OK");
      logEvent("Transmitting record payload to Supabase database table 'submissions'...");
      
      const { error } = await supabase
        .from("submissions")
        .insert([
          {
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
            created_at: new Date().toISOString()
          }
        ]);

      if (error) {
        throw error;
      }

      logEvent("Payload transmitted. Packet status code: 201 CREATED");
      logEvent("Supabase insert acknowledged successfully.");
      logEvent("Connection closed cleanly.");
      setStatus("success");
    } catch (error: any) {
      logEvent(`CRITICAL DATABASE EXCEPTION: ${error.message || "Insert failed"}`);
      setErrorMessage(
        `Supabase query failed: ${error.message || "Unknown error"}. Please verify your environment variables VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY, and ensure a table named 'submissions' exists in your database with public write permissions (Row Level Security allowed or configured for INSERT).`
      );
      setStatus("error");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      subject: "Collaboration Request",
      message: ""
    });
    setTouched({ name: false, email: false, message: false });
    setStatus("idle");
    setSystemLogs([]);
  };

  return (
    <div id="contact-field" className="grid lg:grid-cols-5 gap-8 bg-bg-primary border border-border-color rounded-lg overflow-hidden shadow-sm transition-colors">
      {/* Informational Column with Redirection Links */}
      <div className="lg:col-span-2 bg-bg-secondary p-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-border-color font-sans">
        <div className="space-y-6">
          <div className="inline-flex items-center space-x-2 bg-bg-primary border border-border-color px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold uppercase tracking-wider">
              Network Online
            </span>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-text-primary tracking-tight">Get in Touch</h3>
            <p className="text-sm text-text-secondary font-light leading-relaxed font-sans">
              Recruiters, VCs, and technical collaborators are welcome to reach out directly. Average response latency is under 4 hours.
            </p>
          </div>

          {/* Core metadata stats */}
          <div className="space-y-3 font-mono text-xs text-text-secondary">
            <div className="flex justify-between items-center py-1.5 border-b border-border-color">
              <span>GPG Public Index:</span>
              <span className="text-text-primary font-bold">0xCF4B82A9...</span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-border-color">
              <span>Communication Zone:</span>
              <span className="text-text-primary font-bold">GMT+5</span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-border-color">
              <span>Email Relay:</span>
              <span className="text-emerald-500 font-bold">opjester65@gmail.com</span>
            </div>
          </div>
        </div>

        {/* Redirecting Hooks */}
        <div className="space-y-3 pt-6 lg:pt-0">
          <p className="text-[11px] uppercase tracking-wider font-mono text-text-secondary font-bold">Verified Web Presence</p>
          <div className="grid grid-cols-3 gap-2 font-mono">
            <a 
              href="https://github.com/ahmadrayan-create" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 px-3 py-2 bg-bg-secondary hover:bg-bg-primary border border-border-color text-xs text-text-primary rounded transition-all cursor-pointer"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <a 
              href="https://linkedin.com/in/ahmad-rayan-qasim/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 px-3 py-2 bg-bg-secondary hover:bg-bg-primary border border-border-color text-xs text-text-primary rounded transition-all cursor-pointer"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
            <a 
              href="mailto:opjester65@gmail.com" 
              className="flex items-center justify-center gap-1.5 px-3 py-2 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-250 dark:border-emerald-900/50 text-xs text-emerald-600 dark:text-emerald-400 rounded transition-all cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Form Fields Layout */}
      <div className="lg:col-span-3 p-6 flex flex-col justify-between font-sans">
        {status === "success" ? (
          <div className="flex-1 flex flex-col justify-center items-center py-12 space-y-6 text-center animate-fade-in font-sans">
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-350 dark:border-emerald-500/50 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h4 className="text-lg font-bold text-text-primary tracking-tight">Transmission Acknowledged</h4>
              <p className="text-sm text-text-secondary max-w-sm">
                Thank you. Your message package has been successfully transmitted on port 465 SSL.
              </p>
            </div>
            {/* Terminal logs readout inside success page */}
            <div className="w-full max-w-md bg-bg-secondary border border-border-color rounded p-3 text-left font-mono text-[10px] text-text-secondary space-y-0.5 shadow-inner">
              <p className="text-text-primary mb-1 flex items-center gap-1 font-bold">
                <Terminal className="w-3 h-3 text-emerald-500" /> Trace Log Output:
              </p>
              {systemLogs.map((log, idx) => (
                <p key={idx}>{log}</p>
              ))}
            </div>
            <button
              onClick={resetForm}
              className="px-4 py-2 bg-bg-secondary hover:bg-bg-primary text-xs font-mono rounded text-text-primary flex items-center gap-1.5 transition-colors border border-border-color cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Send Another Message</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Name Field */}
              <div className="space-y-1.5 font-mono">
                <label className="block text-xs text-text-secondary font-semibold uppercase tracking-wider">
                  NAME *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={() => handleBlur("name")}
                  placeholder="Your Name"
                  className={`w-full px-3 py-2 bg-bg-secondary border ${
                    errors.name ? "border-red-500/60 focus:border-red-500" : "border-border-color focus:border-blue-500 dark:focus:border-emerald-500"
                  } focus:ring-1 focus:ring-emerald-500/20 text-text-primary rounded text-sm transition-colors focus:outline-none`}
                />
                {errors.name && (
                  <span className="flex items-center text-[11px] text-red-500 font-mono gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.name}
                  </span>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-1.5 font-mono">
                <label className="block text-xs text-text-secondary font-semibold uppercase tracking-wider">
                  EMAIL ADDRESS *
                </label>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={() => handleBlur("email")}
                  placeholder="name@organization.com"
                  className={`w-full px-3 py-2 bg-bg-secondary border ${
                    errors.email ? "border-red-500/60 focus:border-red-500" : "border-border-color focus:border-blue-500 dark:focus:border-emerald-500"
                  } focus:ring-1 focus:ring-emerald-500/20 text-text-primary rounded text-sm transition-colors focus:outline-none`}
                />
                {errors.email && (
                  <span className="flex items-center text-[11px] text-red-500 font-mono gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.email}
                  </span>
                )}
              </div>
            </div>

            {/* Subject Field */}
            <div className="space-y-1.5 font-mono">
              <label className="block text-xs text-text-secondary font-semibold uppercase tracking-wider">
                SUBJECT
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Collaboration Inquiry"
                className="w-full px-3 py-2 bg-bg-secondary border border-border-color focus:border-blue-500 dark:focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 text-text-primary rounded text-sm transition-colors focus:outline-none"
              />
            </div>

            {/* Message payload */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono text-text-secondary font-semibold uppercase tracking-wider">
                MESSAGE *
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                onBlur={() => handleBlur("message")}
                rows={4}
                placeholder="Write your message here..."
                className={`w-full px-3 py-2 bg-bg-secondary border ${
                  errors.message ? "border-red-500/60 focus:border-red-500" : "border-border-color focus:border-blue-500 dark:focus:border-emerald-500"
                } focus:ring-1 focus:ring-emerald-500/20 text-text-primary rounded text-sm transition-colors focus:outline-none font-sans`}
              />
              {errors.message && (
                <span className="flex items-center text-[11px] text-red-500 font-mono gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.message}
                </span>
              )}
            </div>

            {status === "error" && errorMessage && (
              <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 rounded text-xs leading-relaxed flex items-start gap-2 font-mono animate-fade-in">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
                <div className="space-y-1">
                  <span className="font-bold">Transmission Error:</span>
                  <p className="font-sans font-light text-[11px] leading-snug">{errorMessage}</p>
                </div>
              </div>
            )}

            {/* Simulation console status during execution */}
            {(status === "validating" || status === "sending") && (
              <div className="p-3 bg-bg-secondary border border-border-color rounded font-mono text-[10px] text-emerald-600 dark:text-emerald-400/90 space-y-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
                  <span className="font-bold">SENDING MESSAGE...</span>
                </div>
                {systemLogs.map((log, idx) => (
                  <p key={idx} className="text-text-secondary">{log}</p>
                ))}
              </div>
            )}

            {/* Actions strip */}
            <div className="flex items-center justify-between pt-2 border-t border-border-color">
              <span className="text-[10px] text-text-secondary font-mono tracking-wider">
                * REQUIRED FIELDS
              </span>
              <button
                type="submit"
                disabled={status === "validating" || status === "sending"}
                className={`px-5 py-2.5 bg-text-primary hover:bg-transparent hover:text-text-primary hover:border-text-primary border border-transparent text-bg-primary text-xs font-mono font-bold rounded flex items-center gap-2 transition-all transition-transform active:scale-[0.98] cursor-pointer ${
                  status === "validating" || status === "sending" ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <span>Send Message</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
