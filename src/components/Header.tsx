import { Sun, Moon, ShieldCheck, ChevronRight, Menu, X, Terminal, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PillNav from "./PillNav/PillNav";

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
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-50 bg-[#06070a]/80 dark:bg-[#050608]/85 backdrop-blur-xl border-b border-neutral-200/40 dark:border-neutral-800/60 shadow-[0_4px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.4)] transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-6">
        
        {/* Modern Developer Brand Lockup */}
        <div 
          className="flex items-center space-x-3 group cursor-pointer select-none" 
          onClick={() => onScrollToSection("hero-top")}
        >
          {/* Micro-portrait avatar with live signal beacon */}
          <div className="relative flex items-center shrink-0">
            <div className="relative w-8 h-8 rounded-full overflow-hidden ring-1 ring-neutral-300 dark:ring-white/20 group-hover:ring-emerald-500/60 transition-all duration-300 bg-neutral-900 shadow-sm">
              <img
                src="https://i.ibb.co/JFjpTxs0/Firefly.png"
                alt="Ahmad Rayan"
                className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500 select-none"
              />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5" title="Available for Select Roles & AI Engagements">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 border-2 border-white dark:border-[#050608]" />
            </span>
          </div>

          {/* Clean modern typographic lockup */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold tracking-tight text-neutral-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              Ahmad Rayan
            </span>
            <span className="text-neutral-400 dark:text-neutral-600 font-mono text-xs select-none">
              /
            </span>
            <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 tracking-tight">
              ai engineering
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links Powered by PillNav */}
        <div className="hidden md:flex items-center">
          <PillNav
            items={navItems.map(item => ({ label: item.label, href: `#${item.id}` }))}
            onItemClick={(item, _idx, e) => {
              e.preventDefault();
              handleNavClick(item.href?.replace('#', '') || '');
            }}
            theme={darkMode ? "dark" : "light"}
            size="sm"
            surface="glass"
            itemStyle="plain"
            hoverEffect="fill"
            indicator="dot"
            highlightColor="#10b981"
          />
        </div>

        {/* Global Controls & Access Action */}
        <div className="flex items-center space-x-2.5">
          {/* Record validation trigger with indicator */}
          <button
            onClick={onVerifyRecord}
            className="hidden sm:inline-flex items-center space-x-1.5 px-3.5 py-1.5 bg-gradient-to-r from-emerald-950/40 to-neutral-900 hover:from-emerald-900/50 hover:to-neutral-850 dark:from-emerald-950/40 dark:to-neutral-900 border border-emerald-500/30 hover:border-emerald-500/60 text-[10px] font-mono font-bold tracking-widest text-text-primary rounded-lg transition-all shadow-[0_0_12px_rgba(16,185,129,0.15)] uppercase cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Verify Record</span>
          </button>

          {/* Theme Switcher Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-lg border border-neutral-200/50 dark:border-neutral-800/80 text-text-secondary hover:text-text-primary bg-neutral-100/40 dark:bg-neutral-900/40 hover:bg-neutral-200/60 dark:hover:bg-neutral-800/60 transition-all active:scale-[0.95] cursor-pointer"
            title={darkMode ? "Switch to Light System" : "Switch to Monochrome Dark"}
            aria-label="Toggle visual theme"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-emerald-400" />}
          </button>

          {/* Mobile menu hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 md:hidden border border-neutral-200/60 dark:border-neutral-800 text-text-secondary rounded-lg hover:bg-neutral-800/40 transition-colors cursor-pointer"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Elevated Mobile Drawer Glass Navigation Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden border-t border-emerald-500/20 px-4 py-4 space-y-3 bg-[#060b09]/95 backdrop-blur-2xl shadow-2xl font-sans overflow-hidden"
          >
            <div className="space-y-1">
              {navItems.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleNavClick(item.id)}
                  className="w-full text-left font-mono text-xs font-bold tracking-wider py-2.5 px-3 text-neutral-300 hover:text-white hover:bg-emerald-500/10 rounded-lg flex items-center justify-between cursor-pointer transition-colors"
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-400" />
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-neutral-800/60 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onVerifyRecord();
                }}
                className="w-full justify-center flex items-center space-x-2 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 font-mono text-xs font-bold tracking-widest text-white rounded-lg transition-all uppercase shadow-lg shadow-emerald-900/30 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-white" />
                <span>Verify Official Record</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
