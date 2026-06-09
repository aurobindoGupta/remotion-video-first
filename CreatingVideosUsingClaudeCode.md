# Creating Videos using Claude Code

> Source: https://swap.notion.site/Creating-Videos-using-Claude-Code-379a4d37f74980c09ec8c19e99bfc403

Remotion is React for video. You can version control it, automate it, generate it from data, and scale it infinitely. One template can produce thousands of personalized videos. Change a single variable, re-render, and you've got a completely different video with zero manual editing.

## Getting started

```bash
npx create-video@latest my-first-video --template=blank
cd my-first-video

npm i
npx skills add remotion-dev/skills
npx remotion studio
```

## Try these prompts (then click Render to save as MP4)

1. Create a simple test composition. Just make white text that says 'Hello World' fade in smoothly from the start. Black background. Make it feel clean and simple. → **HelloWorld.mp4**
2. Make a title that says 'LAUNCH DAY' in bold white text. It should feel substantial, like it has real weight. Make it start small and grow into place with a satisfying bounce, like something heavy but elastic landing. Not a quick bounce, more like a deliberate settle. Make it feel premium and confident. Black background. → **MyComp.mp4**
3. Create a video with three text elements that appear one after another:
   - First: 'INTRODUCING' fades in at the start
   - Second: 'THE FUTURE' appears after the first one finishes, with a bouncy entrance
   - Third: 'OF DESIGN' slides in from the left after the second one
   Make each transition feel natural, not rushed. → **Intro.mp4**
4. I'm going to place a file called logo.png in the public/ folder. Add it to the video centered at the top. Make it fade in smoothly with a subtle scale effect, like it's gently appearing. Use the Remotion Img component so it waits for the image to load before rendering. → **Intro.mp4**
5. Make the logo bigger. → **Intro.mp4**
6. Even bigger! → **Intro.mp4**
7. Add background music from public/music.mp3. Also create a simple audio visualization at the bottom of the screen. Make bars that pulse with the beat. They should feel energetic and respond strongly to bass. → **Intro.mp4**
8. First Time Speakers Marketing Video (see full PROMPT below) → **FirstTimeSpeakers.mp4**

## PROMPT — First Time Speakers Marketing Video

```text
Create a premium, emotionally engaging 60-second marketing video for "First Time Speakers".

STYLE:
Modern startup aesthetic, cinematic motion graphics, Apple-level polish, clean typography, subtle gradients, dynamic transitions, inspiring soundtrack, fast-paced but emotional.

TARGET AUDIENCE:
Developers, engineers, designers, product managers, tech professionals who want to speak publicly but are afraid, inexperienced, or suffering from imposter syndrome.

OPENING (0-8s)

Visual:
Dark screen.
Cursor blinking.
Someone typing and deleting a conference CFP application.

Text:
"Ever wanted to give a tech talk..."

Pause.

"...but never submitted?"

Show:
Delete. Delete. Delete.

Voiceover:
"You know something valuable. But hitting 'submit' feels terrifying."

TRANSITION

Quick cuts:
Conference stage.
Audience.
Person nervous backstage.
Heart rate animation.

Text:
"What if your first talk didn't need to be perfect?"

MIDDLE (8-30s)

Visual:
Bright transition.
Supportive community scenes.
Virtual event clips.
People smiling.
Chat messages appearing.

Text sequence:
"No experience needed."
"Just 5 minutes."
"Supportive audience."
"Zero judgment."

Voiceover:
"First Time Speakers exists for people giving their very first tech talk. No pressure. No expertise requirements. Just a welcoming community ready to hear your story."

Show:
Micro-interactions.
Application form UI.
Friendly reactions.
Applause.

PAIN POINT SECTION (30-45s)

Split screen.

Left:
Thought bubbles:
"I'm not an expert."
"What if I mess up?"
"Someone else knows more."

Right:
Talk clips.
Audience nodding.
Positive reactions.

Text:
"The tech community needs more voices."

Voiceover:
"The best talks aren't from celebrities. They're from people willing to share what they've learned."

EMOTIONAL PEAK (45-55s)

Visual:
Speaker steps onto stage.
Lights come up.
Audience smiling.

Slow motion moment.

Text:
"Your first talk could inspire someone."

Voiceover:
"One five-minute talk can change your confidence forever."

CTA (55-60s)

Bright brand screen.

Logo:
FIRST TIME SPEAKERS

Text:
"Give your first tech talk."
"Apply now."

Button animation:
Apply to Speak →

Footer:
firsttimespeakers.com

Voiceover:
"Your voice matters. Apply today."

MOTION DESIGN NOTES:
- Smooth camera pushes
- Dynamic typography
- Floating UI cards
- Soft particle effects
- Modern tech conference aesthetic
- Diverse speakers
- High contrast accessibility
- Vertical 9:16 format
- Captions burned in

MOOD:
Encouraging, empowering, safe, optimistic.

GOAL:
Maximize speaker applications from people who have never spoken before.
```

## Assets

- **LOGO** (preferred unless you have a good reason otherwise): `512x512.png` (attached on the Notion page)
- **MUSIC** (or pick your own / trending track): `bensound-badass.mp3` (attached on the Notion page)

## The Mission

> 💡 Your mission, should you choose to accept it, is to create a 30-second video using Remotion talking about the content on the website https://firsttimespeakers.com/ with the final CTA being "Apply to Speak". It might take a few minutes to Render the final output (depending on your machine's RAM).
>
> Once done, tag Swapnil while sharing it on socials. [LinkedIn](https://www.linkedin.com/in/swapagarwal/) / [Instagram](https://www.instagram.com/swapagarwal/) / [Twitter](https://x.com/SwapAgarwal) (deadline: 24 hours, don't overthink, just get started, that's the best way to learn!)
