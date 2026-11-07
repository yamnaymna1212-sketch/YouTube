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
export const HOOK_DUR = 32; // seconds (VO + 1.8 s tail into the Door One card)
