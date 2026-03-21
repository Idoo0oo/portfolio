import { useState, useRef, useEffect, type KeyboardEvent } from "react";
import { useOSStore } from "../../core/store/useOSStore";

interface HistoryItem {
  command: string;
  output: string | React.ReactNode;
}

const SKILLS = {
  "Languages":  ["TypeScript", "JavaScript", "PHP", "SQL"],
  "Frontend":   ["React", "Vite", "Three.js", "R3F", "Framer Motion", "TailwindCSS"],
  "Backend":    ["Express.js", "Node.js", "MySQL", "REST API"],
  "Tools":      ["Git", "Vercel", "Figma", "Rapier"],
};

const UPTIME_START = Date.now();

function Neofetch() {
  const [uptimeStr, setUptimeStr] = useState("");

  useEffect(() => {
    const uptimeSecs = Math.floor((Date.now() - UPTIME_START) / 1000);
    const timer = setTimeout(() => {
      setUptimeStr(uptimeSecs < 60
        ? `${uptimeSecs}s`
        : `${Math.floor(uptimeSecs / 60)}m ${uptimeSecs % 60}s`);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const neon = "text-[var(--color-accent)]";

  return (
    <div className="flex gap-8 my-1 font-mono text-[11px]">
      {/* ASCII Art */}
      <pre className={`${neon} leading-tight text-[10px] shrink-0`}>{`
  ██╗██████╗  ██████╗
  ██║██╔══██╗██╔═══██╗
  ██║██║  ██║██║   ██║
  ██║██║  ██║██║   ██║
  ██║██████╔╝╚██████╔╝
  ╚═╝╚═════╝  ╚═════╝
  `}</pre>

      {/* Info Panel */}
      <div className="text-gray-300 space-y-0.5">
        <p><span className={neon}>user</span>@<span className={neon}>portfolio</span></p>
        <p className="text-white/20 text-[10px]">─────────────────────────</p>
        <p><span className={neon}>name      </span> Muhammad Ditto</p>
        <p><span className={neon}>role      </span> Full-Stack Developer</p>
        <p><span className={neon}>location  </span> Tangerang, Indonesia</p>
        <p><span className={neon}>os        </span> macOS Cinematic Portfolio v2.0</p>
        <p><span className={neon}>kernel    </span> React 18 + Vite + Three.js</p>
        <p><span className={neon}>uptime    </span> {uptimeStr}</p>
        <p><span className={neon}>shell     </span> zsh 5.9</p>
        <p><span className={neon}>github    </span> github.com/Idoo0oo</p>
        <p><span className={neon}>email     </span> dittosanzz05@gmail.com</p>
        <p className="text-white/20 text-[10px]">─────────────────────────</p>

        {/* Skills Matrix */}
        {Object.entries(SKILLS).map(([cat, skills]) => (
          <p key={cat}>
            <span className={neon}>{cat.padEnd(10)}</span>
            {skills.map((s, i) => (
              <span key={s}>
                <span className="text-white/80">{s}</span>
                {i < skills.length - 1 && <span className="text-white/30"> · </span>}
              </span>
            ))}
          </p>
        ))}

        <p className="text-white/20 text-[10px]">─────────────────────────</p>
        {/* Color Palette */}
        <div className="flex gap-1 pt-0.5">
          {["bg-black","bg-zinc-700","bg-zinc-500","bg-white","bg-[var(--color-accent)]","bg-blue-500","bg-orange-400","bg-rose-500"].map(c => (
            <span key={c} className={`inline-block w-3 h-3 rounded-sm ${c}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Terminal() {
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: "",
      output: (
        <span className="text-white/50 text-[11px]">
          Welcome to <span className="text-[var(--color-accent)]">macOS Cinematic Portfolio</span> v2.0{"\n"}
          Type <span className="text-white">'help'</span> for available commands, or{" "}
          <span className="text-white">'neofetch'</span> for system info.
        </span>
      )
    }
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { openApp, closeApp } = useOSStore();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const focusInput = () => inputRef.current?.focus();

  const handleCommand = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const newIdx = Math.min(historyIdx + 1, cmdHistory.length - 1);
      setHistoryIdx(newIdx);
      setInput(cmdHistory[newIdx] ?? "");
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const newIdx = Math.max(historyIdx - 1, -1);
      setHistoryIdx(newIdx);
      setInput(newIdx === -1 ? "" : cmdHistory[newIdx]);
      return;
    }
    if (e.key !== "Enter") return;

    const fullCmd = input.trim();
    const cmd = fullCmd.toLowerCase().split(" ")[0];
    let output: string | React.ReactNode = "";

    switch (cmd) {
      case "help":
        output = (
          <div className="space-y-0.5 text-[11px]">
            <p className="text-[var(--color-accent)] font-bold mb-1">Available commands:</p>
            {[
              ["neofetch",   "System information & skills"],
              ["about",      "Open About Me window"],
              ["projects",   "Open Projects (Finder)"],
              ["experience", "Open Experience (Notes)"],
              ["contact",    "Open Mail app"],
              ["resume",     "Open CV in Preview"],
              ["whoami",     "Who am I?"],
              ["skills",     "List all tech skills"],
              ["clear",      "Clear terminal"],
              ["exit",       "Close terminal"],
            ].map(([c, d]) => (
              <p key={c}>
                <span className="text-white w-14 inline-block">{c}</span>
                <span className="text-white/40"> — {d}</span>
              </p>
            ))}
          </div>
        );
        break;
      case "neofetch":
        output = <Neofetch />;
        break;
      case "whoami":
        output = "muhammad-ditto — full-stack developer, creative coder, Tangerang ID";
        break;
      case "skills":
        output = (
          <div className="text-[11px] space-y-0.5">
            {Object.entries(SKILLS).map(([cat, skills]) => (
              <p key={cat}>
                <span className="text-[var(--color-accent)] w-14 inline-block">{cat}</span>
                <span className="text-white/70"> {skills.join("  ·  ")}</span>
              </p>
            ))}
          </div>
        );
        break;
      case "about":
        openApp('about');
        output = "► Launching About Me...";
        break;
      case "projects":
        openApp('projects');
        output = "► Launching Projects (Finder)...";
        break;
      case "experience":
        openApp('experience');
        output = "► Loading Experience Timeline...";
        break;
      case "contact":
        openApp('contact');
        output = "► Opening Mail...";
        break;
      case "resume":
        openApp('preview');
        output = "► Opening CV in Preview...";
        break;
      case "clear":
        setHistory([]);
        setInput("");
        setCmdHistory(prev => fullCmd ? [fullCmd, ...prev] : prev);
        setHistoryIdx(-1);
        return;
      case "exit":
        closeApp('terminal');
        return;
      case "":
        output = "";
        break;
      default:
        output = `zsh: command not found: ${cmd}. Type 'help' for available commands.`;
    }

    setHistory(prev => [...prev, { command: input, output }]);
    setCmdHistory(prev => fullCmd ? [fullCmd, ...prev] : prev);
    setHistoryIdx(-1);
    setInput("");
  };

  return (
    <div
      className="font-mono text-xs text-gray-300 h-full max-h-full flex flex-col p-3 bg-[#050505] overflow-hidden"
      onClick={focusInput}
    >
      <div ref={scrollRef} className="flex-1 overflow-y-auto min-h-0 custom-scrollbar pr-1">
        {history.map((item, index) => (
          <div key={index} className="mb-2 whitespace-pre-wrap">
            {item.command && (
              <div className="flex text-[var(--color-neon)] mb-1">
                <span className="mr-2 opacity-60">guest@ido-mac:~$</span>
                <span className="text-white">{item.command}</span>
              </div>
            )}
            <div className="text-gray-400 leading-relaxed">{item.output}</div>
          </div>
        ))}
      </div>

      <div className="flex text-[var(--color-accent)] mt-2 border-t border-white/5 pt-2">
        <span className="mr-2 opacity-60 shrink-0">guest@ido-mac:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleCommand}
          className="flex-1 bg-transparent outline-none border-none text-white caret-[var(--color-accent)]"
          autoFocus
          spellCheck="false"
          autoComplete="off"
        />
      </div>
    </div>
  );
}