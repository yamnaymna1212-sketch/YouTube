// Pause-tightened VO timing. tools/tighten_vo.py shortened every pause in vo_XX.mp3 to a natural
// breath and wrote a map of old → new speech segments. Cut lists stay written in ORIGINAL take frames
// (they were measured on the untouched audio) and go through `remap` so pictures stay on the words.
import m00 from '../../public/sayed/vo/tight/vo_00.json';
import m01 from '../../public/sayed/vo/tight/vo_01.json';
import m02 from '../../public/sayed/vo/tight/vo_02.json';
import m03 from '../../public/sayed/vo/tight/vo_03.json';
import m04 from '../../public/sayed/vo/tight/vo_04.json';
import m05 from '../../public/sayed/vo/tight/vo_05.json';
import m06 from '../../public/sayed/vo/tight/vo_06.json';
import m07 from '../../public/sayed/vo/tight/vo_07.json';

type VoMap = { dur: number; map: [number, number, number][] };
const MAPS: Record<string, VoMap> = { vo_00: m00 as VoMap, vo_01: m01 as VoMap, vo_02: m02 as VoMap, vo_03: m03 as VoMap, vo_04: m04 as VoMap, vo_05: m05 as VoMap, vo_06: m06 as VoMap, vo_07: m07 as VoMap };
const FPS = 30;

export const remap = (vo: string, frame: number): number => {
  const { map, dur } = MAPS[vo];
  const t = frame / FPS;
  let out: number;
  if (t <= map[0][0]) out = (t / Math.max(map[0][0], 1e-6)) * map[0][2];
  else {
    out = dur;
    for (let i = 0; i < map.length; i++) {
      const [a, b, n] = map[i];
      const nEnd = n + (b - a);
      if (t <= b) { out = n + (t - a); break; }
      const next = map[i + 1];
      if (!next) { out = Math.min(dur, nEnd + (t - b)); break; }
      if (t < next[0]) { out = nEnd + ((t - b) / (next[0] - b)) * (next[2] - nEnd); break; }
    }
  }
  return Math.round(out * FPS);
};
export const voFrames = (vo: string) => Math.round(MAPS[vo].dur * FPS);
