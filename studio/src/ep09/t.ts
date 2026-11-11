// EP04 timing. Until the user sends the Flint VO, every time is an ESTIMATE (≈3 words/s, like the tight EP02/EP03 takes).
// When the VO arrives: run faster-whisper → words.json, then replace EST with real word starts (same keys) and every
// cut/badge/door below lands on the spoken word automatically.

// ---- whole-episode word clock (tools/ep09_est.py → cues.json). Estimate now, real VO words later; same API.
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


// TODO: hook times for this episode, e.g. export const T = { party: paraT(1), lost: wordT(1, 'lost') };
export const HOOK_DUR = 30; // set to paraT(<first paragraph of Part02>) once the VO exists
export const VO_FILE = 'ep09/vo/vo_ep09.mp3';
