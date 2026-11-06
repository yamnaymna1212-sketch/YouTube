import cues from './cues.json';
// EP03 timing: every time is in seconds on the TIGHT voice take (studio/public/iran/vo/tight/vo_full.mp3).
// cues.json is produced by tools/ep03_cues.py from the script + word timings.
export const FPS = 30;
type Shot = { id: string; part: string; t: number; words: [string, number, number][] };
const shots = (cues as unknown as { shots: Shot[] }).shots;
export const VO_DUR = (cues as unknown as { dur: number }).dur;
export const shotT = (id: string) => { const s = shots.find((x) => x.id === id); if (!s) throw new Error('no shot ' + id); return s.t; };
/** start time (s) of the n-th word in shot `id` containing `w` (case-insensitive) */
export const wordT = (id: string, w: string, nth = 0) => {
  const s = shots.find((x) => x.id === id)!;
  const hits = s.words.filter(([x]) => x.toLowerCase().replace(/[^a-z0-9$%']/g, '').includes(w.toLowerCase()));
  if (!hits.length) throw new Error(`no word "${w}" in shot ${id}`);
  return hits[Math.min(nth, hits.length - 1)][1];
};
export const fr = (sec: number) => Math.round(sec * FPS);
export const partStart = (part: string) => shots.find((x) => x.part === part)!.t;
export const partEnd = (part: string) => { const i = shots.findIndex((x) => x.part > part); return i < 0 ? VO_DUR : shots[i].t; };
