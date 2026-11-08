// EP06 word clock: real ElevenLabs VO (Mark, user's own account) → faster-whisper words → tools/episode_cues.py → cues.json.
// Paragraph indexes are 0-based on public/ep06/vo/vo-as-spoken.txt (= vo-clean.txt without the disclaimer, which is on screen only).
import cues from './cues.json';
type Para = { i: number; t: number; words: [string, number, number][] };
const P = (cues as unknown as { paras: Para[] }).paras;
export const EP_DUR = (cues as unknown as { dur: number }).dur;
const n = (w: string) => w.toLowerCase().replace(/[^a-z0-9$%']/g, '');
/** start (s) of paragraph i */
export const paraT = (i: number) => P[i].t;
/** end (s) of paragraph i (last word end) */
export const paraEnd = (i: number) => P[i].words[P[i].words.length - 1][2];
/** start (s) of the nth word in paragraph i that contains `w` */
export const wordT = (i: number, w: string, nth = 0) => {
  const hits = P[i].words.filter(([x]) => n(x).includes(n(w)));
  if (!hits.length) throw new Error(`no word "${w}" in paragraph ${i}`);
  return hits[Math.min(nth, hits.length - 1)][1];
};
export const HOOK_DUR = paraT(4); // Part02 starts at "Let's start with what forty trillion means."
export const VO_FILE = 'ep06/vo/vo_ep06.mp3';
export const MUSIC = 'ep06/audio/music_ep06.mp3';
/** U.S. net interest per second, FY2026 (MTS: $1,051.75B ÷ 31,536,000 s) [R4] */
export const PER_SEC = 33350;
