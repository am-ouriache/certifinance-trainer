import { useState, useEffect, useRef, type ReactNode, type ComponentType } from 'react';
import type { NavTab } from '../types';
import {
  LayoutDashboard,
  FileText,
  BarChart2,
  Building2,
  Shield,
  PlusCircle,
  Search,
  Sun,
  Moon,
  X,
} from 'lucide-react';

interface NavItem {
  id: NavTab;
  label: string;
  shortLabel: string;
  Icon: ComponentType<{ className?: string }>;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard',      label: 'Tableau de bord',  shortLabel: 'Accueil', Icon: LayoutDashboard },
  { id: 'cif-cgp',        label: 'CIF / CGP',         shortLabel: 'CIF/CGP', Icon: FileText        },
  { id: 'amf',            label: 'AMF',               shortLabel: 'AMF',     Icon: BarChart2       },
  { id: 'iobsp-niveau-1', label: 'IOBSP Niveau 1',    shortLabel: 'IOBSP',   Icon: Building2       },
  { id: 'ias-niveau-1',   label: 'IAS Niveau 1',      shortLabel: 'IAS',     Icon: Shield          },
  { id: 'add-content',    label: 'Ajouter du contenu', shortLabel: 'Ajouter', Icon: PlusCircle      },
];

interface LayoutProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  children: ReactNode;
  searchQuery: string;
  onSearch: (q: string) => void;
}

export default function Layout({ activeTab, onTabChange, children, searchQuery, onSearch }: LayoutProps) {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const stored = localStorage.getItem('certifinance-dark');
    if (stored !== null) return stored === 'true';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  // Apply / remove the `dark` class on <html>
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('certifinance-dark', String(isDark));
  }, [isDark]);

  // Focus input when search opens
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchRef.current?.focus(), 50);
    }
  }, [searchOpen]);

  const clearSearch = () => {
    onSearch('');
    setSearchOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0f0f18] flex flex-col">

      {/* ─── Header ──────────────────────────────────────────────────────── */}
      <header className="bg-white dark:bg-[#13131c] border-b border-slate-200 dark:border-[#22223a] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 h-14">

            {/* Logo */}
            <button
              onClick={() => { onTabChange('dashboard'); clearSearch(); }}
              className="flex items-center gap-2 text-slate-800 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors shrink-0"
            >
              <BarChart2 className="w-5 h-5 text-blue-600" />
              <span className="font-bold text-sm hidden sm:block tracking-tight">
                CertiFinance <span className="text-blue-600">Trainer</span>
              </span>
            </button>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-0.5 ml-4">
              {NAV_ITEMS.map(({ id, label, Icon }) => (
                <button
                  key={id}
                  onClick={() => { onTabChange(id); clearSearch(); }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === id
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#1c1c28]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{label}</span>
                </button>
              ))}
            </nav>

            <div className="flex-1" />

            {/* Search bar */}
            <div className="relative">
              {searchOpen ? (
                <div className="flex items-center gap-2 animate-scale-in">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input
                      ref={searchRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => onSearch(e.target.value)}
                      placeholder="Rechercher cours, fiches, questions…"
                      className="pl-8 pr-3 py-1.5 text-sm rounded-lg border border-slate-200 dark:border-[#2a2a40] bg-white dark:bg-[#1c1c28] text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 w-64"
                    />
                  </div>
                  <button onClick={clearSearch} className="btn-ghost p-1.5">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="btn-ghost p-2"
                  aria-label="Rechercher"
                >
                  <Search className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Dark mode toggle */}
            <button
              onClick={() => setIsDark((d) => !d)}
              className="btn-ghost p-2"
              aria-label={isDark ? 'Mode clair' : 'Mode sombre'}
            >
              {isDark
                ? <Sun  className="w-4 h-4 text-amber-400" />
                : <Moon className="w-4 h-4" />}
            </button>

            {/* Mobile active tab label */}
            <span className="lg:hidden text-xs font-semibold text-slate-500 dark:text-slate-400 truncate max-w-[80px]">
              {NAV_ITEMS.find((i) => i.id === activeTab)?.shortLabel}
            </span>
          </div>
        </div>
      </header>

      {/* ─── Mobile bottom nav ───────────────────────────────────────────── */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-[#13131c] border-t border-slate-200 dark:border-[#22223a] z-40 safe-area-inset-bottom">
        <div className="grid grid-cols-6 h-16">
          {NAV_ITEMS.map(({ id, shortLabel, Icon }) => (
            <button
              key={id}
              onClick={() => { onTabChange(id); clearSearch(); }}
              className={`flex flex-col items-center justify-center gap-0.5 transition-colors ${
                activeTab === id
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-slate-400 dark:text-slate-600 hover:text-slate-600 dark:hover:text-slate-400'
              }`}
            >
              <Icon className={`w-5 h-5 ${activeTab === id ? 'scale-110' : ''} transition-transform`} />
              <span className="text-[10px] font-medium truncate w-full text-center px-0.5">
                {shortLabel}
              </span>
            </button>
          ))}
        </div>
      </nav>

      {/* ─── Main content ────────────────────────────────────────────────── */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6 pb-24 lg:pb-10 animate-fade-in">
        {children}
      </main>
    </div>
  );
}
