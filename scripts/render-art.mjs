/**
 * Dirección de arte generada por código: ilustraciones originales de la marca.
 * NO son fotografías ni representan una unidad del stock.
 * Uso: node scripts/render-art.mjs   (requiere Chrome y ffmpeg en el sistema)
 */
import { execFileSync } from 'node:child_process'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'

const CHROME = process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const OUT = resolve('public/images')

const wheel = (cx, cy) => {
  const spokes = Array.from({ length: 5 }, (_, i) => {
    const a = (i * 72 - 90) * (Math.PI / 180)
    const p = (r, t) => `${(cx + Math.cos(t) * r).toFixed(1)} ${(cy + Math.sin(t) * r).toFixed(1)}`
    return `<path d="M${p(24, a - 0.3)} L${p(92, a - 0.09)} L${p(92, a + 0.09)} L${p(24, a + 0.3)} Z" fill="url(#metal)" stroke="#3985FF" stroke-opacity=".5" stroke-width="1"/>`
  }).join('')
  return `
  <circle cx="${cx}" cy="${cy}" r="118" fill="none" stroke="#05070b" stroke-width="30"/>
  <circle cx="${cx}" cy="${cy}" r="133" fill="none" stroke="url(#rimTop)" stroke-width="2.5"/>
  <circle cx="${cx}" cy="${cy}" r="103" fill="none" stroke="#1769E8" stroke-opacity=".75" stroke-width="3"/>
  <circle cx="${cx}" cy="${cy}" r="98" fill="#070a10"/>
  <circle cx="${cx}" cy="${cy}" r="66" fill="none" stroke="#4d5a70" stroke-width="9" stroke-dasharray="3 7"/>
  ${spokes}
  <circle cx="${cx}" cy="${cy}" r="26" fill="#10161f" stroke="#3985FF" stroke-opacity=".8" stroke-width="2"/>
  <circle cx="${cx}" cy="${cy}" r="9" fill="#3985FF"/>`
}

const fins = Array.from({ length: 8 }, (_, i) => `<path d="M${548 + i * 20} 432 L${536 + i * 20} 500"/>`).join('')
const contour =
  'M112 262 L190 262 Q 300 300 372 330 Q 430 352 482 346 Q 520 268 620 252 Q 700 240 770 268 L 836 232 L 880 148 L 930 186 Q 1000 250 1056 330'

const motoSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1240 760" width="100%" height="100%">
  <defs>
    <linearGradient id="body" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#2b6fe0"/><stop offset=".3" stop-color="#123f95"/><stop offset=".62" stop-color="#0a1c44"/><stop offset="1" stop-color="#060a14"/>
    </linearGradient>
    <linearGradient id="bodyDark" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#161d2a"/><stop offset="1" stop-color="#06080d"/>
    </linearGradient>
    <linearGradient id="metal" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#5b6880"/><stop offset=".5" stop-color="#1c2331"/><stop offset="1" stop-color="#0a0e15"/>
    </linearGradient>
    <linearGradient id="rimTop" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#9cc3ff"/><stop offset=".45" stop-color="#3985FF" stop-opacity=".5"/><stop offset="1" stop-color="#3985FF" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#bcd6ff" stop-opacity=".75"/><stop offset="1" stop-color="#143a82" stop-opacity=".25"/>
    </linearGradient>
    <linearGradient id="pipe" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#d7e2f5"/><stop offset=".35" stop-color="#5d6b84"/><stop offset="1" stop-color="#0e131c"/>
    </linearGradient>
    <filter id="glow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="7"/></filter>
  </defs>

  ${wheel(270, 590)}
  <path d="M262 578 L540 512 L566 546 L276 606 Z" fill="url(#metal)" stroke="#3985FF" stroke-opacity=".45"/>
  <path d="M300 560 L500 513" stroke="#9cc3ff" stroke-opacity=".5" stroke-width="2"/>

  <path d="M836 300 L978 590" stroke="#0a0e15" stroke-width="30" stroke-linecap="round"/>
  <path d="M836 300 L978 590" stroke="url(#pipe)" stroke-width="20" stroke-linecap="round"/>
  ${wheel(978, 590)}
  <path d="M880 470 Q 960 452 1062 512 L1046 530 Q 960 480 890 494 Z" fill="url(#bodyDark)" stroke="#3985FF" stroke-opacity=".7"/>

  <path d="M500 420 L730 420 L764 480 L742 590 L590 610 L520 560 Z" fill="#0b0f16" stroke="#28344a"/>
  <g stroke="#3a475e" stroke-width="3">${fins}</g>
  <circle cx="630" cy="545" r="52" fill="url(#metal)" stroke="#3985FF" stroke-opacity=".6" stroke-width="2"/>
  <circle cx="630" cy="545" r="24" fill="#0a0e15" stroke="#7fb0ff" stroke-opacity=".6"/>
  <path d="M700 500 h46 v44 h-46 z" fill="#111722" stroke="#2c3a52"/>

  <path d="M742 588 Q 640 648 500 622 L 420 600" fill="none" stroke="url(#pipe)" stroke-width="20" stroke-linecap="round"/>
  <path d="M452 566 L242 468 L212 506 L410 622 Z" fill="url(#pipe)" stroke="#9cc3ff" stroke-opacity=".5"/>
  <path d="M242 468 L212 506 L226 516 L256 476 Z" fill="#05070b" stroke="#3985FF"/>

  <path d="M500 420 L150 262 L108 268 L300 372 L470 470 Z" fill="url(#bodyDark)" stroke="#223049"/>

  <path d="M112 262 L190 262 Q 300 300 372 330 Q 430 352 482 346 Q 520 268 620 252 Q 700 240 770 268 L 836 232 L 880 148 L 930 186 Q 1000 250 1056 330 Q 1072 356 1040 372 L 952 392 Q 900 400 886 450 L 846 540 Q 760 566 716 524 L 700 470 L 610 416 L 500 420 L 376 384 Z" fill="url(#body)"/>
  <path d="M482 346 Q 520 268 620 252 Q 700 240 770 268 L 748 356 Q 640 392 540 372 Z" fill="#0d2a66" opacity=".55"/>
  <path d="M770 268 L 836 232 L 846 330 L 760 400 Z" fill="#071226" opacity=".85"/>
  <path d="M846 330 L 952 392 Q 900 400 886 450 L 846 540 Q 790 556 748 540 L 760 400 Z" fill="#0a1a3a"/>
  <path d="M780 420 L 868 408 L 842 500 L 780 516 Z" fill="#04060b" stroke="#3985FF" stroke-opacity=".5"/>
  <g stroke="#3985FF" stroke-opacity=".55" stroke-width="3"><path d="M792 440 L 852 430"/><path d="M790 460 L 846 451"/><path d="M788 480 L 840 472"/></g>
  <path d="M560 410 L 700 300 L 742 300 L 610 416 Z" fill="#fff" opacity=".9"/>
  <path d="M630 416 L 754 310 L 772 312 L 650 420 Z" fill="#3985FF"/>

  <path d="M196 262 Q 300 296 372 326 Q 430 348 482 342 L 500 372 Q 420 386 340 356 Q 260 324 190 284 Z" fill="#0a0d13" stroke="#2a3346"/>

  <path d="M836 232 L 880 148 L 930 186 L 880 240 Z" fill="url(#glass)" stroke="#bcd6ff" stroke-opacity=".7"/>
  <path d="M968 296 L 1046 340 Q 1052 356 1030 360 L 960 342 Z" fill="#dff0ff"/>
  <path d="M968 296 L 1046 340 Q 1052 356 1030 360 L 960 342 Z" fill="#7fb6ff" filter="url(#glow)"/>
  <path d="M810 244 L 760 214 L 716 222" stroke="#0a0e15" stroke-width="13" stroke-linecap="round" fill="none"/>
  <path d="M810 244 L 760 214 L 716 222" stroke="#50607a" stroke-width="4" stroke-linecap="round" fill="none"/>
  <path d="M918 182 L 944 150 L 976 152 L 972 172 L 936 178 Z" fill="#0a0e15" stroke="#3985FF" stroke-opacity=".8"/>
  <path d="M108 268 L 150 262 L 142 282 L 112 280 Z" fill="#e8f1ff"/>
  <path d="M108 268 L 150 262 L 142 282 L 112 280 Z" fill="#3985FF" filter="url(#glow)"/>

