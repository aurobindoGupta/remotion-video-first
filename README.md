# First Time Speakers — Remotion Promo Video

A 30‑second, 16:9 promotional video built with [Remotion](https://www.remotion.dev) (React for
video). It encourages first‑time speakers to submit a talk, ending on an **"Apply to Speak"**
call‑to‑action. Deep‑ocean‑green theme, animated motion graphics, burned‑in captions, and
background music.

- **Format:** 1920×1080 (16:9), 30 fps, 30 seconds (900 frames)
- **Composition id:** `FirstTimeSpeakers`
- **Theme:** deep‑ocean‑green with emerald/teal/aqua glow and electric‑lime highlights

The video moves through six scenes: a fake CFP code editor that types and deletes a talk title →
*"What if your first talk didn't need to be perfect?"* → a supportive community with sliding chat
cards → a split‑screen of worries vs. encouragement → an emotional peak (*"Your voice matters."*)
→ the CTA with logo, glowing button, and `firsttimespeakers.com`.

---

## Quick start (from scratch)

These are the exact commands used to scaffold and set up this project:

```bash
npx create-video@latest my-first-video --template=blank
cd my-first-video

npm i
npx skills add remotion-dev/skills
npx remotion studio
```

If you cloned this repo (it already exists), just install and open the studio:

```bash
npm i
npm run dev      # opens Remotion Studio at http://localhost:3000
```

---

## Commands

| Command | What it does |
| --- | --- |
| `npm i` | Install dependencies |
| `npm run dev` | Open **Remotion Studio** (live preview) at `http://localhost:3000` |
| `npm run build` | Bundle the project (`remotion bundle`) |
| `npm run lint` | Run ESLint + TypeScript type‑check |
| `npx remotion studio` | Same as `npm run dev` |
| `npx remotion render FirstTimeSpeakers out/FirstTimeSpeakers.mp4` | Render the video to MP4 |
| `npx remotion still FirstTimeSpeakers out/frame.png --frame=300` | Render a single still frame |
| `npx remotion upgrade` | Upgrade Remotion to the latest version |

### Render the final video

```bash
npx remotion render FirstTimeSpeakers out/FirstTimeSpeakers.mp4
```

Rendering all 900 frames takes a few minutes depending on your machine's CPU/RAM.

---

## 📁 Where to find the output video

The rendered video is written to the **`out/`** folder:

```
out/FirstTimeSpeakers.mp4
```

> `out/` is **git‑ignored** (rendered videos are large and shouldn't live in source control), so
> the MP4 stays on your machine and is not pushed to GitHub. Re‑run the render command above to
> regenerate it any time.

---

## Project structure

```
my-first-video/
├── public/
│   ├── logo.png            # logo shown in the CTA
│   └── music.mp3           # background music (looped, with fade in/out)
├── src/
│   ├── Root.tsx            # registers the composition (size, fps, duration)
│   ├── Composition.tsx     # the 6 scenes + global camera push + audio
│   ├── theme.ts            # palette, scene timing, captions, chat/worry data, fonts
│   ├── index.ts / index.css
│   └── components/
│       ├── Background.tsx   # animated green blobs + particles + vignette
│       ├── CodeEditor.tsx   # opening "CFP_SUBMISSION.md" typewriter window
│       ├── ChatCard.tsx     # supportive community chat cards
│       ├── Bubble.tsx       # split‑screen worry / reaction bubbles
│       ├── Captions.tsx     # burned‑in lower‑third captions
│       └── ApplyButton.tsx  # glowing "Apply to Speak →" CTA button
├── out/                    # rendered MP4 output (git‑ignored)
├── remotion.config.ts
└── package.json
```

## Customizing

- **Timing / scenes:** edit `SCENES` in `src/theme.ts` (frames at 30 fps; scenes are sequential).
- **Colors:** edit `COLORS` in `src/theme.ts`.
- **Captions:** edit `CAPTIONS` in `src/theme.ts` (times are in milliseconds).
- **Copy / chat / worries:** edit `CHATS`, `WORRIES`, `REACTIONS`, `REASSURE_LINES` in
  `src/theme.ts`.
- **Logo / music:** drop replacements into `public/` as `logo.png` and `music.mp3`.

## Docs

- Remotion docs: https://www.remotion.dev/docs
- Reference brief for this project: `CreatingVideosUsingClaudeCode.md`
