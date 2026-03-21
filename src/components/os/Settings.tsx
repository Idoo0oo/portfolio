import { useState } from "react";
import { 
  Monitor, 
  Volume2, 
  Info, 
  Palette, 
  Check,
  Cpu,
  Database,
  ShieldCheck,
  Zap,
  ExternalLink,
  Activity
} from "lucide-react";
import { useOSStore } from "../../core/store/useOSStore";
import { cn } from "../../core/lib/utils";

type TabId = "appearance" | "sounds" | "about";

const tabs = [
  { id: "appearance" as TabId, label: "Appearance", icon: Palette },
  { id: "sounds" as TabId, label: "Sounds", icon: Volume2 },
  { id: "about" as TabId, label: "About", icon: Info },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState<TabId>("appearance");
  const { isDarkMode, toggleDarkMode, isSoundEnabled, toggleSound, accentColor, setAccentColor, focusApp } = useOSStore();

  const renderContent = () => {
    switch (activeTab) {
      case "appearance":
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <section>
              <h3 className="text-xs font-bold text-white/30 uppercase tracking-widest mb-4">Appearance</h3>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => !isDarkMode && toggleDarkMode()}
                  className={cn(
                    "relative group flex flex-col items-center gap-3 p-4 rounded-xl border transition-all",
                    isDarkMode 
                      ? "border-[var(--color-accent)]/50 bg-[var(--color-accent)]/10 shadow-[0_0_20px_var(--color-accent-glow)]" 
                      : "bg-white/5 border-white/5 hover:bg-white/10"
                  )}
                >
                  <div className="w-full h-16 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-black p-2">
                       <div className="w-8 h-1 bg-white/20 rounded-full mb-1" />
                       <div className="w-12 h-1 bg-white/10 rounded-full" />
                    </div>
                  </div>
                  <span className="text-xs font-medium text-white/90">Dark</span>
                  {isDarkMode && (
                    <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[var(--color-accent)] flex items-center justify-center">
                      <Check size={10} className="text-white" />
                    </div>
                  )}
                </button>

                <button 
                  onClick={() => isDarkMode && toggleDarkMode()}
                  className={cn(
                    "relative group flex flex-col items-center gap-3 p-4 rounded-xl border transition-all",
                    !isDarkMode 
                      ? "border-[var(--color-accent)]/50 bg-[var(--color-accent)]/10 shadow-[0_0_20px_var(--color-accent-glow)]" 
                      : "bg-white/5 border-white/5 hover:bg-white/10"
                  )}
                >
                  <div className="w-full h-16 rounded-lg bg-white border border-black/10 flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-blue-50 to-white p-2">
                       <div className="w-8 h-1 bg-black/20 rounded-full mb-1" />
                       <div className="w-12 h-1 bg-black/10 rounded-full" />
                    </div>
                  </div>
                  <span className="text-xs font-medium text-white/90">Light</span>
                  {!isDarkMode && (
                    <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[var(--color-accent)] flex items-center justify-center">
                      <Check size={10} className="text-white" />
                    </div>
                  )}
                </button>
              </div>
            </section>

            <section>
              <h3 className="text-xs font-bold text-white/30 uppercase tracking-widest mb-4">Accent Color</h3>
              <div className="flex gap-3">
                {['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#a855f7'].map(color => (
                  <div 
                    key={color} 
                    onClick={() => setAccentColor(color)}
                    className={cn(
                      "w-6 h-6 rounded-full border-2 cursor-pointer hover:scale-110 transition-all flex items-center justify-center",
                      accentColor === color ? "border-white scale-110 shadow-[0_0_10px_white/30]" : "border-white/10"
                    )}
                    style={{ backgroundColor: color }}
                  >
                     {accentColor === color && <Check size={10} className="text-white" />}
                  </div>
                ))}
              </div>
            </section>
          </div>
        );

      case "sounds":
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <section className="bg-white/5 rounded-xl border border-white/5 p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                  <Volume2 size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white/90">System Sounds</h4>
                  <p className="text-xs text-white/40">Interaction chimes and alerts</p>
                </div>
              </div>
              <button 
                onClick={toggleSound}
                className={cn(
                  "w-12 h-6 rounded-full transition-colors relative",
                  isSoundEnabled ? "bg-[var(--color-accent)]" : "bg-white/10"
                )}
              >
                <div className={cn(
                  "absolute top-1 w-4 h-4 rounded-full bg-white transition-all shadow-sm",
                  isSoundEnabled ? "left-7" : "left-1"
                )} />
              </button>
            </section>

            <section>
              <h3 className="text-xs font-bold text-white/30 uppercase tracking-widest mb-4">Sound Effects</h3>
              <div className="space-y-1">
                 <div className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors group cursor-pointer">
                    <span className="text-xs text-white/70">Play sound on startup</span>
                    <Check size={14} className="text-[var(--color-accent)]" />
                 </div>
                 <div className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors group cursor-pointer">
                    <span className="text-xs text-white/70">Play sound on app launch</span>
                    <Check size={14} className="text-[var(--color-accent)]" />
                 </div>
              </div>
            </section>
          </div>
        );

      case "about":
        return (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
             {/* Hero Section */}
             <div className="flex flex-col items-center text-center space-y-6 pt-4 pb-10 border-b border-white/5 relative overflow-hidden rounded-3xl group">
                {/* Background Ambient Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[var(--color-accent)]/10 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                
                <div className="relative">
                   <div className="w-28 h-28 rounded-[2rem] bg-gradient-to-br from-zinc-800 to-black border border-white/10 p-6 shadow-2xl flex items-center justify-center overflow-hidden transition-transform duration-500 group-hover:scale-110">
                      <Monitor size={60} className="text-white/80" />
                      {/* Logo Shimmer */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full opacity-0 group-hover:opacity-100 transition-all duration-1000 ease-in-out" />
                   </div>
                   {/* Badge */}
                   <div className="absolute -bottom-2 -right-2 px-3 py-1 bg-[var(--color-accent)] rounded-full text-[9px] font-black uppercase tracking-tighter text-white shadow-lg shadow-[var(--color-accent-glow)] scale-0 group-hover:scale-100 transition-transform duration-300">
                      v2.0 PRO
                   </div>
                </div>

                <div className="space-y-1 relative">
                  <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 tracking-tighter leading-none">
                    PortfolioOS
                  </h2>
                  <p className="text-[10px] font-bold text-[var(--color-accent)] uppercase tracking-[0.3em] opacity-80">
                     Portfolio Experience Prototype
                  </p>
                </div>
             </div>

             {/* Specs Grid */}
             <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { label: "Processor", value: "Apple M3 Pro Max (Emulated)", icon: Cpu, desc: "16-core CPU / 40-core GPU" },
                  { label: "Memory", value: "32 GB LPDDR5", icon: Database, desc: "6400 MT/s Unified RAM" },
                  { label: "Security", value: "Secure Enclave (T2+)", icon: ShieldCheck, desc: "FIPS 140-2 Level 2" },
                  { label: "Graphics", value: "Metal v3 Acceleration", icon: Zap, desc: "Hardware Raytracing Enabled" },
                  { label: "System Build", value: "2.0.0 (23F79)", icon: Info, desc: "Cinematic Channel" },
                  { label: "Uptime", value: "7d 4h 22m", icon: Activity, desc: "Optimized Performance" }
                ].map((spec) => (
                  <div 
                    key={spec.label} 
                    className="p-5 bg-white/[0.03] border border-white/5 rounded-2xl flex flex-col gap-4 hover:bg-white/[0.05] hover:border-[var(--color-accent)]/30 hover:shadow-[0_0_30px_var(--color-accent-glow)] transition-all duration-300 group/card"
                  >
                     <div className="w-9 h-9 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center text-[var(--color-accent)] group-hover/card:scale-110 transition-transform">
                        <spec.icon size={18} />
                     </div>
                     <div className="space-y-1">
                        <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">{spec.label}</span>
                        <h4 className="text-sm font-bold text-white/90 group-hover/card:text-white transition-colors">{spec.value}</h4>
                        <p className="text-[10px] text-white/20 font-medium">{spec.desc}</p>
                     </div>
                  </div>
                ))}
             </div>

             {/* Footer Info */}
             <div className="flex items-center justify-between p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 border border-white/10" />
                   <div className="flex flex-col">
                      <span className="text-xs font-bold text-white/90 underline decoration-[var(--color-accent)] underline-offset-4 cursor-pointer hover:text-white transition-colors">Muhammad Ditto Alfiansyah</span>
                      <span className="text-[10px] text-white/30">System Architect & Developer</span>
                   </div>
                </div>
                <button 
                   onClick={() => focusApp('about')}
                   className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[11px] font-bold text-white/70 hover:bg-white/10 hover:text-white transition-all group"
                >
                   System Report
                   <ExternalLink size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
             </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-full bg-[#050505] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-56 border-r border-white/5 bg-white/[0.02] p-4 flex flex-col gap-2">
        <div className="px-2 mb-6">
           <h2 className="text-xl font-black text-white/90">Settings</h2>
        </div>

        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-sm font-medium",
              activeTab === tab.id 
                ? "bg-[var(--color-accent)]/20 text-[var(--color-accent)] shadow-[inset_0_0_10px_var(--color-accent-glow)]" 
                : "text-white/40 hover:bg-white/5 hover:text-white/60"
            )}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
        
        <div className="mt-auto px-2 py-4 border-t border-white/5">
           <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 border border-white/10" />
              <div className="flex flex-col">
                 <span className="text-[11px] font-bold text-white/90">Local Guest</span>
                 <span className="text-[9px] text-white/30 truncate">ID: 0x2A...4B9</span>
              </div>
           </div>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 p-8 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20">
        <div className="max-w-3xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