</svg>`

const rimLight = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1240 760" width="100%" height="100%">
  <defs><filter id="rimGlow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="8"/></filter></defs>
  <path d="${contour}" fill="none" stroke="#3985FF" stroke-width="14" filter="url(#rimGlow)" opacity=".9"/>
  <path d="${contour}" fill="none" stroke="#e6f0ff" stroke-width="2.6"/>
  <path d="M968 296 L 1046 340 Q 1052 356 1030 360 L 960 342 Z" fill="#eaf4ff"/>
  <path d="M968 296 L 1046 340 Q 1052 356 1030 360 L 960 342 Z" fill="#7fb6ff" filter="url(#rimGlow)"/>
  <path d="M108 268 L 150 262 L 142 282 L 112 280 Z" fill="#3985FF" filter="url(#rimGlow)"/>
  <path d="M137 ${133 * 0 + 590} A 133 133 0 0 1 403 590" transform="rotate(14 270 590)" fill="none" stroke="#9cc3ff" stroke-width="2.4" opacity=".8"/>
  <path d="M845 590 A 133 133 0 0 1 1111 590" transform="rotate(14 978 590)" fill="none" stroke="#9cc3ff" stroke-width="2.4" opacity=".8"/>
</svg>`

const grain = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)'/%3E%3C/svg%3E")`

const scene = ({ w, h, moto, floor, title = '', extraCss = '' }) => {
  const motoH = (moto.w * 760) / 1240
  // El piso de la ilustración cae en y=723 de su viewBox.
  const ground = moto.y + (moto.w * 723) / 1240
  return `<!doctype html><html><head><meta charset="utf-8"><style>
*{margin:0;box-sizing:border-box}html,body{width:${w}px;height:${h}px;overflow:hidden;background:#05070b}
.s{position:relative;width:${w}px;height:${h}px;overflow:hidden;background:radial-gradient(60% 55% at ${moto.glowX ?? '62%'} 34%,#10306f 0,#0a1a3e 34%,#070b14 66%,#05070b 100%)}
.wall{position:absolute;inset:0;background:repeating-linear-gradient(100deg,transparent 0 ${w / 9}px,rgba(255,255,255,.012) ${w / 9}px ${w / 9 + 2}px)}
.beam{position:absolute;left:${moto.beamX ?? '38%'};top:-12%;width:${w * 0.34}px;height:${h * 1.05}px;transform:skewX(-20deg);background:linear-gradient(180deg,rgba(57,133,255,.30),rgba(57,133,255,0) 78%);filter:blur(36px)}
.beam.b{left:${moto.beam2X ?? '66%'};width:${w * 0.1}px;background:linear-gradient(180deg,rgba(190,220,255,.26),rgba(57,133,255,0) 70%);filter:blur(22px)}
.floor{position:absolute;left:0;right:0;top:${floor}px;bottom:0;background:linear-gradient(180deg,#0b1a3a 0,#070c17 26%,#05070b 72%)}
.line{position:absolute;left:0;right:0;top:${floor}px;height:2px;background:linear-gradient(90deg,transparent,#3985FF 45%,#cfe2ff 62%,#3985FF 78%,transparent);opacity:.55;filter:blur(1px)}
.m,.c{position:absolute;left:${moto.x}px;top:${moto.y}px;width:${moto.w}px;height:${motoH}px}
.m{filter:brightness(.5) contrast(1.28) saturate(1.15)}
.r{position:absolute;left:${moto.x}px;top:${2 * ground - moto.y - motoH}px;width:${moto.w}px;height:${motoH}px;transform:scaleY(-1);opacity:.5;filter:blur(6px);-webkit-mask-image:linear-gradient(0deg,transparent 30%,#000 100%)}
.pool{position:absolute;left:${moto.x + moto.w * 0.04}px;top:${ground - moto.w * 0.03}px;width:${moto.w * 0.94}px;height:${moto.w * 0.07}px;border-radius:50%;background:rgba(0,0,0,.75);filter:blur(16px)}
.streak{position:absolute;height:2px;background:linear-gradient(90deg,transparent,#3985FF,transparent);filter:blur(.6px)}
.grain{position:absolute;inset:0;opacity:.09;mix-blend-mode:overlay;background-image:${grain}}
.v{position:absolute;inset:0;background:radial-gradient(90% 90% at 55% 45%,transparent 52%,rgba(0,0,0,.72) 100%)}
${extraCss}
</style></head><body><div class="s"><div class="wall"></div><div class="beam"></div><div class="beam b"></div><div class="floor"></div><div class="line"></div>
<div class="streak" style="left:4%;top:${floor + h * 0.03}px;width:30%;opacity:.5"></div><div class="streak" style="left:58%;top:${floor + h * 0.07}px;width:38%;opacity:.35"></div>
<div class="pool"></div><div class="r">${motoSvg.replace(/id="/g, 'id="r').replace(/url\(#/g, 'url(#r')}</div><div class="m">${motoSvg}</div><div class="c">${rimLight}</div><div class="v"></div><div class="grain"></div>${title}</div></body></html>`
}

