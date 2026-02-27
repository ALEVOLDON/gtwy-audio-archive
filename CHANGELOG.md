# CHANGELOG

All notable changes to GTWY // ARCHIVE are documented here.

---

## [Unreleased] — 2026-02-27

### Added

#### Project Bootstrap
- Initialized React + Vite project with Tailwind CSS v4
- Configured `vite.config.js` with proxy rules for Bandcamp audio streaming (`/bandcamp` → `gtwy.bandcamp.com`, `/bcbits/*` → `*.bcbits.com`)

#### Components
- **`Header.jsx`** — Top navigation bar with logo, language toggle (EN/RU), wallet connect button
- **`Sidebar.jsx`** — System metrics panel: CPU load, memory, uptime, ping, operational logs
- **`Visualizer.jsx`** — 3D audio-reactive particle sphere rendered on HTML Canvas using Web Audio API `AnalyserNode`
- **`AlbumCard.jsx`** — Album card with cover art, play/pause button, price tag, purchase button and post-purchase overlay
- **`AudioPlayer.jsx`** — Fixed bottom player bar with progress bar (seek-clickable), track name, album name, prev/next/play controls
- **`Footer.jsx`** — Footer with status indicators

#### Data
- **`albums.js`** — Catalogue of 10 albums (GT-01 through GT-10, years 2006–2020) with Bandcamp paths, cover images, prices and bilingual descriptions
- **`dictionary.js`** — Full EN/RU translation dictionary for all UI strings

#### Audio Engine (`App.jsx`)
- Web Audio API context initialization on first user interaction
- Bandcamp HTML scraping via proxy to extract `mp3-128` stream URLs
- Full playlist support: track-by-track sequential playback, auto-advance on track end
- Skip forward / backward (`playNextOrPrev`)
- Pause/resume with per-album `<Audio>` element management
- Fallback audio source when Bandcamp stream is unavailable

#### UI / UX
- Mobile responsive layout: collapsible hamburger menu
- CRT scanline + film grain background effects via CSS
- Crosshair cursor
- Language toggle persists across components
- Simulated wallet connect flow (mock, non-Web3)
- Simulated USDT payment flow with TX confirmation state

#### Documentation
- `README.md` — Setup guide, feature overview, tech stack, album catalogue, roadmap

---

## Roadmap

- [ ] Real Web3 wallet (MetaMask / WalletConnect)
- [ ] On-chain USDT payment on Polygon
- [ ] Post-purchase download link
- [ ] Production audio CDN / proxy
