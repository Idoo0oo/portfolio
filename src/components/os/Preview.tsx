export default function Preview() {
  return (
    <div className="flex h-full w-full flex-col bg-[#1c1c1c] text-white select-none overflow-hidden rounded-b-xl">
      {/* Toolbar */}
      <header className="h-11 bg-[#2a2a2a]/80 backdrop-blur border-b border-white/5 flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-white/10" />
            <div className="w-2 h-2 rounded-full bg-white/10" />
            <div className="w-2 h-2 rounded-full bg-white/10" />
          </div>
          <span className="text-[12px] text-white/50 font-medium">cv-muhammad-ditto.pdf</span>
        </div>
        <a
          href="/cv-muhammad-ditto.pdf"
          download
          className="flex items-center gap-1.5 px-3 py-1 bg-[var(--color-neon)] text-black text-[11px] font-bold rounded-md hover:opacity-90 transition-opacity"
        >
          ↓ Download
        </a>
      </header>

      {/* PDF Iframe */}
      <div className="flex-1 overflow-hidden bg-[#404040]">
        <iframe
          src="/cv-muhammad-ditto.pdf"
          className="w-full h-full border-none"
          title="Muhammad Ditto — CV"
        />
      </div>

      {/* Footer */}
      <footer className="h-6 bg-[#2a2a2a]/80 border-t border-white/5 flex items-center px-4 shrink-0">
        <span className="text-[10px] text-white/30">cv-muhammad-ditto.pdf — Preview</span>
      </footer>
    </div>
  );
}
