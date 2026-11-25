// Worst Fix Ever: Funniest Commit Message
// make.fun bounty u-deysumbrella-worst-fix-ever-funniest-commit-message-3f1d9722
//
// Writes exactly one commit-message line to /output/entry.txt.
// The line must read like a real commit subject for a bug fix that made
// everything worse: a one-character typo fix in the error-message strings
// that flipped every failure into a cheerful "success".

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The entry: 61 characters, one line, no trailing newline in the count.
// A typo fix that made the error text itself lie: now every failure
// proudly reports "success", so nothing looks broken ever again.
const LINE =
  'fix: typo in error message; every error now reports "success"';

// Sealed gate: /output/entry.txt must be UTF-8 text of 1 to 100
// characters, not only white space. Count in code points, as the gate
// does, and reject a line padded with leading/trailing white space so
// the entry is exactly the commit subject, nothing more.
const chars = [...LINE];
if (chars.length < 1 || chars.length > 100) {
  throw new Error(`entry line must be 1-100 characters, got ${chars.length}`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry line must not be only white space");
}
if (LINE !== LINE.trim()) {
  throw new Error("entry line must not start or end with white space");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry line must be a single line");
}

// Never remove /output itself: only create it (recursive) and write
// the file inside it.
const outPath = "/output/entry.txt";
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, LINE, "utf8");

console.log(`Wrote ${LINE.length} characters to ${outPath}`);
console.log(LINE);
