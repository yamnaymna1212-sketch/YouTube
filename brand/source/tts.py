#!/usr/bin/env python3
"""Narration / dialogue lines -> mp3 + word timings (needed to sync captions and scenes).

Usage:  python3 tts.py <voice> <rate> <out.mp3> <out.words.json> "<text>"
Example: python3 tts.py en-US-AndrewNeural "+8%" audio/hook.mp3 audio/hook.words.json "At 5 AM, the door bangs."

Uses Microsoft Edge online voices through the `edge-tts` package (needs internet).
- Works behind the session proxy: trusts /root/.ccr/ca-bundle.crt and uses HTTPS_PROXY when present.
- Retries: the service sometimes returns "No audio was received"; trying again almost always works.
- words.json = [{"w": word, "s": start_seconds, "d": duration_seconds}, ...]
"""
import asyncio, json, os, ssl, sys, time
import edge_tts
import edge_tts.communicate as comm

CA = '/root/.ccr/ca-bundle.crt'
if os.path.exists(CA):
    comm._SSL_CTX = ssl.create_default_context(cafile=CA)


async def once(voice, rate, out, words, text):
    c = edge_tts.Communicate(text, voice, rate=rate, proxy=os.environ.get('HTTPS_PROXY'), boundary='WordBoundary')
    marks, got = [], False
    with open(out, 'wb') as f:
        async for ch in c.stream():
            if ch['type'] == 'audio':
                f.write(ch['data']); got = True
            elif ch['type'] == 'WordBoundary':
                marks.append({'w': ch['text'], 's': ch['offset'] / 1e7, 'd': ch['duration'] / 1e7})
    if not got:
        raise RuntimeError('no audio')
    json.dump(marks, open(words, 'w'), indent=1)


def main():
    voice, rate, out, words, text = sys.argv[1:6]
    for attempt in range(1, 7):
        try:
            asyncio.run(once(voice, rate, out, words, text))
            return
        except Exception as e:  # noqa: BLE001
            print(f'attempt {attempt} failed: {e}', file=sys.stderr)
            time.sleep(2)
    sys.exit('TTS failed after 6 attempts')


if __name__ == '__main__':
    main()
