import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { IEvent, Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import { exec } from "./commands";
import { HistorySize, TermColors } from "./constants";
import { getShellPrompt, handleBackspace, isPrintableKeyCode } from "./utils";

export default function TerminalComponent() {
  const terminalRef = useRef(null);

  const [term, setTerm] = useState<Terminal | null>(null);
  function printError(term: Terminal, error: string) {
    term.writeln(TermColors.Red + error);
  }

  function prompt(term: Terminal, shell: string) {
    term.write("\r\n" + getShellPrompt(shell));
  }

  function deleteCurrentInput(term: Terminal, input: string) {
    let i = 0;
    while (i < input.length) {
      term.write("\b \b");
      i++;
    }
  }

  async function initTerminalSession(term: Terminal) {
    term.write(getShellPrompt("123"));
  }

  function loadCommandHistory() {
    const data = localStorage.getItem("history");
    if (!data) {
      return [];
    }
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error("Failed to parse command history", e);
      return [];
    }
  }

  function pushCommandToHistory(store: any, command: string) {
    // Avoid duplicates with last command
    if (store.length > 0 && store[store.length - 1] === command) {
      return;
    }
    store.push(command);
    setTimeout(() => localStorage.setItem("history", JSON.stringify(store)), 0);
  }

  function createOnKeyHandler(term: Terminal) {
    // Track the user input
    let userInput = "";
    // Track command history
    let commandHistory = loadCommandHistory();
    let currentHistoryPosition = commandHistory.length;
    let currentProcessId: any = null;

    function onProcessExit() {
      prompt(term, "123");
      currentProcessId = null;
    }

    return async ({
      key,
      domEvent: ev,
    }: {
      key: string;
      domEvent: KeyboardEvent;
    }) => {
      if (currentProcessId !== null) {
        return;
      }

      switch (ev.key) {
        case "ArrowUp":
        case "ArrowDown": {
          if (commandHistory.length === 0) {
            return;
          }

          if (ev.key === "ArrowDown") {
            // restore input
            if (currentHistoryPosition === commandHistory.length) return;

            currentHistoryPosition = Math.min(
              commandHistory.length,
              currentHistoryPosition + 1
            );
          } else {
            currentHistoryPosition = Math.max(0, currentHistoryPosition - 1);
          }

          deleteCurrentInput(term, userInput);
          if (currentHistoryPosition === commandHistory.length) {
            userInput = "";
          } else {
            userInput = commandHistory[currentHistoryPosition];
          }
          term.write(userInput);
          return;
        }
        case "c": {
          if (ev.ctrlKey) {
            prompt(term, "123");
            userInput = "";
            currentHistoryPosition = commandHistory.length;
            return;
          }
          break;
        }
        case "l": {
          if (ev.ctrlKey) {
            term.clear();
            return;
          }
          break;
        }
        case "Backspace": {
          userInput = handleBackspace(term, userInput);
          return;
        }
        case "Enter": {
          userInput = userInput.trim();
          if (userInput.length === 0) {
            userInput = "";
            prompt(term, "123");
            return;
          }

          term.writeln("");

          try {
            const pId = await exec(term, userInput, onProcessExit);
            if (pId) {
              currentProcessId = pId;
            }
          } catch (e: any) {
            printError(term, e.message);
          }

          if (commandHistory.length > HistorySize) {
            commandHistory = commandHistory.slice(
              HistorySize - commandHistory.length
            );
          }

          pushCommandToHistory(commandHistory, userInput);
          currentHistoryPosition = commandHistory.length;

          userInput = "";
          if (currentProcessId === null) {
            prompt(term, "132");
          }
          return;
        }
      }
      const hasModifier = ev.altKey || ev.ctrlKey || ev.metaKey;

      if (!hasModifier && isPrintableKeyCode(ev.keyCode)) {
        term.write(key);
        userInput += key;
      }
    };
  }

  async function runTerminal(terminalRef: HTMLElement) {
    const term = new Terminal({
      allowTransparency: true,
      cursorBlink: true,
      scrollback: 1000,
      screenReaderMode: false,
      macOptionIsMeta: true,
    });
    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);

    term.open(terminalRef);
    fitAddon.fit();
    term.focus();
    await initTerminalSession(term);
    term.onKey(createOnKeyHandler(term));
    return term;
  }

  const run = useCallback(async () => {
    console.log(terminalRef)
    if (terminalRef.current) {
      return await runTerminal(terminalRef.current);
    }
  }, []);

  useEffect(() => {
    run();
  }, []);

  return <div ref={terminalRef} />;
}