// المدقّق — The Auditor (v2)
// Pose-driven SVG character. Same construction grid in every pose, so the
// character stays consistent across a long video. Port target: Remotion
// <Auditor pose={...}/> (each param below becomes an interpolated prop).
//
// Palette is fixed (brand): coat #15171c / #252a33, red band #d6453d,
// gold #e8b23a, ivory #ede6d6.

const C = {
  coatDark: '#15171c', coatLight: '#252a33', coatMid: '#1d2028',
  red: '#d6453d', gold: '#e8b23a', goldDeep: '#b8861f',
  ivory: '#ede6d6', lens: '#0f2a46', shoe: '#0b0c0f', sleeve: '#2f3440',
};

// Arm: shoulder at (0,0), points down at angle 0. a1 = shoulder rotation,
// a2 = elbow bend. `hand` = SVG drawn at the wrist (prop holder).
function arm(x, y, a1, a2, hand = '', mirror = false) {
  const s = mirror ? -1 : 1;
  return `
  <g transform="translate(${x} ${y}) rotate(${a1 * s})">
    <rect x="-18" y="-6" width="36" height="96" rx="18" fill="${mirror ? C.coatMid : C.sleeve}" stroke="${C.shoe}" stroke-width="4"/>
    <g transform="translate(0 84) rotate(${a2 * s})">
      <rect x="-16" y="-4" width="32" height="86" rx="16" fill="${mirror ? C.coatMid : C.sleeve}" stroke="${C.shoe}" stroke-width="4"/>
      <rect x="-16" y="66" width="32" height="10" rx="3" fill="${C.coatDark}" opacity=".9"/>
      <g transform="translate(0 90)">
        <circle r="16" fill="${C.ivory}" stroke="${C.shoe}" stroke-width="3"/>
        ${hand}
      </g>
    </g>
  </g>`;
}

const props = {
  none: '',
  point: `<path d="M-4 4 L-5 34 Q0 40 5 34 L5 4 Z" fill="${C.ivory}"/>`,
  ledger: `
    <g transform="translate(-6 -10) rotate(-8)">
      <rect x="-46" y="-6" width="92" height="118" rx="6" fill="${C.goldDeep}"/>
      <rect x="-42" y="-10" width="88" height="118" rx="6" fill="${C.gold}"/>
      <rect x="-42" y="-10" width="12" height="118" rx="4" fill="${C.goldDeep}" opacity=".55"/>
      <rect x="-20" y="18" width="52" height="5" rx="2.5" fill="${C.coatDark}" opacity=".55"/>
      <rect x="-20" y="30" width="38" height="5" rx="2.5" fill="${C.coatDark}" opacity=".35"/>
      <circle cx="6" cy="70" r="14" fill="none" stroke="${C.coatDark}" stroke-width="4" opacity=".5"/>
    </g>`,
  magnifier: `
    <g transform="rotate(-30)">
      <rect x="-5" y="0" width="10" height="44" rx="5" fill="${C.coatDark}"/>
      <circle cy="72" r="34" fill="rgba(237,230,214,.16)" stroke="${C.gold}" stroke-width="9"/>
      <path d="M-18 58 A22 22 0 0 1 2 46" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round" opacity=".8"/>
    </g>`,
  stamp: `
    <g transform="rotate(0)">
      <rect x="-12" y="-34" width="24" height="40" rx="10" fill="${C.red}"/>
      <rect x="-30" y="6" width="60" height="16" rx="3" fill="${C.coatDark}"/>
      <rect x="-34" y="22" width="68" height="8" rx="2" fill="${C.red}"/>
    </g>`,
  pen: `<g transform="rotate(20)"><rect x="-4" y="-6" width="8" height="58" rx="3" fill="${C.gold}"/><path d="M-4 52 L0 64 L4 52Z" fill="${C.coatDark}"/></g>`,
};

/**
 * pose: { lean, armL:[a1,a2,prop], armR:[a1,a2,prop], glint, eyes:'open'|'narrow', step }
 * Coordinates: viewBox 0 0 400 720, feet at y≈700.
 */