const ogCss = `.t{position:absolute;left:64px;top:96px;color:#fff;font:800 66px/1.04 'Segoe UI',sans-serif;letter-spacing:-1.5px}.t b{color:#3985FF}.u{position:absolute;left:66px;top:352px;color:#c9d3e3;font:600 22px 'Segoe UI',sans-serif;letter-spacing:5px}`

const shots = [
  { name: 'hero-desktop', w: 2400, h: 1350, html: scene({ w: 2400, h: 1350, floor: 1060, moto: { x: 1090, y: 330, w: 1280 } }) },
  { name: 'hero-mobile', w: 1080, h: 1920, html: scene({ w: 1080, h: 1920, floor: 1475, moto: { x: 118, y: 1000, w: 844, glowX: '50%', beamX: '18%', beam2X: '60%' } }) },
  {
    name: 'og',
    w: 1200,
    h: 630,
    jpg: true,
    html: scene({
      w: 1200,
      h: 630,
      floor: 520,
      moto: { x: 540, y: 190, w: 630 },
      extraCss: ogCss,
      title: '<div class="t">TU MOTO.<br/>TU LIBERTAD.<br/><b>TU MOTO YA</b></div><div class="u">EMPEZÁ CON TU DNI</div>',
    }),
  },
]

const only = process.argv[2]
const dir = mkdtempSync(join(tmpdir(), 'art-'))
mkdirSync(OUT, { recursive: true })
for (const shot of shots.filter((s) => !only || s.name === only)) {
  const html = join(dir, `${shot.name}.html`)
  const png = join(dir, `${shot.name}.png`)
  writeFileSync(html, shot.html)
  execFileSync(
    CHROME,
    ['--headless=new', '--disable-gpu', '--hide-scrollbars', `--window-size=${shot.w},${shot.h}`, '--force-device-scale-factor=1', `--screenshot=${png}`, `file:///${html.replace(/\\/g, '/')}`],
    { stdio: 'ignore' },
  )
  const target = join(OUT, `${shot.name}.${shot.jpg ? 'jpg' : 'webp'}`)
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', png, ...(shot.jpg ? ['-q:v', '3'] : ['-c:v', 'libwebp', '-quality', '82']), target])
  console.log(target)
}
rmSync(dir, { recursive: true, force: true })
