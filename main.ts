import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// One Star, Five Stars for the Food — one sentence, an alien tourist's
// one-star review of Earth that still slips in a real compliment about
// the food. Gate: /output/entry.txt, UTF-8, 1-200 characters, not blank.
const ENTRY =
  "One star: the gravity stole my luggage, the locals queue for burnt coffee, yet the rendang alone nearly earns this planet a second one.";

const MIN_CHARS = 1;
const MAX_CHARS = 200;

function countSentences(text: string): number {
  return text
    .trim()
    .split(/[.!?]+/)
    .filter((s) => s.trim().length > 0).length;
}

function validateEntry(text: string): void {
  const chars = [...text].length;
  if (chars < MIN_CHARS || chars > MAX_CHARS) {
    throw new Error(`entry is ${chars} chars, must be ${MIN_CHARS}-${MAX_CHARS}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (countSentences(text) !== 1) {
    throw new Error("entry must be exactly one sentence");
  }
  if (text !== text.trim()) {
    throw new Error("entry must not start or end with whitespace");
  }
}

validateEntry(ENTRY);
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");

// Read back what was written and confirm it is byte-for-byte identical.
const written = readFileSync("/output/entry.txt");
if (!Buffer.from(ENTRY, "utf8").equals(written)) {
  throw new Error("read-back mismatch: /output/entry.txt differs from ENTRY");
}
console.log(`wrote /output/entry.txt (${[...ENTRY].length} chars, ${written.length} bytes, verified byte-for-byte)`);