function auditor(pose = {}) {
  const p = Object.assign({ lean: 0, armL: [8, 6, 'none'], armR: [-8, -6, 'none'], glint: true, eyes: 'open', step: 0 }, pose);
  const lensH = p.eyes === 'narrow' ? 7 : 15;
  const st = p.step; // -1..1 walk phase
  return `
<g class="auditor">
  <!-- shadow -->
  <ellipse cx="200" cy="704" rx="120" ry="14" fill="#000" opacity=".28"/>
  <g transform="rotate(${p.lean} 200 700)">
    <!-- legs -->
    <g transform="rotate(${st * 10} 172 560)"><rect x="150" y="548" width="44" height="140" rx="10" fill="${C.coatDark}"/><rect x="138" y="676" width="64" height="24" rx="12" fill="${C.shoe}"/></g>
    <g transform="rotate(${-st * 10} 228 560)"><rect x="206" y="548" width="44" height="140" rx="10" fill="${C.coatMid}"/><rect x="200" y="676" width="64" height="24" rx="12" fill="${C.shoe}"/></g>

    <!-- back arm (right side of body, darker) -->
    ${arm(282, 262, p.armR[0], p.armR[1], props[p.armR[2]] || '', true)}

    <!-- coat: A-line trench, two-tone split = light from the left -->
    <path d="M128 250 Q200 226 272 250 L312 586 Q200 606 88 586 Z" fill="${C.coatDark}"/>
    <path d="M128 250 Q164 238 200 236 L200 600 Q140 598 88 586 Z" fill="${C.coatLight}"/>
    <path d="M128 250 L88 586" stroke="${C.ivory}" stroke-width="3" opacity=".22"/>
    <path d="M200 520 L212 600" stroke="${C.coatDark}" stroke-width="4"/>
    <!-- lapel / front seam -->
    <path d="M200 262 L214 600" stroke="${C.coatDark}" stroke-width="5" opacity=".7"/>
    <circle cx="222" cy="330" r="5" fill="${C.gold}"/><circle cx="224" cy="380" r="5" fill="${C.gold}"/>
    <!-- belt + buckle -->
    <path d="M100 430 Q200 446 300 430 L302 454 Q200 470 98 454 Z" fill="${C.coatMid}"/>
    <rect x="188" y="434" width="30" height="26" rx="4" fill="none" stroke="${C.gold}" stroke-width="5"/>
    <!-- pocket flap -->
    <path d="M118 500 L170 504 L168 516 L116 512 Z" fill="${C.coatDark}" opacity=".6"/>

    <!-- raised collar hides the face: two tall wedges -->
    <path d="M200 270 L120 258 L132 168 L196 196 Z" fill="${C.coatLight}"/>
    <path d="M200 270 L280 258 L268 168 L204 196 Z" fill="${C.coatMid}"/>
    <path d="M132 168 L196 196 L200 270" stroke="${C.coatDark}" stroke-width="3" fill="none" opacity=".6"/>
    <path d="M120 258 L132 168" stroke="${C.ivory}" stroke-width="3" opacity=".25"/>

    <!-- glasses peek between collar and brim -->
    <g transform="translate(200 182)">
      <rect x="-56" y="-24" width="112" height="40" fill="${C.coatDark}"/>
      <rect x="-44" y="${-lensH / 2 - 2}" width="34" height="${lensH}" rx="${lensH / 2}" fill="${C.lens}" stroke="${C.gold}" stroke-width="4"/>
      <rect x="10" y="${-lensH / 2 - 2}" width="34" height="${lensH}" rx="${lensH / 2}" fill="${C.lens}" stroke="${C.gold}" stroke-width="4"/>
      <rect x="-10" y="-4" width="20" height="4" fill="${C.gold}"/>
      <rect x="-44" y="${-lensH / 2 - 2}" width="88" height="${lensH}" fill="${C.gold}" opacity=".10" filter="blur(6px)"/>
      ${p.glint ? `<path d="M18 ${-lensH / 2 + 1} l12 0" stroke="#fff" stroke-width="3" stroke-linecap="round"/><circle cx="40" cy="-14" r="0" fill="#fff"><animate attributeName="r" values="0;5;0" dur="2.4s" repeatCount="indefinite"/></circle>` : ''}
    </g>

    <!-- fedora with red band -->
    <path d="M136 156 L148 84 Q200 62 252 84 L264 156 Z" fill="${C.coatDark}"/>
    <path d="M148 84 Q200 62 252 84 L246 100 Q200 82 154 100 Z" fill="${C.coatLight}" opacity=".7"/>
    <path d="M139 136 L261 136 L264 156 L136 156 Z" fill="${C.red}"/>
    <rect x="92" y="152" width="216" height="18" rx="9" fill="${C.coatDark}"/>
    <rect x="92" y="152" width="108" height="9" rx="4.5" fill="${C.coatLight}" opacity=".8"/>

    <!-- front arm -->
    ${arm(118, 262, p.armL[0], p.armL[1], props[p.armL[2]] || '')}
  </g>
</g>`;
}

const POSES = {
  idle:      { armL: [6, 4, 'none'], armR: [6, 4, 'none'] },
  holdLedger:{ armL: [-20, -95, 'ledger'], armR: [6, 4, 'none'] },
  point:     { armL: [92, -6, 'point'], armR: [6, 4, 'none'], lean: 3 },
  inspect:   { armL: [-10, -150, 'magnifier'], armR: [6, 4, 'none'], eyes: 'narrow', lean: -3 },
  stamp:     { armL: [40, -60, 'stamp'], armR: [-20, -95, 'ledger'], lean: 4 },
  write:     { armL: [-30, -100, 'pen'], armR: [-24, -96, 'ledger'], eyes: 'narrow' },
  walk:      { armL: [22, 10, 'none'], armR: [-18, -8, 'ledger'], step: 0.8 },
  shrug:     { armL: [55, -115, 'none'], armR: [55, -115, 'none'] },
  present:   { armL: [60, -70, 'none'], armR: [6, 4, 'none'], lean: 2 },
};

if (typeof module !== 'undefined') module.exports = { auditor, POSES, C };
