# 💖 TO MY PRINCESS, MEENU — A Little Universe Made Just for You

A cinematic, romantic, interactive birthday surprise website crafted with all the love for **Princess Meenu** on her birthday (15 November).

---

## ✨ Features & Chapters

1. **Chapter 1: The Magical Welcome 🌙**
   - Cinematic starry sky with glowing pink particles and floating hearts.
   - Romantic greeting and teaser.
   - Glowing **[ OPEN YOUR LITTLE UNIVERSE ❤️ ]** button which kicks off the story and starts the romantic soundtrack.
   - Headphones recommendation prompt.

2. **Chapter 2: Five Months of Us ❤️**
   - Animated milestone counters (5 Months together, 1000+ smiles shared, 3600+ magical hours).
   - Dedicated **22:22 Special Moment** card.
   - Interactive milestone timeline detailing the journey from the first glance to 5 months of togetherness.

3. **Chapter 3: Our Little Scrapbook 📸**
   - 8 Polaroid-style photo cards with scrapbook tape, realistic rotations, and handwritten captions.
   - Interactive Lightbox with zoom, date tags, and heartfelt personal notes.
   - **Zero Broken Images Guaranteed**: If photos are not yet uploaded, a high-fashion romantic placeholder card is displayed automatically.

4. **Chapter 4: 10 Reasons Why You Are My Princess 💗**
   - 10 interactive 3D flip cards with custom romantic artwork and icons.
   - Card flip reveal with sound and progress tracker (*"X of 10 reasons revealed"*).
   - Confetti burst on uncovering all 10 reasons!

5. **Chapter 5: A Letter From My Heart 💌**
   - Animated vintage envelope with wax seal and ribbon.
   - Unfolds into a parchment letter styled with elegant handwriting.
   - Pre-loaded with the heartfelt birthday letter.

6. **Chapter 6: The Final Birthday Surprise 🎂**
   - 3D-styled multi-layer birthday cake with pink icing, frosting ribbons, strawberries, and candles.
   - Glowing flickering candle flames.
   - Interactive **[ Blow the Candles ✨ ]** button with smoke puff effect!
   - Multi-burst canvas confetti explosion and final romantic message.
   - **[ Experience The Magic Again ]** replay button.

7. **🌟 Interactive Extras & Easter Eggs:**
   - **Secret Easter Egg**: A tiny twinkling star in the night sky reveals a secret love whisper when clicked!
   - **Desktop Custom Cursor**: Romantic heart cursor leaving sparkling trails on mouse move.
   - **Persistent Floating Music Player**: Play/pause, mute/unmute, and volume slider. Includes an ambient romantic chime synthesizer fallback if an MP3 file is not yet uploaded.
   - **Chapter Progress Indicator & Navigation**: Floating breadcrumbs and next/back buttons.

---

## 🛠️ How to Customize Personal Details

Everything is organized in simple, editable files inside `src/data/`:

| File | Purpose |
| :--- | :--- |
| `src/data/memories.js` | Update photo captions, titles, messages, and tags for the 8 scrapbook memories. |
| `src/data/journey.js` | Edit the 5-month milestones, stats, and the 22:22 special quote. |
| `src/data/reasons.js` | Customize any of the 10 reasons why she is your princess. |
| `src/data/letter.js` | Edit the love letter paragraphs, greeting, signature, and postscript. |

---

## 📸 Adding Your Photographs

1. Put your 8 photos inside `public/images/`.
2. Name them:
   - `photo1.jpg`
   - `photo2.jpg`
   - `photo3.jpg`
   - `photo4.jpg`
   - `photo5.jpg`
   - `photo6.jpg`
   - `photo7.jpg`
   - `photo8.jpg`

---

## 🎵 Adding Your Background Music

1. Place your preferred romantic song inside `public/music/`.
2. Name it `background.mp3`.
3. The music will automatically play smoothly across all chapters when she clicks the welcome button!

---

## 🚀 Running the Project

To start the local development server:
```bash
npm run dev
```

To build for production:
```bash
npm run build
```

