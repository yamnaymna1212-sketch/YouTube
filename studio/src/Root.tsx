import React from 'react';
import { Composition, Still } from 'remotion';
import { HostTest } from './HostTest';
import { BoardCharacter, BoardIcons } from './boards/Boards';
import { StyleReel, REEL_FRAMES } from './StyleReel';
export const Root: React.FC = () => (
  <>
    <Composition id="StyleReel" component={StyleReel} durationInFrames={REEL_FRAMES} fps={30} width={1920} height={1080} />
    <Still id="BoardCharacter" component={BoardCharacter} width={1920} height={1080} />
    <Still id="BoardIcons" component={BoardIcons} width={1920} height={1080} />
    <Still id="HostTest" component={HostTest} width={1920} height={1080} />
  </>
);
