import { useState, useRef, useEffect, type KeyboardEvent } from "react";
import { useAppStore } from "../../store/useAppStore";

interface HistoryItem {
  command: string;
  output: string | React.ReactNode;
}

export default function Terminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([
    { command: "", output: "Welcome to IdoOS v1.0.0.\nType 'help' to see available commands." }
  ]);
  const endOfTerminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const toggleDevMode = useAppStore((state) => state.toggleDevMode);

  // Auto-scroll ke bawah saat ada pesan baru
  useEffect(() => {
    endOfTerminalRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  // Fokus ke input saat terminal di-klik
  const focusInput = () => {
    inputRef.current?.focus();
  };

  const handleCommand = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const cmd = input.trim().toLowerCase();
      let output: string | React.ReactNode = "";

      switch (cmd) {
        case "help":
          output = "Available commands:\n- about   : Who is Ido?\n- projects: View my work\n- clear   : Clear terminal\n- exit    : Exit Developer Mode";
          break;
        case "about":
          output = "I'm Ido, a creative developer specializing in interactive digital experiences using React, Three.js, and modern web technologies.";
          break;
        case "projects":
          output = "Loading projects data... (Switch back to normal mode to see the 3D showcase!)";
          break;
        case "clear":
          setHistory([]);
          setInput("");
          return;
        case "exit":
          toggleDevMode();
          return;
        case "":
          output = "";
          break;
        default:
          output = `Command not found: ${cmd}. Type 'help' for a list of commands.`;
      }

      setHistory([...history, { command: input, output }]);
      setInput("");
    }
  };

  return (
    <div 
      className="font-mono text-sm text-gray-300 min-h-[300px] flex flex-col"
      onClick={focusInput}
    >
      {/* Riwayat Perintah */}
      {history.map((item, index) => (
        <div key={index} className="mb-2 whitespace-pre-wrap">
          {item.command && (
            <div className="flex text-[var(--color-neon)] mb-1">
              <span className="mr-2">guest@ido-os:~$</span>
              <span>{item.command}</span>
            </div>
          )}
          <div className="text-gray-400 leading-relaxed">{item.output}</div>
        </div>
      ))}

      {/* Input Aktif */}
      <div className="flex text-[var(--color-neon)] mt-2">
        <span className="mr-2">guest@ido-os:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleCommand}
          className="flex-1 bg-transparent outline-none border-none text-white caret-[var(--color-neon)]"
          autoFocus
          spellCheck="false"
          autoComplete="off"
        />
      </div>
      <div ref={endOfTerminalRef} />
    </div>
  );
}