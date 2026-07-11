import { Sun, Moon, ShieldCheck, Cpu, ChevronRight, Menu, X } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  darkMode: boolean;
  onToggleTheme: () => void;
  onScrollToSection: (id: string) => void;
  onVerifyRecord: () => void;
}

export default function Header({ darkMode, onToggleTheme, onScrollToSection, onVerifyRecord }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "TRAJECTORY", id: "trajectory" },
    { label: "ACHIEVEMENTS", id: "achievements" },
    { label: "COMPETENCIES", id: "blueprint" },
    { label: "SYSTEMS", id: "proof" },
    { label: "ACADEMIC", id: "academic" },
    { label: "CONTACT", id: "contact" }
  ];

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    onScrollToSection(id);
  };

  return (
    <header className="sticky top-0 z-40 bg-bg-secondary/90 backdrop-blur-md border-b border-border-color transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        
        {/* Core identifier */}
        <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => onScrollToSection("hero-top")}>
          <div className="relative w-9 h-9 rounded-full bg-gradient-to-tr from-neutral-900 to-neutral-800 dark:from-white dark:to-neutral-100 flex items-center justify-center shadow-lg border border-neutral-800/15 dark:border-white/25 transition-all duration-300 group-hover:scale-105 group-hover:shadow-blue-500/10">
            <span className="text-[11px] font-mono font-black text-white dark:text-neutral-950 tracking-tighter">
              AR
            </span>
            {/* Exquisite micro border ring */}
            <div className="absolute inset-[2.5px] rounded-full border border-white/10 dark:border-neutral-950/5 pointer-events-none" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-text-primary tracking-tight leading-none group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              Ahmad Rayan Qasim
            </h1>
            <span className="text-[9px] font-mono text-text-secondary/80 block uppercase pt-1 tracking-widest font-extrabold">
              AI Systems & Architectures
            </span>
          </div>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleNavClick(item.id)}
              className="text-[10px] font-mono font-bold tracking-wider text-text-secondary hover:text-text-primary uppercase transition-colors duration-200 cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Global Controls & Access Button */}
        <div className="flex items-center space-x-3">
          {/* Record validation trigger with indicator matching the template */}
          <button
            onClick={onVerifyRecord}
            className="hidden sm:flex items-center space-x-1 px-3 py-1.5 bg-bg-secondary hover:bg-bg-primary border border-border-color text-[10px] font-mono font-bold tracking-widest text-text-primary rounded transition-all uppercase cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Verify Record</span>
          </button>

          {/* Theme Switcher Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-1.5 rounded-md border border-border-color text-text-secondary hover:text-text-primary hover:bg-bg-secondary transition-all active:scale-[0.95] cursor-pointer"
            title={darkMode ? "Switch to Light System" : "Switch to Monochrome Dark"}
            aria-label="Toggle visual theme"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-neutral-600" />}
          </button>

          {/* Mobile menu hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 md:hidden border border-border-color text-text-secondary rounded-md hover:bg-bg-secondary transition-colors cursor-pointer"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border-color px-4 py-4 space-y-3 bg-bg-secondary shadow-inner animate-fade-in font-sans">
          <div className="space-y-1">
            {navItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleNavClick(item.id)}
                className="w-full text-left font-mono text-xs font-bold tracking-wider py-2.5 px-3 text-text-secondary hover:bg-bg-primary rounded-md flex items-center justify-between cursor-pointer"
              >
                <span>{item.label}</span>
                <ChevronRight className="w-3 h-3 text-text-secondary" />
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-border-color flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onVerifyRecord();
              }}
              className="w-full justify-center flex items-center space-x-2 py-2.5 bg-text-primary font-mono text-xs font-bold tracking-widest text-bg-primary rounded-md transition-all uppercase border border-border-color cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400 dark:text-emerald-500" />
              <span>Verify Record</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
