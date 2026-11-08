import React from 'react';
import { Composition, Still } from 'remotion';
import { PaperBoardStage, PaperBoardStrait } from './ep03/PaperWorld';
import { EP03Part01, EP03_P1_FRAMES } from './ep03/Part01';
import { EP03Part02, EP03_P2_FRAMES } from './ep03/Part02';
import { EP03Part03, EP03_P3_FRAMES } from './ep03/Part03';
import { EP03Part04, EP03_P4_FRAMES } from './ep03/Part04';
import { EP03Part05, EP03_P5_FRAMES } from './ep03/Part05';
import { EP03Part06, EP03_P6_FRAMES } from './ep03/Part06';
import { EP03Part07, EP03_P7_FRAMES } from './ep03/Part07';
import { EP03Part08, EP03_P8_FRAMES } from './ep03/Part08';
import { EP03Part09, EP03_P9_FRAMES } from './ep03/Part09';
import { EP03Part10, EP03_P10_FRAMES } from './ep03/Part10';
import { SF1Siren, SF2Sky, SF3Bunker, SF4Rings, SF5Proof, SF4MapTV, SF6Ring0, SFTransition } from './ep03/StyleFrames';
import { HostTest } from './HostTest';
import { EP04Hook, EP04_HOOK_FRAMES } from './ep04/Hook';
import { EP04Part02, EP04_P2_FRAMES } from './ep04/Part02';
import { EP04Part03, EP04_P3_FRAMES } from './ep04/Part03';
import { EP04Part04, EP04_P4_FRAMES } from './ep04/Part04';
import { EP04Part05, EP04_P5_FRAMES } from './ep04/Part05';
import { EP04Part06, EP04_P6_FRAMES } from './ep04/Part06';
import { EP04Part07, EP04_P7_FRAMES } from './ep04/Part07';
import { EP04Part08, EP04_P8_FRAMES } from './ep04/Part08';
import { EP04Part09, EP04_P9_FRAMES } from './ep04/Part09';
import { EP05Hook, EP05_HOOK_FRAMES } from './ep05/Hook';
import { EP06Hook, EP06_HOOK_FRAMES } from './ep06/Hook';
import { EP06Part02, EP06_P2_FRAMES, EP06Part03, EP06_P3_FRAMES } from './ep06/P02';
import { EP06Part04, EP06_P4_FRAMES, EP06Part05, EP06_P5_FRAMES } from './ep06/P04';
import { EP06Part06, EP06_P6_FRAMES, EP06Part07, EP06_P7_FRAMES, EP06Part08, EP06_P8_FRAMES } from './ep06/P06';
import { EP06Part09, EP06_P9_FRAMES, EP06Part10, EP06_P10_FRAMES } from './ep06/P09';
import { EP05Part02, EP05_P2_FRAMES } from './ep05/Part02';
import { EP05Part03, EP05_P3_FRAMES } from './ep05/Part03';
import { EP05Part04, EP05_P4_FRAMES } from './ep05/Part04';
import { EP05Part05, EP05_P5_FRAMES } from './ep05/Part05';
import { EP05Part06, EP05_P6_FRAMES } from './ep05/Part06';
import { EP05Part07, EP05_P7_FRAMES } from './ep05/Part07';
import { EP05Part08, EP05_P8_FRAMES } from './ep05/Part08';
import { EP05Part09, EP05_P9_FRAMES } from './ep05/Part09';
import { EP05Part10, EP05_P10_FRAMES } from './ep05/Part10';
import { EP04Thumb, EP04ThumbB, EP03ThumbV2, EP05Thumb, EP05ThumbB, EP05ThumbSimple } from './brand/Thumb';
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
    <Still id="EP05Thumb" component={EP05Thumb} width={1280} height={720} />
    <Still id="EP05ThumbB" component={EP05ThumbB} width={1280} height={720} />
    <Still id="EP05ThumbSimple" component={EP05ThumbSimple} width={1280} height={720} />
    <Still id="EP04Thumb" component={EP04Thumb} width={1280} height={720} />
    <Still id="EP04ThumbB" component={EP04ThumbB} width={1280} height={720} />
    <Still id="EP03ThumbV2" component={EP03ThumbV2} width={1280} height={720} />
    <Composition id="EP04Part08" component={EP04Part08} durationInFrames={EP04_P8_FRAMES} fps={30} width={1920} height={1080} />
    <Composition id="EP04Part09" component={EP04Part09} durationInFrames={EP04_P9_FRAMES} fps={30} width={1920} height={1080} />
    <Composition id="EP04Part07" component={EP04Part07} durationInFrames={EP04_P7_FRAMES} fps={30} width={1920} height={1080} />
    <Composition id="EP04Part06" component={EP04Part06} durationInFrames={EP04_P6_FRAMES} fps={30} width={1920} height={1080} />
    <Composition id="EP04Part05" component={EP04Part05} durationInFrames={EP04_P5_FRAMES} fps={30} width={1920} height={1080} />
    <Composition id="EP04Part04" component={EP04Part04} durationInFrames={EP04_P4_FRAMES} fps={30} width={1920} height={1080} />
    <Composition id="EP04Part03" component={EP04Part03} durationInFrames={EP04_P3_FRAMES} fps={30} width={1920} height={1080} />
    <Composition id="EP04Part02" component={EP04Part02} durationInFrames={EP04_P2_FRAMES} fps={30} width={1920} height={1080} />
    <Composition id="EP06Part02" component={EP06Part02} durationInFrames={EP06_P2_FRAMES} fps={30} width={1920} height={1080} />
    <Composition id="EP06Part03" component={EP06Part03} durationInFrames={EP06_P3_FRAMES} fps={30} width={1920} height={1080} />
    <Composition id="EP06Part04" component={EP06Part04} durationInFrames={EP06_P4_FRAMES} fps={30} width={1920} height={1080} />
    <Composition id="EP06Part05" component={EP06Part05} durationInFrames={EP06_P5_FRAMES} fps={30} width={1920} height={1080} />
    <Composition id="EP06Part06" component={EP06Part06} durationInFrames={EP06_P6_FRAMES} fps={30} width={1920} height={1080} />
    <Composition id="EP06Part07" component={EP06Part07} durationInFrames={EP06_P7_FRAMES} fps={30} width={1920} height={1080} />
    <Composition id="EP06Part08" component={EP06Part08} durationInFrames={EP06_P8_FRAMES} fps={30} width={1920} height={1080} />
    <Composition id="EP06Part09" component={EP06Part09} durationInFrames={EP06_P9_FRAMES} fps={30} width={1920} height={1080} />
    <Composition id="EP06Part10" component={EP06Part10} durationInFrames={EP06_P10_FRAMES} fps={30} width={1920} height={1080} />
    <Composition id="EP06Hook" component={EP06Hook} durationInFrames={EP06_HOOK_FRAMES} fps={30} width={1920} height={1080} />
    <Composition id="EP05Part02" component={EP05Part02} durationInFrames={EP05_P2_FRAMES} fps={30} width={1920} height={1080} />
    <Composition id="EP05Part03" component={EP05Part03} durationInFrames={EP05_P3_FRAMES} fps={30} width={1920} height={1080} />
    <Composition id="EP05Part04" component={EP05Part04} durationInFrames={EP05_P4_FRAMES} fps={30} width={1920} height={1080} />
    <Composition id="EP05Part05" component={EP05Part05} durationInFrames={EP05_P5_FRAMES} fps={30} width={1920} height={1080} />
    <Composition id="EP05Part06" component={EP05Part06} durationInFrames={EP05_P6_FRAMES} fps={30} width={1920} height={1080} />
    <Composition id="EP05Part07" component={EP05Part07} durationInFrames={EP05_P7_FRAMES} fps={30} width={1920} height={1080} />
    <Composition id="EP05Part08" component={EP05Part08} durationInFrames={EP05_P8_FRAMES} fps={30} width={1920} height={1080} />
    <Composition id="EP05Part09" component={EP05Part09} durationInFrames={EP05_P9_FRAMES} fps={30} width={1920} height={1080} />
    <Composition id="EP05Part10" component={EP05Part10} durationInFrames={EP05_P10_FRAMES} fps={30} width={1920} height={1080} />
    <Composition id="EP05Hook" component={EP05Hook} durationInFrames={EP05_HOOK_FRAMES} fps={30} width={1920} height={1080} />
    <Composition id="EP04Hook" component={EP04Hook} durationInFrames={EP04_HOOK_FRAMES} fps={30} width={1920} height={1080} />
    <Composition id="EP03Part01" component={EP03Part01} durationInFrames={EP03_P1_FRAMES} fps={30} width={1920} height={1080} />
    <Composition id="EP03Part02" component={EP03Part02} durationInFrames={EP03_P2_FRAMES} fps={30} width={1920} height={1080} />
    <Composition id="EP03Part03" component={EP03Part03} durationInFrames={EP03_P3_FRAMES} fps={30} width={1920} height={1080} />
    <Composition id="EP03Part04" component={EP03Part04} durationInFrames={EP03_P4_FRAMES} fps={30} width={1920} height={1080} />
    <Composition id="EP03Part05" component={EP03Part05} durationInFrames={EP03_P5_FRAMES} fps={30} width={1920} height={1080} />
    <Composition id="EP03Part06" component={EP03Part06} durationInFrames={EP03_P6_FRAMES} fps={30} width={1920} height={1080} />
    <Composition id="EP03Part07" component={EP03Part07} durationInFrames={EP03_P7_FRAMES} fps={30} width={1920} height={1080} />
    <Composition id="EP03Part08" component={EP03Part08} durationInFrames={EP03_P8_FRAMES} fps={30} width={1920} height={1080} />
    <Composition id="EP03Part09" component={EP03Part09} durationInFrames={EP03_P9_FRAMES} fps={30} width={1920} height={1080} />
    <Composition id="EP03Part10" component={EP03Part10} durationInFrames={EP03_P10_FRAMES} fps={30} width={1920} height={1080} />
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
