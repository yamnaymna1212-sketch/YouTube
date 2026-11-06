import React from 'react';
import { Composition, Still } from 'remotion';
import { PaperBoardStage, PaperBoardStrait } from './ep03/PaperWorld';
import { EP03Part01, EP03_P1_FRAMES } from './ep03/Part01';
import { SF1Siren, SF2Sky, SF3Bunker, SF4Rings, SF5Proof, SF4MapTV, SF6Ring0, SFTransition } from './ep03/StyleFrames';
import { HostTest } from './HostTest';
import { BoardBody, BoardCharacter, BoardIcons, BoardMotion } from './boards/Boards';
import { BodyTest } from './BodyTest';
import { F0Jake, F1Hook, F2Gas, F3Video, F4Versus, F5Wage } from './boards/SayedFrames';
import { StyleReel, REEL_FRAMES } from './StyleReel';
import { Hook, HOOK_FRAMES } from './ep02/Hook';
import { ColdOpen, COLD_FRAMES, WhoIsHe, WHO_FRAMES, partFrames } from './ep02/Part1';
import { FileGas } from './ep02/FileGas';
import { FileHealth } from './ep02/FileHealth';
import { FilePay } from './ep02/FilePay';
import { FileWhoPays } from './ep02/FileWho';
import { Close, CLOSE_EXTRA } from './ep02/Close';
import { ChannelAvatar, ChannelBanner, ChannelCard, EP02Thumb, EP02Thumb2, EP02Thumb2B, EP02Thumb3, LogoAvatar, LogoMarkClear, LogoSheet } from './ep02/Brand';
import { W1Street, W2Gas, W3Map, W4Footage, W5Money, W6Collage } from './boards/WorldFrames';
export const Root: React.FC = () => (
  <>
    <Composition id="EP02Hook" component={Hook} durationInFrames={HOOK_FRAMES} fps={30} width={1920} height={1080} />
    <Composition id="EP02ColdOpen" component={ColdOpen} durationInFrames={COLD_FRAMES} fps={30} width={1920} height={1080} />
    <Composition id="EP02WhoIsHe" component={WhoIsHe} durationInFrames={WHO_FRAMES} fps={30} width={1920} height={1080} />
    <Composition id="EP02FileGas" component={FileGas} durationInFrames={partFrames('vo_03')} fps={30} width={1920} height={1080} />
    <Composition id="EP02FileHealth" component={FileHealth} durationInFrames={partFrames('vo_04')} fps={30} width={1920} height={1080} />
    <Composition id="EP02FilePay" component={FilePay} durationInFrames={partFrames('vo_05')} fps={30} width={1920} height={1080} />
    <Composition id="EP02FileWhoPays" component={FileWhoPays} durationInFrames={partFrames('vo_06')} fps={30} width={1920} height={1080} />
    <Composition id="EP02Close" component={Close} durationInFrames={partFrames('vo_07') + CLOSE_EXTRA} fps={30} width={1920} height={1080} />
    <Still id="ChannelAvatar" component={ChannelAvatar} width={800} height={800} />
    <Still id="ChannelBanner" component={ChannelBanner} width={2560} height={1440} />
    <Still id="ChannelCard" component={ChannelCard} width={2560} height={1440} />
    <Still id="LogoAvatar" component={LogoAvatar} width={800} height={800} />
    <Still id="LogoMarkClear" component={LogoMarkClear} width={1024} height={1024} />
    <Still id="LogoSheet" component={LogoSheet} width={1920} height={1080} />
    <Still id="EP02Thumb2" component={EP02Thumb2} width={1280} height={720} />
    <Still id="EP02Thumb2B" component={EP02Thumb2B} width={1280} height={720} />
    <Still id="EP02Thumb3" component={EP02Thumb3} width={1280} height={720} />
    <Still id="EP02Thumb" component={EP02Thumb} width={1280} height={720} />
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
    <Composition id="PaperBoardStage" component={PaperBoardStage} durationInFrames={150} fps={30} width={1920} height={1080} />
    <Composition id="PaperBoardStrait" component={PaperBoardStrait} durationInFrames={150} fps={30} width={1920} height={1080} />
    <Composition id="SF1Siren" component={SF1Siren} durationInFrames={150} fps={30} width={1920} height={1080} />
    <Composition id="SF2Sky" component={SF2Sky} durationInFrames={150} fps={30} width={1920} height={1080} />
    <Composition id="SF3Bunker" component={SF3Bunker} durationInFrames={150} fps={30} width={1920} height={1080} />
    <Composition id="SF4Rings" component={SF4Rings} durationInFrames={150} fps={30} width={1920} height={1080} />
    <Composition id="EP03Part01" component={EP03Part01} durationInFrames={EP03_P1_FRAMES} fps={30} width={1920} height={1080} />
    <Composition id="SF4MapTV" component={SF4MapTV} durationInFrames={150} fps={30} width={1920} height={1080} />
    <Composition id="SF6Ring0" component={SF6Ring0} durationInFrames={150} fps={30} width={1920} height={1080} />
    <Composition id="SFTransition" component={SFTransition} durationInFrames={60} fps={30} width={1920} height={1080} />
    <Composition id="SF5Proof" component={SF5Proof} durationInFrames={150} fps={30} width={1920} height={1080} />
    <Still id="BodyTest" component={BodyTest} width={1920} height={1080} />
    <Still id="W1Street" component={W1Street} width={1920} height={1080} />
    <Still id="W2Gas" component={W2Gas} width={1920} height={1080} />
    <Still id="W3Map" component={W3Map} width={1920} height={1080} />
    <Still id="W4Footage" component={W4Footage} width={1920} height={1080} />
    <Still id="W5Money" component={W5Money} width={1920} height={1080} />
    <Still id="W6Collage" component={W6Collage} width={1920} height={1080} />
    <Still id="HostTest" component={HostTest} width={1920} height={1080} />
  </>
);
