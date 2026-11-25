import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const entry =
  "I'm sorry \u2014 I filed the launch plan under 'snacks', so the team spent the morning hunting for it in the pantry instead of the project folder.\n" +
  "I've learned to read the folder name back before I save, and from now on I'll confirm the destination out loud before filing anything.";

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", entry, "utf8");

// Read back and verify: exact match, within the 1-400 character gate,
// not only whitespace, and exactly two lines separated by one newline.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== entry) {
  throw new Error("read-back mismatch: /output/entry.txt does not hold the exact entry text");
}
if (written.length < 1 || written.length > 400 || written.trim().length === 0) {
  throw new Error(`entry out of gate: ${written.length} characters`);
}
if (written.split("\n").length !== 2) {
  throw new Error(`entry must be exactly two lines, got ${written.split("\n").length}`);
}
console.log(`wrote /output/entry.txt (${written.length} characters, 2 lines)`);
