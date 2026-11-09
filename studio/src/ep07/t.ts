// EP07 word clock: local Kokoro VO (am_fenrir) → tools/dollarly_tts.py → cues.json (word times from Kokoro tokens).
// Paragraph indexes are 0-based on episodes/ep07-nuclear-24h/vo-clean.txt.
import cues from './cues.json';
type Para = { i: number; t: number; words: [string, number, number][] };
const P = (cues as unknown as { paras: Para[] }).paras;
export const EP_DUR = (cues as unknown as { dur: number }).dur;
const n = (w: string) => w.toLowerCase().replace(/[^a-z0-9$%']/g, '');
export const paraT = (i: number) => P[i].t;
export const paraEnd = (i: number) => P[i].words[P[i].words.length - 1][2];
/** start (s) of the nth word in paragraph i that contains `w` */
export const wordT = (i: number, w: string, nth = 0) => {
  const hits = P[i].words.filter(([x]) => n(x).includes(n(w)));
  if (!hits.length) throw new Error(`no word "${w}" in paragraph ${i}`);
  return hits[Math.min(nth, hits.length - 1)][1];
};
export const HOOK_DUR = paraT(3); // Part02 starts at "Hour zero. Sam's phone buzzes."
export const VO_FILE = 'ep07/vo/vo_ep07.mp3';
export const MUSIC = 'ep07/audio/music_ep07.mp3';
