"""Search and download sound effects from Openverse (CC0 / Public Domain / CC BY only) with a licence ledger.

usage:
  python3 sfx_fetch.py search "air raid siren" [--license cc0,pdm,by] [--n 10]
  python3 sfx_fetch.py get <openverse_id> <out_name> [--dir studio/public/iran/sfx]
Every download is appended to <dir>/SFX_LICENSES.md (title, creator, licence, source URL).
Openverse indexes Freesound, Wikimedia, Jamendo and others; no API key needed (rate limited).
"""
import json, os, sys, urllib.parse, urllib.request
API = 'https://api.openverse.org/v1/audio/'
UA = {'User-Agent': 'DollarlyStudio/1.0 (sound effects research)'}

def call(url):
    with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=60) as r:
        return json.load(r)

def search(q, lic='cc0,pdm,by', n=10):
    d = call(API + '?' + urllib.parse.urlencode({'q': q, 'license': lic, 'page_size': n}))
    for r in d.get('results', []):
        print(f"{r['id']} | {r['title'][:55]} | {r['license']} | {round((r.get('duration') or 0)/1000,1)}s | {r['source']} | {r.get('creator')}")

def get(oid, name, out_dir):
    r = call(API + oid + '/')
    os.makedirs(out_dir, exist_ok=True)
    ext = os.path.splitext(urllib.parse.urlparse(r['url']).path)[1] or '.mp3'
    path = os.path.join(out_dir, name + ext)
    with urllib.request.urlopen(urllib.request.Request(r['url'], headers=UA), timeout=120) as resp, open(path, 'wb') as f:
        f.write(resp.read())
    led = os.path.join(out_dir, 'SFX_LICENSES.md')
    new = not os.path.exists(led)
    with open(led, 'a') as f:
        if new: f.write('# Sound effects — licences (fetched via Openverse)\n\n| File | Title | Creator | Licence | Source page |\n|---|---|---|---|---|\n')
        lic = (r['license'] + ' ' + (r.get('license_version') or '')).strip().upper()
        f.write(f"| {os.path.basename(path)} | {r['title']} | {r.get('creator')} | {lic} | {r.get('foreign_landing_url')} |\n")
    print('saved', path, '|', r['license'], '|', r.get('foreign_landing_url'))

if __name__ == '__main__':
    a = sys.argv[1:]
    opt = lambda k, d: a[a.index(k) + 1] if k in a else d
    if a[0] == 'search': search(a[1], opt('--license', 'cc0,pdm,by'), int(opt('--n', 10)))
    elif a[0] == 'get': get(a[1], a[2], opt('--dir', 'studio/public/iran/sfx'))
