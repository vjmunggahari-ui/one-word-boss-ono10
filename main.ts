import { writeFileSync, readFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}
const word = "Nitpicker";
mkdirSync(outDir, { recursive: true });
const target = join(outDir, "entry.txt");
writeFileSync(target, word, "utf8");
// Self-check: read back and verify byte-identical, single word, 1-30 chars,
// no trailing newline, and the exact byte length (the gate counts characters
// and the file must hold exactly the word, nothing else).
const back = readFileSync(target, "utf8");
if (back !== word) throw new Error("entry.txt read-back mismatch");
if (!/^[^\s]{1,30}$/.test(back)) throw new Error("entry.txt fails the single-word gate");
if (Buffer.byteLength(back, "utf8") !== word.length) throw new Error("entry.txt byte-length mismatch");
if (back.includes("\n")) throw new Error("entry.txt must not contain a newline");
console.log("wrote entry.txt:", JSON.stringify(back));
