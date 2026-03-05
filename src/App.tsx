import React, { useState } from 'react';
import { 
  LayoutGrid, 
  Wallet, 
  ReceiptText, 
  Sparkles, 
  Settings, 
  Bell, 
  Calendar,
  TrendingUp,
  Globe,
  ArrowRight,
  Plus,
  Search,
  Download,
  Share2,
  FileText,
  ChevronRight
} from 'lucide-react';
import { generateFinancialInsight } from './services/gemini';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from './lib/utils';

// --- Components ---

const Sidebar = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: string) => void }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'portfolio', label: 'Portfolio', icon: Wallet },
    { id: 'transactions', label: 'Transactions', icon: ReceiptText },
    { id: 'insights', label: 'Insights', icon: Sparkles },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 w-[220px] flex flex-col py-10 bg-white border-r border-border-light z-50">
      <div className="mb-16 px-8 flex items-center gap-3">
        <div className="size-6 flex items-center justify-center text-primary">
          <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 4L6 14v20l18 10 18-10V14L24 4zm0 3.8L38.2 15 24 22.8 9.8 15 24 7.8zM8.5 32.2V17.8L22.5 25.5v14.4L8.5 32.2zm17 14.4V25.5L39.5 17.8v14.4L25.5 46.6z" />
          </svg>
        </div>
        <span className="text-sm font-serif tracking-[0.4em] text-text-main font-medium uppercase">Aurum</span>
      </div>

      <nav className="flex-1 flex flex-col">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "nav-link",
              activeTab === item.id ? "nav-link-active" : "nav-link-inactive"
            )}
          >
            <item.icon size={18} strokeWidth={1.5} />
            <span className="nav-text">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto px-8 flex flex-col gap-8">
        <button className="flex items-center gap-4 text-text-muted hover:text-text-main transition-colors group">
          <Bell size={18} strokeWidth={1.5} />
          <span className="text-[9px] uppercase tracking-[0.2em] font-medium">Alerts</span>
        </button>
        <div className="flex items-center gap-4 pt-6 border-t border-border-light">
          <img 
            src="https://picsum.photos/seed/alexander/100/100" 
            alt="Alexander" 
            referrerPolicy="no-referrer"
            className="size-7 rounded-full border border-border-light shadow-sm grayscale hover:grayscale-0 transition-all cursor-pointer"
          />
          <div className="flex flex-col">
            <span className="text-[10px] font-semibold text-text-main tracking-tight">Alexander</span>
            <span className="text-[8px] text-text-muted uppercase tracking-[0.1em]">Platinum Member</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

