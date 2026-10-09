# QuadQuest — Grade 8 Quadrilaterals
**The Savanna Ranger Academy · Proving Features, Not Guessing Looks**

QuadQuest teaches students to stop naming quadrilaterals by how they *look* and start naming them by what can be *proven*: their sides, angles, and diagonals. Built with the 5-phase interactive architecture (Wonder → Story → Simulate → Play / Practice → Reflect).

---

## 🧭 Five-Phase Learning Architecture

1. **Wonder Phase**: The Savanna Enclosure Mystery — a sign says "RECTANGLE" because opposite sides are equal, but could it be a tilted parallelogram? One measurement settles it: the diagonals!
2. **Story Phase**: 4 narrative panels following rangers **Hui Min**, **Sanjay**, and mentor **Gigi the Giraffe 🦒**.
3. **Simulate Phase**: 4 interactive laboratory stations:
   - **Station A (Shape Shifter Lab)**: Concept Discovery Lab with 5 diagonal sliders (`d1`, `d2`, `theta`, `s1`, `s2`) driving a pure geometry engine to observe real-time species transitions.
   - **Station B (Build to Spec)**: Build-to-Target Challenge with live property checklists verifying perpendicularity, bisection, and equality.
   - **Station C (File the Entry)**: Multi-Step Composite Construction examining specimen #804, verifying features, finding unknown angles with reasons, and placing on the family tree.
   - **Station D (The Mislabelled Exhibit)**: Error-Detective identifying seeded misconceptions on ranger plaques and submitting geometric corrections.
4. **Practice / Play Phase**: 10 Savanna Worlds × 10 Questions = 100 procedurally generated questions with visual figures, angle arcs, tick marks, parallel chevrons, and step-reason matching, plus 10 unique Habitat Boss Battles.
5. **Reflect Phase**: 3 headline misconception recap questions, personal reflection journal, and comprehensive Chief Ranger scorecard.

---

## 🎨 Art Brief for Story Panels (PRD §13)

The module ships with placeholder story images located in `src/assets/story/` and `public/assets/story/`. When replacing with final production assets, match the following visual briefs:

- **Panel 1 (`1.png`)**: *A Strange Sighting*
  - **Scene**: The entrance archway of the Savanna Ranger Academy overlooking expansive golden grassland at sunrise.
  - **Characters**: Hui Min (looking through binoculars, curious expression) and Sanjay (holding a brass ranger calipers and notebook) looking toward strange glowing four-sided creatures wandering among acacia trees in the distance.
  - **Mood**: Adventurous, inspiring, scientific discovery.

- **Panel 2 (`2.png`)**: *Check the Features*
  - **Scene**: Interior of the Ranger Field Station.
  - **Characters**: Gigi the Giraffe standing tall by a rustic drafting table, pointing her neck toward two geometric specimens: a very elongated, thin rhombus and a neat square.
  - **Details**: Measuring tape, compass, and chalk markings showing diagonals crossing at right angles (90°). Hui Min has an "aha!" realization.
  - **Mood**: Educational, enlightening, focus on rigorous measurement.

- **Panel 3 (`3.png`)**: *The Family Tree*
  - **Scene**: The academy's great wooden Hall of Taxonomy.
  - **Visual**: A massive carved baobab-tree lineage board illustrating the hierarchy: *Quadrilateral* at the roots, branching into *Trapezium*, *Parallelogram*, and *Kite*, with Parallelogram further branching into *Rectangle* and *Rhombus*, uniting at the crown in a golden *Square*.
  - **Characters**: Gigi explaining the branches to Hui Min and Sanjay.
  - **Mood**: Majestic, organized, evolutionary math tree.

- **Panel 4 (`4.png`)**: *Filed in the Field Guide*
  - **Scene**: The Academy Certification Desk.
  - **Visual**: A parchment field-guide entry for specimen #804 (Parallelogram) stamped with a red wax seal reading "APPROVED · VERIFIED BY PROOF".
  - **Characters**: Sanjay and Hui Min high-fiving; Gigi smiling approvingly with savanna plains visible through the window.
  - **Mood**: Celebratory, accomplished, certified ranger mastery.

---

## ⚙️ Tech Stack & Commands

- **Framework**: React 19 + Vite 8 + TailwindCSS + Framer Motion
- **Geometry Engine**: Pure custom SVG geometry engine (`src/utils/quadGeometry.js`, `src/utils/quadProperties.js`, `src/utils/quadProblems.js`)
- **Audio Pipeline**: ElevenLabs Alice profile with zero-latency pre-generated mapping and silent graceful fallback.

### Scripts

```bash
# Start development server
npm run dev

# Run production build
npm run build

# Run TRD §10 comprehensive QA and stress test audit (3,000+ test runs)
node scripts/qa_audit.js

# Generate audio narration (requires ElevenLabs API key in .env.local)
npm run generate-audio

# Clean orphan audio files
npm run clean-audio
```

---

## 🔑 Environment Configuration

Create a `.env.local` file (see `.env.local.example`) if generating offline narration via ElevenLabs:

```env
VITE_ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
```
