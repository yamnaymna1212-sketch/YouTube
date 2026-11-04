import { loadFont as serif } from '@remotion/google-fonts/InstrumentSerif';
import { loadFont as sans } from '@remotion/google-fonts/Inter';
import { loadFont as mono } from '@remotion/google-fonts/JetBrainsMono';

export const F = {
  serif: serif('normal', { weights: ['400'], subsets: ['latin'] }).fontFamily,
  sans: sans('normal', { weights: ['400', '500', '600', '700'], subsets: ['latin'] }).fontFamily,
  mono: mono('normal', { weights: ['400', '500'], subsets: ['latin'] }).fontFamily,
};

// Palette v3 — cinematic, low saturation. One accent (evidence red), amber only for money.
export const C = {
  ink: '#0C0D10',
  graphite: '#17191E',
  slate: '#2A2E36',
  steel: '#8B93A1',
  bone: '#ECE7DE',
  paper: '#F3EFE7',
  red: '#E5483B',
  amber: '#D9A441',
};

export const FPS = 30;