const DashboardView = () => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="space-y-12"
  >
    <header className="flex justify-between items-end">
      <div className="flex flex-col gap-4">
        <span className="text-primary text-[9px] uppercase tracking-[0.4em] font-semibold">Wealth Intelligence Suite</span>
        <h1 className="text-text-main text-5xl font-serif font-normal tracking-tight">Morning, Alexander</h1>
      </div>
      <div className="hidden md:flex items-center gap-3 text-text-muted text-[10px] uppercase tracking-widest font-medium">
        <Calendar size={14} strokeWidth={1.5} />
        <span>October 24, 2024</span>
      </div>
    </header>

    <section className="bg-white border border-border-light rounded-2xl shadow-sm overflow-hidden">
      <div className="p-10 pb-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-text-main text-xl font-serif font-normal mb-1">Portfolio Performance</h2>
            <p className="text-text-muted text-[9px] font-bold tracking-[0.25em] uppercase">H1 Growth Metrics</p>
          </div>
          <div className="flex bg-slate-50 p-1 rounded-full border border-slate-100">
            {['1M', '3M', '6M', '1Y'].map((t) => (
              <button 
                key={t}
                className={cn(
                  "px-4 py-1.5 text-[9px] font-semibold tracking-wider uppercase transition-all",
                  t === '6M' ? "bg-white shadow-sm rounded-full text-primary border border-slate-100/50" : "text-text-muted hover:text-text-main"
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-end mb-6">
          <div className="flex flex-col">
            <span className="text-text-main text-4xl font-light tracking-tighter">$2,450,000.00</span>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-emerald-600 text-[10px] font-medium bg-emerald-50 px-2 py-0.5 rounded">+12.5% ($272,200)</span>
            </div>
          </div>
          <div className="text-right hidden md:block">
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-primary"></span>
                <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest">Actual Value</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-slate-200"></span>
                <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest">Benchmark</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative h-[180px] w-full">
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 800 200">
            <defs>
              <linearGradient id="softGold" x1="0%" x2="0%" y1="0%" y2="100%">
                <stop offset="0%" stopColor="#c5a059" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#c5a059" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0 160C100 150 150 110 200 100C250 90 300 120 400 110C500 100 550 40 650 45C750 50 780 20 800 15" fill="none" stroke="#c5a059" strokeWidth="2.5" />
            <path d="M0 160C100 150 150 110 200 100C250 90 300 120 400 110C500 100 550 40 650 45C750 50 780 20 800 15 V200 H0 Z" fill="url(#softGold)" />
          </svg>
        </div>
        <div className="flex justify-between mt-4 px-2">
          {['Jan 24', 'Mar 24', 'May 24', 'Jul 24'].map(m => (
            <span key={m} className="text-[8px] font-bold text-text-muted uppercase tracking-[0.3em]">{m}</span>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 border-t border-border-light">
        {[
          { label: 'Total Assets', value: '$2.45M', change: '+1.2%', color: 'text-emerald-600' },
          { label: 'Monthly Cash', value: '$32.5K', change: '+5.0%', color: 'text-emerald-600' },
          { label: 'Liabilities', value: '$12.5K', change: '-2.0%', color: 'text-rose-600' },
          { label: 'Net Worth', value: '$2.43M', change: '+1.5%', color: 'text-emerald-600' },
        ].map((stat, i) => (
          <div key={i} className="p-8 border-r border-border-light bg-slate-50/10 last:border-r-0">
            <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-text-muted mb-3">{stat.label}</p>
            <p className="text-text-main text-2xl font-light tracking-tight mb-1">{stat.value}</p>
            <span className={cn("text-[9px] font-medium", stat.color)}>{stat.change}</span>
          </div>
        ))}
      </div>
    </section>

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      <div className="lg:col-span-7 space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-text-main text-2xl font-serif font-normal">Strategic Overview</h2>
          <div className="flex items-center gap-4">
            <span className="text-[9px] uppercase font-bold text-text-muted tracking-[0.3em]">Model: Conservative Alpha</span>
          </div>
        </div>
        <div className="bg-white border border-border-light rounded-3xl shadow-sm overflow-hidden p-10">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-text-muted mb-2">Exposure by Asset Class</h3>
              <p className="text-sm font-serif italic text-text-main">12-Month Relative Growth Comparison</p>
            </div>
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-primary shadow-sm"></span>
                <span className="text-[9px] uppercase font-bold text-text-muted tracking-widest">Equities</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-text-main"></span>
                <span className="text-[9px] uppercase font-bold text-text-muted tracking-widest">Bonds</span>
              </div>
            </div>
          </div>
          <div className="relative h-[240px] w-full">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 300">
              <path d="M0 200 C100 180, 200 230, 300 140 C400 80, 500 120, 600 90 C700 70, 800 100, 900 60 L1000 80" fill="none" stroke="#c5a059" strokeLinecap="round" strokeWidth="2.5" />
              <path d="M0 200 C100 210, 200 195, 300 205 C400 200, 500 190, 600 195 C700 200, 800 195, 900 190 L1000 185" fill="none" stroke="#1a1a1a" strokeLinecap="round" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>

      <div className="lg:col-span-5 space-y-8">
        <h2 className="text-text-main text-2xl font-serif font-normal">AI Executive Brief</h2>
        <div className="bg-white rounded-2xl border border-border-light shadow-sm p-10 h-[calc(100%-3rem)] flex flex-col justify-between">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-full bg-primary/5 flex items-center justify-center">
                <Sparkles size={16} className="text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="text-text-main text-[10px] font-bold uppercase tracking-[0.3em]">Alpha Analysis</h3>
            </div>
            <p className="text-text-muted text-sm leading-relaxed font-light">
              Your technology sector holdings have experienced a robust <span className="text-text-main font-semibold underline decoration-primary/20 decoration-2 underline-offset-4">14% growth</span> this quarter. Market sentiment suggests a period of stabilization ahead.
            </p>
            <div className="p-6 bg-slate-50/50 rounded-xl border border-border-light border-dashed">
              <p className="text-[9px] font-bold text-primary uppercase tracking-[0.3em] mb-3">Priority Action</p>
              <p className="text-[13px] text-text-main leading-relaxed italic font-serif">"Reallocate 5% from Tech Equities to Fixed Income to hedge against projected Q4 interest rate shifts."</p>
            </div>
          </div>
          <button className="group flex items-center justify-center w-full gap-3 text-text-main hover:text-primary transition-all text-[10px] font-bold uppercase tracking-[0.3em] mt-8">
            Intelligence Report
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  </motion.div>
);

const TransactionsView = () => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="space-y-12"
  >
    <header className="flex flex-col gap-4">
      <span className="text-primary text-[9px] uppercase tracking-[0.4em] font-semibold">Financial Ledger</span>
      <h1 className="text-text-main text-5xl font-serif font-normal tracking-tight">Transaction Hub</h1>
      <p className="text-text-muted text-sm tracking-wide font-light">Refining your financial legacy through precision records.</p>
    </header>

    <div className="bg-white border border-border-light rounded-3xl shadow-sm overflow-hidden">
      <div className="px-10 py-6 flex items-center justify-between border-b border-border-light">
        <div className="flex gap-8">
          {['All History', 'Expenses', 'Revenue'].map((tab, i) => (
            <button 
              key={tab} 
              className={cn(
                "text-[10px] font-bold uppercase tracking-[0.2em] pb-1 transition-all",
                i === 0 ? "text-primary border-b border-primary" : "text-text-muted hover:text-text-main"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4 text-text-muted">
          <Search size={18} strokeWidth={1.5} className="cursor-pointer hover:text-text-main transition-colors" />
          <Calendar size={18} strokeWidth={1.5} className="cursor-pointer hover:text-text-main transition-colors" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[10px] font-bold text-text-muted uppercase tracking-[0.25em] border-b border-border-light">
              <th className="px-10 py-6 font-bold">Date</th>
              <th className="px-10 py-6 font-bold">Merchant</th>
              <th className="px-10 py-6 font-bold">Category</th>
              <th className="px-10 py-6 font-bold">Subcategory</th>
              <th className="px-10 py-6 font-bold text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-light">
            {[
              { date: '24 Oct 2023', merchant: 'Private Design Retainer', category: 'Revenue', sub: 'Consultancy', amount: '+$4,500.00', type: 'income', seed: 'design' },
              { date: '23 Oct 2023', merchant: 'The Organic Market', category: 'Lifestyle', sub: 'Groceries', amount: '-$182.40', type: 'expense', seed: 'food' },
              { date: '21 Oct 2023', merchant: 'Elite Transport', category: 'Travel', sub: 'Executive Car', amount: '-$64.00', type: 'expense', seed: 'car' },
              { date: '19 Oct 2023', merchant: 'Vogue Subscription', category: 'Media', sub: 'Entertainment', amount: '-$15.99', type: 'expense', seed: 'magazine' },
              { date: '15 Oct 2023', merchant: 'Aero Club Int.', category: 'Travel', sub: 'Private Jet', amount: '-$12,400.00', type: 'expense', seed: 'plane' },
            ].map((tx, i) => (
              <tr key={i} className="group hover:bg-primary/[0.02] transition-colors">
                <td className="px-10 py-6 text-xs text-text-muted font-light">{tx.date}</td>
                <td className="px-10 py-6">
                  <div className="flex items-center gap-3">
                    <img 
                      src={`https://picsum.photos/seed/${tx.seed}/40/40`} 
                      alt={tx.merchant} 
                      referrerPolicy="no-referrer"
                      className="size-6 rounded-full grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all"
                    />
                    <span className="text-sm font-serif text-text-main">{tx.merchant}</span>
                  </div>
                </td>
                <td className="px-10 py-6 text-[10px] uppercase tracking-widest text-text-muted font-semibold">{tx.category}</td>
                <td className="px-10 py-6 text-xs italic text-text-muted">{tx.sub}</td>
                <td className={cn(
                  "px-10 py-6 text-sm text-right font-serif font-bold",
                  tx.type === 'income' ? "text-primary" : "text-text-main"
                )}>
                  {tx.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </motion.div>
);

const AccountsView = () => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="space-y-12"
  >
    <header className="flex flex-col gap-4">
      <span className="text-primary text-[9px] uppercase tracking-[0.4em] font-semibold">Wealth Management</span>
      <h1 className="text-text-main text-4xl font-serif font-normal tracking-tight">Accounts Hub</h1>
    </header>

    <section className="bg-white border border-border-light p-10 mb-12 relative overflow-hidden">
      <div className="absolute right-0 top-0 w-1/2 h-full opacity-5 pointer-events-none">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
          <path d="M0,0 L100,0 L100,100 Z" fill="url(#grad1)" />
        </svg>
      </div>
      <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-text-muted mb-6 block">Total Liquid Assets</span>
      <div className="flex items-end justify-between">
        <div>
          <div className="text-text-main text-5xl font-light tracking-tighter mb-2">$2,450,000.00</div>
          <div className="flex items-center gap-3 text-[11px] font-medium tracking-wide">
            <span className="text-emerald-600 flex items-center gap-1">
              <TrendingUp size={14} /> $12,450.00 (0.5%)
            </span>
            <span className="text-text-muted uppercase tracking-widest text-[9px]">Today</span>
          </div>
        </div>
        <div className="flex gap-12 text-right">
          <div>
            <div className="text-[9px] text-text-muted uppercase tracking-[0.2em] mb-1">Cash & Equivalents</div>
            <div className="text-lg font-serif">$350,000</div>
          </div>
          <div>
            <div className="text-[9px] text-text-muted uppercase tracking-[0.2em] mb-1">Investments</div>
            <div className="text-lg font-serif">$2,100,000</div>
          </div>
        </div>
      </div>
    </section>

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      <div className="lg:col-span-7">
        <div className="flex items-center justify-between mb-8">
          <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-text-muted">Accounts Breakdown</span>
          <button className="text-[9px] text-text-muted hover:text-primary uppercase tracking-[0.2em] transition-colors flex items-center gap-1">
            <Plus size={14} /> Add Account
          </button>
        </div>
        <div className="space-y-10">
          {[
            { 
              bank: 'Wells Fargo', 
              accounts: [
                { name: 'Platinum Checking', mask: '**** 4589', balance: '$125,000.00' },
                { name: 'High Yield Savings', mask: '**** 1290', balance: '$225,000.00' }
              ]
            },
            { 
              bank: 'Webull', 
              accounts: [
                { name: 'Individual Brokerage', mask: '**** 8832', balance: '$1,450,000.00' },
                { name: 'Roth IRA', mask: '**** 9941', balance: '$350,000.00' }
              ]
            }
          ].map((group, i) => (
            <div key={i}>
              <div className="flex items-center gap-3 mb-5 border-b border-border-light pb-3">
                <h3 className="text-[11px] font-bold text-text-main uppercase tracking-[0.2em]">{group.bank}</h3>
              </div>
              <div className="space-y-4 pl-8">
                {group.accounts.map((acc, j) => (
                  <div key={j} className="flex items-center justify-between group cursor-pointer">
                    <div className="flex flex-col">
                      <span className="text-[13px] font-medium text-text-main group-hover:text-primary transition-colors">{acc.name}</span>
                      <span className="text-[10px] text-text-muted font-mono mt-0.5">{acc.mask}</span>
                    </div>
                    <span className="text-base text-primary font-serif">{acc.balance}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="lg:col-span-5">
        <div className="bg-white border border-border-light p-8">
          <h4 className="text-[9px] text-text-muted uppercase tracking-[0.2em] mb-8 text-center">Strategic Allocation</h4>
          <div className="flex items-center justify-center mb-8">
            <div className="relative size-40 shrink-0">
              <svg className="size-full transform -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" fill="none" r="16" stroke="#f1f5f9" strokeDasharray="100, 100" strokeWidth="2" />
                <circle cx="18" cy="18" fill="none" r="16" stroke="#c5a059" strokeDasharray="73, 100" strokeWidth="2" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-lg font-serif">100%</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { label: 'Stocks', value: '73%', color: 'bg-primary' },
              { label: 'Cash', value: '14%', color: 'bg-text-main' },
              { label: 'Crypto', value: '12%', color: 'bg-slate-400' },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <span className={cn("size-1.5 rounded-full", item.color)}></span>
                  <span className="text-[9px] text-text-muted uppercase tracking-widest">{item.label}</span>
                </div>
                <span className="text-[11px] font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

const PortfolioView = () => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="space-y-12"
  >
    <header className="flex flex-col gap-4">
      <span className="text-primary text-[9px] uppercase tracking-[0.4em] font-semibold">Asset Allocation</span>
      <h1 className="text-text-main text-5xl font-serif font-normal tracking-tight">Portfolio Dossier</h1>
      <p className="text-text-muted text-sm tracking-wide font-light">A comprehensive audit of your global wealth distribution.</p>
    </header>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 bg-white border border-border-light rounded-3xl p-10 shadow-sm">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-text-main text-xl font-serif font-normal">Geographical Allocation</h2>
          <Globe size={18} className="text-text-muted" strokeWidth={1.5} />
        </div>
        <div className="relative h-[300px] w-full flex items-center justify-center">
          {/* Mock World Map with dots */}
          <div className="absolute inset-0 opacity-10 grayscale pointer-events-none">
            <svg viewBox="0 0 1000 500" className="w-full h-full">
              <path d="M150,150 Q200,100 250,150 T350,150 T450,150 T550,150 T650,150 T750,150 T850,150" fill="none" stroke="currentColor" strokeWidth="1" />
              <path d="M100,250 Q200,200 300,250 T500,250 T700,250 T900,250" fill="none" stroke="currentColor" strokeWidth="1" />
              <path d="M200,350 Q300,300 400,350 T600,350 T800,350" fill="none" stroke="currentColor" strokeWidth="1" />
            </svg>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 w-full relative z-10">
            {[
              { region: 'North America', weight: '45%', status: 'Overweight' },
              { region: 'Europe', weight: '25%', status: 'Neutral' },
              { region: 'Asia Pacific', weight: '18%', status: 'Underweight' },
              { region: 'Emerging Markets', weight: '7%', status: 'Neutral' },
              { region: 'Other', weight: '5%', status: 'Neutral' },
            ].map((r, i) => (
              <div key={i} className="flex flex-col gap-1">
                <span className="text-[9px] uppercase tracking-widest font-bold text-text-muted">{r.region}</span>
                <span className="text-2xl font-light text-text-main">{r.weight}</span>
                <span className={cn(
                  "text-[8px] uppercase font-bold tracking-tighter",
                  r.status === 'Overweight' ? "text-emerald-600" : r.status === 'Underweight' ? "text-rose-600" : "text-text-muted"
                )}>{r.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white border border-border-light rounded-3xl p-10 shadow-sm flex flex-col">
        <h2 className="text-text-main text-xl font-serif font-normal mb-8">Financial Health</h2>
        <div className="flex-1 flex flex-col items-center justify-center gap-6">
          <div className="relative size-48">
            <svg className="size-full transform -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" fill="none" r="16" stroke="#f1f5f9" strokeDasharray="100, 100" strokeWidth="1.5" />
              <circle cx="18" cy="18" fill="none" r="16" stroke="#c5a059" strokeDasharray="88, 100" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-light text-text-main">88</span>
              <span className="text-[9px] uppercase tracking-widest font-bold text-text-muted">Platinum Score</span>
            </div>
          </div>
          <p className="text-center text-xs text-text-muted font-light leading-relaxed px-4">
            Your portfolio health is in the top 2% of global private wealth benchmarks.
          </p>
        </div>
        <button className="w-full py-4 border border-border-light text-[9px] uppercase tracking-[0.3em] font-bold hover:bg-primary hover:text-white hover:border-primary transition-all rounded-xl mt-8">
          Optimization Audit
        </button>
      </div>
    </div>

    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-text-main text-2xl font-serif font-normal">Alternative Assets</h2>
        <span className="text-[9px] uppercase font-bold text-text-muted tracking-[0.3em]">Curated Collection</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { 
            title: 'Modernist Estate', 
            location: 'Zurich, CH', 
            value: '$4.2M', 
            image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
            category: 'Real Estate'
          },
          { 
            title: 'Abstract Expressionism', 
            location: 'Private Vault', 
            value: '$1.8M', 
            image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=800&q=80',
            category: 'Fine Art'
          },
          { 
            title: 'Patek Philippe 5270P', 
            location: 'Safe Deposit', 
            value: '$210K', 
            image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=800&q=80',
            category: 'Horology'
          },
        ].map((asset, i) => (
          <div key={i} className="group cursor-pointer">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl mb-4">
              <img 
                src={asset.image} 
                alt={asset.title} 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                <span className="text-white text-[10px] uppercase tracking-widest font-bold mb-1">{asset.category}</span>
                <span className="text-white text-lg font-serif">{asset.title}</span>
              </div>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <h3 className="text-sm font-medium text-text-main">{asset.title}</h3>
                <p className="text-[10px] text-text-muted uppercase tracking-widest">{asset.location}</p>
              </div>
              <span className="text-primary font-serif font-bold">{asset.value}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  </motion.div>
);

const MarketView = () => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="space-y-12"
  >
    <header className="flex flex-col gap-4">
      <span className="text-primary text-[9px] uppercase tracking-[0.4em] font-semibold">Global Markets</span>
      <h1 className="text-text-main text-5xl font-serif font-normal tracking-tight">Market Pulse</h1>
      <p className="text-text-muted text-sm tracking-wide font-light">Real-time global market monitoring and trend analysis.</p>
    </header>

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      <div className="lg:col-span-8 space-y-12">
        <section className="space-y-6">
          <h2 className="text-text-main text-xl font-serif font-normal">Top Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { 
                title: 'The Future of Digital Sovereignty', 
                source: 'Financial Times', 
                time: '2h ago', 
                image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80',
                category: 'Technology'
              },
              { 
                title: 'Luxury Markets Defy Inflationary Pressures', 
                source: 'Bloomberg', 
                time: '4h ago', 
                image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80',
                category: 'Lifestyle'
              },
            ].map((news, i) => (
              <div key={i} className="group cursor-pointer space-y-4">
                <div className="relative aspect-video overflow-hidden rounded-2xl">
                  <img 
                    src={news.image} 
                    alt={news.title} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full">
                    <span className="text-[8px] uppercase font-bold tracking-widest text-primary">{news.category}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[9px] uppercase tracking-widest font-bold text-text-muted">
                    <span>{news.source}</span>
                    <span className="size-1 rounded-full bg-border-light"></span>
                    <span>{news.time}</span>
                  </div>
                  <h3 className="text-lg font-serif text-text-main group-hover:text-primary transition-colors leading-tight">{news.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-text-main text-xl font-serif font-normal">Sector Performance</h2>
          <div className="bg-white border border-border-light rounded-3xl overflow-hidden shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border-light">
              {[
                { sector: 'Technology', performance: '+2.4%', status: 'Bullish' },
                { sector: 'Energy', performance: '-1.2%', status: 'Bearish' },
                { sector: 'Healthcare', performance: '+0.8%', status: 'Neutral' },
              ].map((s, i) => (
                <div key={i} className="p-8 space-y-4">
                  <span className="text-[9px] uppercase tracking-widest font-bold text-text-muted">{s.sector}</span>
                  <div className="flex items-end justify-between">
                    <span className="text-2xl font-light text-text-main">{s.performance}</span>
                    <span className={cn(
                      "text-[9px] font-bold uppercase tracking-tighter",
                      s.status === 'Bullish' ? "text-emerald-600" : s.status === 'Bearish' ? "text-rose-600" : "text-text-muted"
                    )}>{s.status}</span>
                  </div>
                  <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className={cn(
                      "h-full rounded-full",
                      s.status === 'Bullish' ? "bg-emerald-500 w-3/4" : s.status === 'Bearish' ? "bg-rose-500 w-1/4" : "bg-slate-400 w-1/2"
                    )}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="lg:col-span-4 space-y-8">
        <div className="bg-white border border-border-light rounded-3xl p-8 shadow-sm">
          <h3 className="text-[10px] uppercase tracking-widest font-bold text-text-muted mb-6">Watchlist</h3>
          <div className="space-y-6">
            {[
              { symbol: 'AAPL', price: '231.40', change: '+1.2%' },
              { symbol: 'NVDA', price: '142.10', change: '+3.4%' },
              { symbol: 'TSLA', price: '218.61', change: '-0.8%' },
              { symbol: 'MSFT', price: '412.40', change: '+0.5%' },
              { symbol: 'AMZN', price: '188.20', change: '+1.1%' },
            ].map((w, i) => (
              <div key={i} className="flex items-center justify-between group cursor-pointer">
                <div>
                  <p className="text-xs font-bold text-text-main group-hover:text-primary transition-colors">{w.symbol}</p>
                  <p className="text-[10px] text-text-muted font-mono">${w.price}</p>
                </div>
                <span className={cn(
                  "text-[10px] font-bold",
                  w.change.startsWith('+') ? "text-emerald-600" : "text-rose-600"
                )}>{w.change}</span>
              </div>
            ))}
          </div>
          <button className="w-full py-3 border border-border-light text-[8px] uppercase tracking-[0.2em] font-bold hover:bg-slate-50 transition-all rounded-lg mt-8">
            Edit Watchlist
          </button>
        </div>

        <div className="bg-text-main text-white rounded-3xl p-8 shadow-xl">
          <h3 className="text-lg font-serif mb-4">Market Sentiment</h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-white/60 uppercase tracking-widest">Fear & Greed Index</span>
              <span className="text-primary font-bold">72 (Greed)</span>
            </div>
            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[72%]"></div>
            </div>
            <p className="text-[10px] text-white/40 font-light leading-relaxed italic">
              Market sentiment remains elevated as investors anticipate Q4 earnings results. Caution is advised in overextended sectors.
            </p>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

const InsightsView = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!query.trim()) return;
    setLoading(true);
    const insight = await generateFinancialInsight(query);
    setResponse(insight);
    setLoading(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-12"
    >
      <header className="flex flex-col gap-4">
        <span className="text-primary text-[9px] uppercase tracking-[0.4em] font-semibold">Intelligence Engine</span>
        <h1 className="text-text-main text-5xl font-serif font-normal tracking-tight">Strategic Insights</h1>
        <p className="text-text-muted text-sm tracking-wide font-light">Predictive analysis and algorithmic wealth strategy.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-10">
          <div className="bg-white border border-border-light rounded-3xl p-10 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Sparkles size={20} className="text-primary" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-text-main text-lg font-serif">Executive Summary</h3>
                <p className="text-[9px] uppercase tracking-widest font-bold text-text-muted">Generated Oct 24, 2024</p>
              </div>
            </div>
            
            <div className="space-y-6 text-sm text-text-main font-light leading-relaxed">
              <p>
                Our proprietary <span className="font-semibold italic">Aurum Alpha</span> model has detected a significant shift in global liquidity patterns. While your current allocation remains robust, we identify a <span className="text-primary font-bold">7.2% efficiency gap</span> in your fixed-income ladder.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
                <div className="p-6 bg-slate-50 rounded-2xl border border-border-light">
                  <h4 className="text-[9px] uppercase tracking-widest font-bold text-text-muted mb-2">Opportunity Alpha</h4>
                  <p className="text-sm font-serif italic mb-4">"Emerging Tech in SE Asia"</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-emerald-600 font-bold">+18.4% Est. Yield</span>
                    <ArrowRight size={14} className="text-primary" />
                  </div>
                </div>
                <div className="p-6 bg-slate-50 rounded-2xl border border-border-light">
                  <h4 className="text-[9px] uppercase tracking-widest font-bold text-text-muted mb-2">Risk Mitigation</h4>
                  <p className="text-sm font-serif italic mb-4">"Eurozone Inflation Hedge"</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-primary font-bold">Gold/Commodities</span>
                    <ArrowRight size={14} className="text-primary" />
                  </div>
                </div>
              </div>
              <p>
                We recommend a strategic pivot towards <span className="underline decoration-primary/30 underline-offset-4">Alternative Assets</span> to maintain your 12.5% annualized growth target.
              </p>
            </div>
          </div>

          <div className="bg-text-main text-white rounded-3xl p-10 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] -mr-32 -mt-32"></div>
            <div className="relative z-10 space-y-6">
              <h3 className="text-2xl font-serif">Wealth Concierge</h3>
              <p className="text-white/60 text-sm font-light max-w-md">Your dedicated AI strategist is ready to assist with complex portfolio modeling and tax optimization.</p>
              
              <div className="space-y-4">
                {response && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 bg-white/5 border border-white/10 rounded-2xl text-sm font-light leading-relaxed text-white/90 italic font-serif"
                  >
                    {response}
                  </motion.div>
                )}
                <div className="flex items-center gap-4 pt-4">
                  <input 
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
                    placeholder="Ask about Q4 tax-loss harvesting..."
                    className="flex-1 bg-white/10 border border-white/20 rounded-full px-6 py-3 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 transition-all"
                  />
                  <button 
                    onClick={handleAsk}
                    disabled={loading}
                    className={cn(
                      "size-10 rounded-full bg-primary flex items-center justify-center text-white shadow-lg hover:scale-105 transition-transform disabled:opacity-50",
                      loading && "animate-pulse"
                    )}
                  >
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white border border-border-light rounded-3xl p-8 shadow-sm">
            <h3 className="text-[10px] uppercase tracking-widest font-bold text-text-muted mb-6">Market Pulse</h3>
            <div className="space-y-6">
              {[
                { name: 'S&P 500', value: '5,812.40', change: '+0.45%', color: 'text-emerald-600' },
                { name: 'NASDAQ', value: '18,518.61', change: '+0.82%', color: 'text-emerald-600' },
                { name: 'GOLD', value: '2,734.10', change: '-0.12%', color: 'text-rose-600' },
                { name: 'BTC', value: '67,240.00', change: '+2.15%', color: 'text-emerald-600' },
              ].map((m, i) => (
                <div key={i} className="flex items-center justify-between border-b border-border-light pb-4 last:border-0 last:pb-0">
                  <div>
                    <p className="text-xs font-bold text-text-main">{m.name}</p>
                    <p className="text-[10px] text-text-muted font-mono">{m.value}</p>
                  </div>
                  <span className={cn("text-[10px] font-bold", m.color)}>{m.change}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <Bell size={16} className="text-primary" />
              <h3 className="text-[10px] uppercase tracking-widest font-bold text-primary">Priority Alert</h3>
            </div>
            <p className="text-xs text-text-main font-medium leading-relaxed">
              Unusual volatility detected in your <span className="italic font-serif">Luxury Retail</span> holdings. Consider reducing exposure before the earnings call.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const MediaView = () => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="space-y-12"
  >
    <header className="flex flex-col gap-4">
      <span className="text-primary text-[9px] uppercase tracking-[0.4em] font-semibold">Lifestyle & Assets</span>
      <h1 className="text-text-main text-5xl font-serif font-normal tracking-tight">Media Gallery</h1>
      <p className="text-text-muted text-sm tracking-wide font-light">A curated visual archive of your global acquisitions and lifestyle.</p>
    </header>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[
        { title: 'Alpine Retreat', category: 'Real Estate', image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80' },
        { title: 'Classic Riviera', category: 'Travel', image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80' },
        { title: 'Modernist Sculpture', category: 'Fine Art', image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=800&q=80' },
        { title: 'Vintage Speedster', category: 'Automotive', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80' },
        { title: 'Private Aviation', category: 'Travel', image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=800&q=80' },
        { title: 'Urban Penthouse', category: 'Real Estate', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80' },
      ].map((item, i) => (
        <div key={i} className="group relative aspect-square overflow-hidden rounded-3xl cursor-pointer">
          <img 
            src={item.image} 
            alt={item.title} 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
            <span className="text-primary text-[10px] uppercase tracking-widest font-bold mb-1">{item.category}</span>
            <h3 className="text-white text-2xl font-serif">{item.title}</h3>
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'accounts', label: 'Accounts', icon: Wallet },
    { id: 'transactions', label: 'Transactions', icon: ReceiptText },
    { id: 'portfolio', label: 'Portfolio', icon: Wallet },
    { id: 'market', label: 'Market', icon: Globe },
    { id: 'media', label: 'Media', icon: Share2 },
    { id: 'insights', label: 'Insights', icon: Sparkles },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];


  return (
    <div className="min-h-screen flex">
      <aside className="fixed inset-y-0 left-0 w-[220px] flex flex-col py-10 bg-white border-r border-border-light z-50">
        <div className="mb-16 px-8 flex items-center gap-3">
          <div className="size-6 flex items-center justify-center text-primary">
            <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 4L6 14v20l18 10 18-10V14L24 4zm0 3.8L38.2 15 24 22.8 9.8 15 24 7.8zM8.5 32.2V17.8L22.5 25.5v14.4L8.5 32.2zm17 14.4V25.5L39.5 17.8v14.4L25.5 46.6z" />
            </svg>
          </div>
          <span className="text-sm font-serif tracking-[0.4em] text-text-main font-medium uppercase">Aurum</span>
        </div>

        <nav className="flex-1 flex flex-col">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "nav-link",
                activeTab === item.id ? "nav-link-active" : "nav-link-inactive"
              )}
            >
              <item.icon size={18} strokeWidth={1.5} />
              <span className="nav-text">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto px-8 flex flex-col gap-8">
          <button className="flex items-center gap-4 text-text-muted hover:text-text-main transition-colors group">
            <Bell size={18} strokeWidth={1.5} />
            <span className="text-[9px] uppercase tracking-[0.2em] font-medium">Alerts</span>
          </button>
          <div className="flex items-center gap-4 pt-6 border-t border-border-light">
            <img 
              src="https://picsum.photos/seed/alexander/100/100" 
              alt="Alexander" 
              referrerPolicy="no-referrer"
              className="size-7 rounded-full border border-border-light shadow-sm grayscale hover:grayscale-0 transition-all cursor-pointer"
            />
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold text-text-main tracking-tight">Alexander</span>
              <span className="text-[8px] text-text-muted uppercase tracking-[0.1em]">Platinum Member</span>
            </div>
          </div>
        </div>
      </aside>
      
      <main className="ml-[220px] flex-1 min-h-screen">
        <div className="max-w-[1440px] mx-auto px-12 lg:px-20 py-12">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && <DashboardView key="dashboard" />}
            {activeTab === 'accounts' && <AccountsView key="accounts" />}
            {activeTab === 'transactions' && <TransactionsView key="transactions" />}
            {activeTab === 'portfolio' && <PortfolioView key="portfolio" />}
            {activeTab === 'market' && <MarketView key="market" />}
            {activeTab === 'media' && <MediaView key="media" />}
            {activeTab === 'insights' && <InsightsView key="insights" />}

            {activeTab === 'settings' && (
              <motion.div 
                key="settings"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-12"
              >
                <header className="flex flex-col gap-4">
                  <span className="text-primary text-[9px] uppercase tracking-[0.4em] font-semibold">Preferences</span>
                  <h1 className="text-text-main text-5xl font-serif font-normal tracking-tight">System Settings</h1>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {['Security & Privacy', 'Notification Preferences', 'API Integrations', 'Billing & Membership'].map(s => (
                    <div key={s} className="p-8 bg-white border border-border-light rounded-xl flex items-center justify-between group cursor-pointer hover:border-primary transition-all">
                      <span className="text-sm font-medium text-text-main group-hover:text-primary transition-colors">{s}</span>
                      <ChevronRight size={16} className="text-text-muted group-hover:text-primary transition-all" />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
