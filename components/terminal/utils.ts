import { Terminal } from "xterm";
import { TermColors } from "./constants";

/**
 * @param {KeyboardEvent.keyCode} keyCode
 */
export function isPrintableKeyCode(keyCode: number) {
  return (
    keyCode === 32 ||
    (keyCode >= 48 && keyCode <= 90) ||
    (keyCode >= 96 && keyCode <= 111) ||
    (keyCode >= 186 && keyCode <= 222)
  );
}

/**
 * @param {string} input
 * @returns {string}
 */

export function handleBackspace(term: Terminal, input: string): string {
  if (input.length === 0) return input;

  //   if (term._core.buffer.x === 0 && term._core.buffer.y > 1) {
  //     // fix it???
  //     // Move up
  //     term.write("\x1b[A");
  //     // Move to the end
  //     term.write("\x1b[" + term._core.buffer._cols + "G");
  //     term.write(" ");
  //   } else {
  //     term.write("\b \b");
  //   }
  //   return input.substring(0, input.length - 1);
  return "";
}

export function getSpacing(spacing: number, spacer = " ") {
  const ret = [];
  let i = spacing;

  while (i > 0) {
    ret.push(spacer);
    i -= 1;
  }
  return ret.join("");
}

export function getShellPrompt(shell: string) {
  return TermColors.Purple + `${shell}:~$` + TermColors.Reset;
}

export function colorize(color: string, text: string) {
  return `${color}${text}${TermColors.Reset}`;
}
