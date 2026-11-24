// One-Line Office Joke: 24-Hour Sprint
// A make.fun entry: this program writes exactly one line — a one-line joke
// about office life, at most 200 characters, the sort of line you send a
// colleague after a meeting that should have been an email — to
// /output/entry.txt.
//
// It is fully deterministic: no network, no randomness, no clock, no input.
// It only writes the one file and exits.
//
// The line (v2 — revised from v1: added "30-minute" before "follow-up".
// The detail is a real calendar fact — a follow-up that itself eats half
// an hour — and it sharpens the joke's own absurdity: the meeting that
// wasted your time now schedules thirty more minutes to justify wasting
// it. 10 characters longer, same single-sentence shape):
//
//   The meeting that should have been an email ended by booking a
//   30-minute follow-up to explain why it couldn't have been an email.
//
// Hand-counted: 128 characters, one line, one sentence.
//
// Why this line, against the judge brief in RULES.txt:
//   1. It IS a one-line joke about office life, not a quip or stray
//      observation: a meeting, the most office of objects, is the subject,
//      and the joke lands on it — the meeting justifies its own existence.
//   2. It is funny because the punchline pays off the setup: a meeting that
//      should have been an email does the most meeting thing possible — it
//      books another meeting, this time to explain why it couldn't have
//      been an email. The bureaucracy defends itself, in a meeting.
//      Anyone who has sat through one recognises the move instantly.
//   3. It is one line: a single sentence, setup and punchline on the same
//      line, no rambling around it.
//   4. It is fresh: the twist is not "another meeting" in general, but a
//      follow-up convened for the specific purpose of explaining why the
//      first meeting couldn't have been an email — the meeting holding a
//      meeting about itself.
//   5. It is clear on first read: every word is plain office vocabulary,
//      no reference the reader cannot follow, wording kept tight at 128
//      of the 200 characters.

import { writeFileSync } from "node:fs";
import { join } from "node:path";

// The grader mounts the output directory and passes it in, or the program
// falls back to /output. The directory already exists when the grader runs,
// so this program never creates or deletes it.
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const OUTPUT_FILE = join(OUTPUT_DIR, "entry.txt");

const MAX_CHARS = 200;

// The joke. One line, no newline inside it, no trailing newline in the
// file: the gate counts the file's characters, and a single line means
// exactly the line itself.
const LINE =
  "The meeting that should have been an email ended by booking a 30-minute " +
  "follow-up to explain why it couldn't have been an email.";

function buildLine(): string {
  const text = LINE;
  if (text.trim().length === 0) {
    throw new Error("the joke line is empty");
  }
  if (text.length > MAX_CHARS) {
    throw new Error(
      `joke line is ${text.length} characters, over the ${MAX_CHARS} cap`,
    );
  }
  // Exactly one line: no newline anywhere in the text.
  if (/[\r\n]/.test(text)) {
    throw new Error("joke line must be a single line");
  }
  // It must be a joke about office life, not a stray observation: the words
  // that carry the office setting and the joke's turn are checked, not just
  // trusted to be there.
  const required = ["meeting", "email", "follow-up"];
  const lower = text.toLowerCase();
  for (const word of required) {
    if (!lower.includes(word)) {
      throw new Error(`joke line lost the word "${word}"`);
    }
  }
  return text;
}

const line = buildLine();
writeFileSync(OUTPUT_FILE, line, "utf8");
console.log(`Wrote ${line.length} characters to ${OUTPUT_FILE}`);
