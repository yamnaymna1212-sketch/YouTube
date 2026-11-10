// EP08 word clock: local Kokoro VO (am_fenrir, speed 0.95) → tools/dollarly_tts.py → cues.json.
import cues from './cues.json';
type Para = { i: number; t: number; words: [string, number, number][] };
const P = (cues as unknown as { paras: Para[] }).paras;
export const EP_DUR = (cues as unknown as { dur: number }).dur;
const n = (w: string) => w.toLowerCase().replace(/[^a-z0-9$%']/g, '');
export const paraT = (i: number) => P[i].t;
export const wordT = (i: number, w: string, nth = 0) => {
  const hits = P[i].words.filter(([x]) => n(x).includes(n(w)));
  if (!hits.length) throw new Error(`no word "${w}" in paragraph ${i}`);
  return hits[Math.min(nth, hits.length - 1)][1];
};
export const VO_FILE = 'ep08/vo/vo_ep08.mp3';
export const MUSIC = 'ep08/audio/music_ep08.mp3';
