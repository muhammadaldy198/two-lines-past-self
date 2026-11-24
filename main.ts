import { chmodSync, mkdirSync, writeFileSync } from "node:fs";
// Entry: E-TRAIN — 268 chars, exactly two lines, one sentence each.
// Line 1 warns about one moment; line 2 traces what that moment cost.
import { join } from "node:path";

// Two lines to my past self: one warning, one consequence.
const ENTRY =
  "Do not catch the 7:40 train on the morning your sister calls from the hospital and says she is scared of the dark and asks you to stay on the phone.\n" +
  "You arrived on time for a meeting nobody remembers, and you missed the last hour she was awake enough to say your name.";

const MIN_CHARS = 1;
const MAX_CHARS = 280;

const chars = [...ENTRY].length;
if (chars < MIN_CHARS || chars > MAX_CHARS) {
  throw new Error(`entry must be ${MIN_CHARS}-${MAX_CHARS} characters, got ${chars}`);
}

const lines = ENTRY.split("\n");
if (lines.length !== 2) {
  throw new Error(`entry must be exactly 2 lines, got ${lines.length}`);
}
for (const line of lines) {
  if (line.trim().length === 0) throw new Error("entry lines must not be blank");
  if (line !== line.trim()) throw new Error("entry lines must not have leading/trailing whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outFile = join(outDir, "entry.txt");
writeFileSync(outFile, ENTRY, "utf8");
chmodSync(outFile, 0o644);
