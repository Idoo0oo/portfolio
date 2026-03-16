import { useState, useEffect } from "react";
import Window from "../components/os/Window";
import Terminal from "../components/os/Terminal";
import { Terminal as TerminalIcon, Cpu, Activity, Wifi } from "lucide-react";

export default function DeveloperOS() {
  const [time, setTime] = useState(new Date());

  // Update jam setiap detik
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-40 bg-black flex items-center justify-center overflow-hidden font-mono bg-[radial-gradient(ellipse_at_center,_#111_0%,_#000_100%)]">
      
      {/* Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />

      {/* Main Window */}
      <Window title="terminal.exe" defaultPosition={{ x: 0, y: -40 }}>
        <Terminal />
      </Window>

      {/* --- TASKBAR BARU --- */}
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-black/80 backdrop-blur-md border-t border-white/10 px-4 flex items-center justify-between text-[10px] text-gray-500 uppercase tracking-widest">
        
        {/* Sisi Kiri: Menu & Apps */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2 text-[var(--color-neon)]">
            <TerminalIcon size={14} />
            <span className="font-bold">IdoOS v1.0</span>
          </div>
          <div className="hidden sm:flex items-center space-x-4">
            <span className="flex items-center gap-1"><Cpu size={12}/> CPU: 12%</span>
            <span className="flex items-center gap-1"><Activity size={12}/> RAM: 2.4GB</span>
          </div>
        </div>

        {/* Sisi Kanan: Clock & Status */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center gap-2">
            <Wifi size={12} className="text-green-500" />
            <span>Connected</span>
          </div>
          <div className="font-bold text-gray-300">
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </div>
        </div>
      </div>
    </div>
  );
}