import React from 'react';
import { Composition, Still } from 'remotion';
import { HostTest } from './HostTest';
import { BoardBody, BoardCharacter, BoardIcons, BoardMotion } from './boards/Boards';
import { BodyTest } from './BodyTest';
import { F0Jake, F1Hook, F2Gas, F3Video, F4Versus, F5Wage } from './boards/SayedFrames';
import { StyleReel, REEL_FRAMES } from './StyleReel';
export const Root: React.FC = () => (
  <>
    <Composition id="StyleReel" component={StyleReel} durationInFrames={REEL_FRAMES} fps={30} width={1920} height={1080} />
    <Still id="BoardCharacter" component={BoardCharacter} width={1920} height={1080} />
    <Still id="BoardIcons" component={BoardIcons} width={1920} height={1080} />
    <Still id="BoardBody" component={BoardBody} width={1920} height={1080} />
    <Still id="BoardMotion" component={BoardMotion} width={1920} height={1080} />
    <Still id="F0Jake" component={F0Jake} width={1920} height={1080} />
    <Still id="F1Hook" component={F1Hook} width={1920} height={1080} />
    <Still id="F2Gas" component={F2Gas} width={1920} height={1080} />
    <Still id="F3Video" component={F3Video} width={1920} height={1080} />
    <Still id="F4Versus" component={F4Versus} width={1920} height={1080} />
    <Still id="F5Wage" component={F5Wage} width={1920} height={1080} />
    <Still id="BodyTest" component={BodyTest} width={1920} height={1080} />
    <Still id="HostTest" component={HostTest} width={1920} height={1080} />
  </>
);
