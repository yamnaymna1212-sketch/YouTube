// EP04 timing. Until the user sends the Flint VO, every time is an ESTIMATE (≈3 words/s, like the tight EP02/EP03 takes).
// When the VO arrives: run faster-whisper → words.json, then replace EST with real word starts (same keys) and every
// cut/badge/door below lands on the spoken word automatically.

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

// ---- hook times, straight from the narrator's words (paragraphs 0–4)
export const T = {
  friday: wordT(0, 'Friday'), midnight: wordT(0, 'At'), runsOut: wordT(0, 'runs'),
  party: paraT(1), lost: wordT(1, 'lost'),
  nov3: paraT(2), democrats: wordT(2, 'Democrats'), jake: wordT(2, 'Jake'), question: wordT(2, 'He'), what: wordT(2, 'What'),
  because: paraT(3), open: wordT(3, 'open'), store: wordT(3, 'store'), war: wordT(3, 'war'),
  threeDoors: paraT(4), letsOpen: wordT(4, "Let's"), end: paraEnd(4),
};
/** the hook runs until Part 02 starts, so the parts join with no gap on the VO clock */
export const HOOK_DUR = paraT(5);
export const VO_FILE = 'ep04/vo/vo_ep04.mp3';
