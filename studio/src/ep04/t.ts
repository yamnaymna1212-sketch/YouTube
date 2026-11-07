// EP04 timing. Until the user sends the Flint VO, every time is an ESTIMATE (≈3 words/s, like the tight EP02/EP03 takes).
// When the VO arrives: run faster-whisper → words.json, then replace EST with real word starts (same keys) and every
// cut/badge/door below lands on the spoken word automatically.
export const HOOK_EST = {
  friday: 0.0,      // "Friday, December eleventh."
  midnight: 1.7,    // "At midnight, the money that keeps the federal government running runs out."
  runsOut: 4.9,     //   "...runs out."
  party: 5.8,       // "And the party that has to fix it just lost its majority."
  lost: 8.1,        //   "...lost its majority."
  nov3: 9.6,        // "On November third, voters handed Congress to the Democrats."
  democrats: 11.6,
  jake: 12.8,       // "Jake doesn't care who won."
  question: 14.4,   // "He cares about one question."
  what: 16.0,       // "What does this do to my money?"
  because: 18.4,    // "Because Congress decides three things that hit your wallet."
  open: 22.2,       // "Whether the government stays open."
  store: 24.3,      // "What some things cost at the store."
  war: 26.0,        // "And who pays for the war."
  threeDoors: 26.6, // "Three doors."
  letsOpen: 27.7,   // "Let's open them, in the order they hit."
  end: 30.2,
} as const;
export const T = HOOK_EST;
export const HOOK_DUR = 29.9; // seconds: VO + the camera flying through door 1 into gold light (Part02 opens on that light)

// ---- whole-episode word clock (tools/ep04_est.py → cues.json). Estimate now, real VO words later; same API.
import cues from './cues.json';
type Para = { i: number; t: number; words: [string, number, number][] };
const P = (cues as unknown as { paras: Para[] }).paras;
export const EP_DUR = (cues as unknown as { dur: number }).dur;
const n = (w: string) => w.toLowerCase().replace(/[^a-z0-9$%']/g, '');
/** start (s) of paragraph i of vo-clean.txt */
export const paraT = (i: number) => P[i].t;
/** end (s) of paragraph i (last word end) */
export const paraEnd = (i: number) => P[i].words[P[i].words.length - 1][2];
/** start (s) of the nth word in paragraph i that contains `w` */
export const wordT = (i: number, w: string, nth = 0) => {
  const hits = P[i].words.filter(([x]) => n(x).includes(n(w)));
  if (!hits.length) throw new Error(`no word "${w}" in paragraph ${i}`);
  return hits[Math.min(nth, hits.length - 1)][1];
};
