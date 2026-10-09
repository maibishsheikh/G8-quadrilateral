# QuadQuest — Module TRD
**Grade 8 · Quadrilaterals**
*(Technical companion to `QuadQuest_Grade8_PRD.md`, produced from `Intellia_Module_Blueprint_TRD.md`. Repo: `quad-quest-main`. Default clone source: `G2-Money-Money-main`, unless a more recent sibling — for example `mosaic-quest-main`, which also renders SVG geometry — is designated as the actual clone source at build time.)*

---

## 1. Reference Analysis Notes — Gotcha Check

Check each fresh against whichever repo is actually cloned from, per platform blueprint §1:

1. **Dead/duplicate `src/features/*` folder.** Confirm `App.jsx`'s actual imports before copying anything.
2. **Hardcoded story-panel count.** This module uses the default **4 panels** — likely a no-op, but confirm against the actual clone source.
3. **Static vs. procedural question bank.** Build `data/questionBank.js` procedurally across the 10 concept generators in §4.1. This is a **geometry-rendering-heavy** module: almost every question carries a figure, and the Simulate phase needs a small live geometry engine (§4.4), which is a larger build surface than any Grade 7 sibling except MosaicQuest.
4. **Viewport-clipping bug.** Proactively apply the `100dvh` + `ResizeObserver` header-height fix.
5. **Leftover branding strings.** Check `index.html`'s `<title>` and `README.md` for stale references from whichever module was cloned, including leftover mascot or character references.
6. **Multi-tab/multi-round scaffolding.** If cloning from `progression-quest-main`, strip its 5th Simulate tab and multi-round station state back to the standard 4-tab single-pass architecture.

**Module-specific risks to add:**
- **Correctness lives in geometry, and in two places at once.** Every angle or length answer is derived by a *rule chain* (for example "co-interior angles → 112°"), while every figure is drawn from *coordinates*. If the two ever disagree, the module silently teaches something false. §4.4 and §10 make agreement between them an enforced, tested invariant.
- **"Not drawn to scale" must be real.** Singapore-style questions often say the diagram is not drawn to scale, so the rendered figure must be deliberately re-solved into a *different* valid construction than the one used to compute the answer (see `distortNotToScale`, §4.4). Otherwise students can measure the picture.
- **Definition policy.** The trapezium and kite definitions are a judgment call (PRD §3, §15.1) and must live in exactly one named constant.

## 2. Tech Stack

Unchanged from platform blueprint §2.1 — reuse verbatim. `vite.config.js`, `tailwind.config.js`, `postcss.config.js`, `vercel.json` — reuse as-is. No geometry library is added; the engine in §4.4 is small, pure, and local, so the zip stays dependency-light.

## 3. Folder Structure

```
quad-quest-main/
├── public/assets/{audio/, story/}
├── scripts/
│   ├── generate_audio.js         # MODIFY: new `phrases` array (§8)
│   └── clean_audio.js            # reuse as-is
├── src/
│   ├── assets/story/             # story_1.png ... story_4.png
│   ├── components/
│   │   ├── IntroScreen.jsx/.css  # MODIFY: title/copy only
│   │   ├── ProgressMap.jsx/.css  # reuse as-is
│   │   ├── shared/
│   │   │   ├── Mascot.jsx/.css              # reuse as-is (props swap to Gigi the Giraffe)
│   │   │   ├── FeedbackOverlay.jsx/.css     # reuse as-is
│   │   │   ├── FloatingNumbers.jsx/.css     # reuse as-is
│   │   │   └── QuadVisual.jsx               # NEW — §5.1
│   │   ├── gamification/
│   │   │   ├── KingdomMap.jsx/.css  # reuse as-is
│   │   │   └── StarRating.jsx       # reuse as-is
│   │   ├── quiz/
│   │   │   ├── QuestionRenderer.jsx/.css  # MODIFY: import QuadVisual; add reason-selection answer type (§5.2)
│   │   │   └── BossBattleModal.jsx/.css   # reuse as-is
│   │   ├── phases/
│   │   │   ├── WonderPhase.jsx/.css    # MODIFY: content only
│   │   │   ├── StoryPhase.jsx/.css     # MODIFY: content only
│   │   │   ├── SimulatePhase.jsx/.css  # MODIFY: 4 new station imports/labels (standard 4-tab architecture)
│   │   │   ├── PlayPhase.jsx/.css      # reuse as-is
│   │   │   └── ReflectPhase.jsx/.css   # MODIFY: 3 new recap questions (§6.3)
│   │   └── simulations/
│   │       ├── ShapeShifterLab.jsx       # NEW — Concept Discovery Lab — §6
│   │       ├── BuildToSpec.jsx           # NEW — Build-to-Target Challenge — §6
│   │       ├── FileTheEntry.jsx          # NEW — Multi-Step/Composite Construction — §6
│   │       ├── TheMislabelledExhibit.jsx # NEW — Error-Detective — §6
│   │       └── Stations.css              # MODIFY: extend with figure, slider, property-panel, and family-tree classes
│   ├── config/
│   │   ├── worlds.config.js       # MODIFY: 10 topic-themed worlds — §4.1
│   │   ├── characters.config.js   # MODIFY: Hui Min / Sanjay / Gigi — §4.2
│   │   └── audio.config.js        # reuse as-is
│   ├── core/hooks/useViewport.js  # reuse as-is
│   ├── hooks/useAudio.js          # reuse as-is
│   ├── data/
│   │   ├── storyContent.js        # MODIFY: 4 story panels — §4.3
│   │   └── questionBank.js        # MODIFY: procedurally generated 100 Qs — §4.4
│   ├── utils/
│   │   ├── audio.js               # reuse as-is
│   │   ├── audioMap.js            # auto-generated — do not hand-edit
│   │   ├── narration.js           # MODIFY: topic-specific phase scripts — §8
│   │   ├── badgeEngine.js         # MODIFY: relabelled BADGES array only — §7
│   │   ├── scoring.js             # reuse as-is
│   │   ├── shuffle.js             # reuse as-is
│   │   ├── quadGeometry.js        # NEW — pure geometry engine — §4.4
│   │   ├── quadProperties.js      # NEW — computed property table, hierarchy, reasons — §4.4
│   │   └── quadProblems.js        # NEW — rule-chain problem generators — §4.4
│   ├── styles/
│   │   ├── design-tokens.css      # MODIFY: 10 new --world-N accent colors — §9
│   │   └── globals.css            # reuse as-is (apply viewport fix from §1.4 proactively)
│   ├── App.jsx                    # MODIFY only if the clone source's panel-count logic differs from 4 (§1.2)
│   ├── App.css / main.jsx / index.css   # reuse as-is
├── index.html / package.json / vite.config.js / tailwind.config.js / postcss.config.js / vercel.json / .oxlintrc.json / .gitignore
└── README.md                      # MODIFY: module-specific + art-brief (PRD §13)
```

## 4. Data Layer

### 4.1 `config/worlds.config.js`
Ten entries in the fixed shape, populated from PRD §9:

```js
export const WORLDS = [
  { id: 0, name: "Meet the Species", emoji: "🦎", accent: "var(--world-0)",
    description: "Identify the six special quadrilaterals by defining property",
    conceptFocus: "identify-special-quadrilaterals",
    boss: { name: "The Look-Alike Lurker", emoji: "🦎", reward: "Spotter Badge" } },
  { id: 1, name: "Four Corners", emoji: "🐊", accent: "var(--world-1)",
    description: "Use the 360° angle sum to find a missing angle",
    conceptFocus: "angle-sum-quadrilateral",
    boss: { name: "The Four-Corner Croc", emoji: "🐊", reward: "Corner Badge" } },
  { id: 2, name: "Parallel Pairs", emoji: "🐍", accent: "var(--world-2)",
    description: "Angle properties of parallelograms, trapeziums, kites",
    conceptFocus: "angle-properties-parallel",
    boss: { name: "The Parallel Python", emoji: "🐍", reward: "Parallel Badge" } },
  { id: 3, name: "Side by Side", emoji: "🐒", accent: "var(--world-3)",
    description: "Side properties; unknown lengths and perimeters",
    conceptFocus: "side-properties-perimeter",
    boss: { name: "The Side-Swapping Baboon", emoji: "🐒", reward: "Sides Badge" } },
  { id: 4, name: "Cross Paths", emoji: "🐆", accent: "var(--world-4)",
    description: "Diagonal properties of each special quadrilateral",
    conceptFocus: "diagonal-properties",
    boss: { name: "The Crossing Cheetah", emoji: "🐆", reward: "Diagonal Badge" } },
  { id: 5, name: "Name That Shape", emoji: "🦜", accent: "var(--world-5)",
    description: "Classify from given properties; most specific name",
    conceptFocus: "classify-from-properties",
    boss: { name: "The Name-Game Parrot", emoji: "🦜", reward: "Namer Badge" } },
  { id: 6, name: "The Family Tree", emoji: "🐘", accent: "var(--world-6)",
    description: "All / some / no statements using the hierarchy",
    conceptFocus: "hierarchy-inclusion",
    boss: { name: "The Family-Tree Elephant", emoji: "🐘", reward: "Lineage Badge" } },
  { id: 7, name: "X Marks the Angle", emoji: "🐵", accent: "var(--world-7)",
    description: "Form and solve equations from algebraic angle/side expressions",
    conceptFocus: "algebraic-angles-and-sides",
    boss: { name: "The Mystery-X Monkey", emoji: "🐵", reward: "Solver Badge" } },
  { id: 8, name: "Give Your Reasons", emoji: "🦏", accent: "var(--world-8)",
    description: "Multi-step angle problems with a reason for each step",
    conceptFocus: "multi-step-with-reasons",
    boss: { name: "The Reasons Rhino", emoji: "🦏", reward: "Reasoner Badge" } },
  { id: 9, name: "The Grand Field Guide", emoji: "🏞️", accent: "var(--world-9)",
    description: "Mixed review of every concept above",
    conceptFocus: "mixed-review",
    boss: { name: "The Chief Park Warden", emoji: "🏞️", reward: "Field Guide Champion Trophy" } },
];
```

### 4.2 `config/characters.config.js`
```js
export const CHARACTERS = {
  huiMin: { name: "Hui Min", role: "Names shapes by looks", emoji: "👧🏻", colour: "var(--char-1)", mascotEmoji: "🦒" },
  sanjay: { name: "Sanjay", role: "Measures the diagonals first", emoji: "🧑🏽", colour: "var(--char-2)", mascotEmoji: "🦒" },
  gigi:   { name: "Gigi the Giraffe", role: "Mascot & mentor", emoji: "🦒", colour: "var(--mascot)", mascotEmoji: "🦒" },
};
export const MASCOT = { name: "Gigi the Giraffe", emoji: "🦒" };
```

### 4.3 `data/storyContent.js`
`STORY_PANELS` array, length 4, per PRD §8.2, fixed shape `{ panel, title, text, highlight, character, characterEmoji, imageBg, imageEmoji }`. Titles: "A Strange Sighting," "Check the Features," "The Family Tree," "Filed in the Field Guide."

### 4.4 Geometry Engine and Question Bank

Three pure modules, deliberately split so each has one job and one source of truth.

**`utils/quadGeometry.js`** — coordinates in, measurements out. No hand-typed facts about named shapes live here.

| Function | Purpose |
|---|---|
| `TOLERANCE` | One named constant (for example `1e-6` for exact constructions, a looser value for slider-driven shapes) used by every comparison below; never an inline epsilon. |
| `fromDiagonals(d1, d2, theta, s1, s2)` | Builds vertices A, B, C, D from two diagonals AC and BD of lengths `d1`, `d2` crossing at angle `theta`, where the crossing point P divides AC in ratio `s1` and BD in ratio `s2`. Every special quadrilateral is a known region of this parameter space (parallelogram: `s1 = s2 = 0.5`; rectangle adds `d1 = d2`; rhombus adds `theta = 90°`; square both; kite: `theta = 90°` with one diagonal bisected; trapezium: `s1 = s2 ≠ 0.5`). Drives the Shape Shifter Lab and Build to Spec. |
| `sideLengths(q)`, `interiorAngles(q)`, `diagonalFacts(q)` | Measure the figure. `diagonalFacts` returns `{ equal, bisectEachOther, perpendicular, bisectAngles }` computed from coordinates. |
| `areParallel(q, sideI, sideJ)`, `isConvex(q)` | Parallelism and convexity tests using `TOLERANCE`. Non-convex or degenerate shapes are rejected at generation. |
| `distortNotToScale(spec)` | Given a figure *specification* (the marks that define it, plus the free parameters), returns a **different** valid construction that satisfies the same marks. Used to render "not drawn to scale" figures so the picture cannot be measured to get the answer. |

**`utils/quadProperties.js`** — everything that is *claimed* about shapes is computed here from canonical constructions.

| Function / constant | Purpose |
|---|---|
| `DEFINITION_POLICY` | The single named constant holding the PRD §3 policy (trapezium: exactly one pair of parallel sides; kite: two pairs of equal adjacent sides, not all equal). Every generator reads it. |
| `BORDERLINE_RELATIONS` | The relations that flip under the inclusive definitions (parallelogram ⊂ trapezium, rhombus ⊂ kite, square ⊂ kite). The generators **never** emit a question or distractor whose truth depends on these. |
| `PROPERTY_TABLE` | Built at load by constructing one canonical instance of each special quadrilateral and running `quadGeometry.js` on it: for each shape, which side, angle, diagonal, and symmetry facts hold. **Never typed by hand.** A one-time unit test compares it against an independently written expected table, so a bug in either is caught. |
| `HIERARCHY` | Inclusion relations (square ⊂ rectangle, square ⊂ rhombus, rectangle ⊂ parallelogram, rhombus ⊂ parallelogram, parallelogram ⊂ quadrilateral, and so on), **derived from `PROPERTY_TABLE`** (shape A includes shape B if B has every defining property of A), excluding `BORDERLINE_RELATIONS`. |
| `mostSpecificName(propertySet)` | Returns the most specific species consistent with a set of confirmed properties, or `null` if the set is not enough to decide (so classification questions are never ambiguous). |
| `REASONS` | A **closed list** of allowed reason strings (for example `angle-sum-quadrilateral`, `opposite-angles-parallelogram`, `co-interior-angles-parallel`, `diagonals-rhombus-perpendicular`, `diagonals-rhombus-bisect-angles`, `angle-sum-triangle`, `kite-equal-angles`). Used for the reason-matching answer type, for explanations, and for narration. |
| `misconception.*` | Generators for wrong-but-realistic claims, each built by *negating or swapping an entry of `PROPERTY_TABLE`*: `classifyByLooks`, `squareOnlySquare`, `rhombusDiagonalsEqual`, `rectangleDiagonalsPerpendicular`, `confuseEqualVsBisect`, `adjacentAnglesEqual`, `oppositeAnglesSupplementary`, `kiteOppositeSidesEqual`, `kiteParallel`, `angleSum180`, `lessSpecificAsMostSpecific`. Every distractor and every Error-Detective mistake comes from here, never hand-authored. |

**`utils/quadProblems.js`** — rule-chain generators for numeric answers.

| Function | Purpose |
|---|---|
| `generateAngleProblem(shape, difficulty)` | Picks a shape and given values from the clean ranges below, builds a **rule chain** (an ordered list of `{ step, reasonKey, value }`), and returns the answer, the marks to draw, and the figure specification. |
| `generateAlgebraicAngleProblem(shape)` | Chooses an integer `x`, builds expressions for two angles from the relevant property (adjacent supplementary, opposite equal, kite equal pair, and so on), and returns the equation, the solution, and the check that every resulting angle is valid. |
| `generateDiagonalLengthProblem(shape)` | Uses equal/bisecting diagonals (no square roots). |
| `generateMultiStepWithReasons(shape)` | Chains 2–3 rule steps and records a second, **independent** route to the same answer where one exists (for example the rhombus angle PAB via co-interior angles then bisection, and via the triangle formed by the diagonals). |
| `generateClassificationItem()` | Builds a property set and uses `mostSpecificName`; rejects sets that return `null`. |

**Clean-number and clean-geometry constraints (hard requirements, not inline magic numbers):**
- Given angles are whole degrees in a safe range (for example 40° to 140° for parallelogram angles) so shapes are never degenerate; algebraic items give integer *x* and every angle strictly between 0° and 180°.
- Side lengths are whole centimetres (for example 3 to 20); no question requires a square root.
- Every generated figure passes `isConvex` and has no near-zero angle or side.
- A figure's **marks must be sufficient**: the asked-for quantity must be fully determined by the marks alone. This is tested by the determinacy audit in §10.

**`data/questionBank.js` generation:** one or more template functions per `conceptFocus` (10 slugs from §4.1), each producing exactly 4 options (1 correct + 3 distractors from `misconception.*` or from the arithmetic slips tied to the chosen rule chain). Reason-matching questions (World 8) present the steps and ask the student to match each to a reason from `REASONS`. Fixed output schema (unchanged): `{ id, districtId, category, visual, questionText, options, correctAnswer, explanation, hint1, hint2, visualData }`; `visualData` carries the figure specification and marks for `QuadVisual.jsx`. Also export `DISTRICTS` (derived from `WORLDS`) so `PlayPhase.jsx`'s existing import is unmodified.

## 5. Component Specs

### 5.1 `QuadVisual.jsx`
Replaces the reference's domain visual component. Takes `{ type, data, compact }`. Supported `type` values:
- `"figure"` — the quadrilateral with vertex labels and **marks** (equal-side ticks, parallel arrows, right-angle squares, angle arcs with values). Renders the `distortNotToScale` construction when the spec says not-to-scale, and always shows a text "not drawn to scale" label in that case.
- `"diagonals-overlay"` — the figure with diagonals drawn and their intersection point labelled, for World 4.
- `"property-matrix"` — species × property table built from `PROPERTY_TABLE`, used in explanations and the Shape Shifter Lab.
- `"family-tree"` — the inclusion hierarchy from `HIERARCHY`, used in Story panel 3, World 6 explanations, and File the Entry.
- `"step-reasons"` — a worked chain of steps with a reason line under each, for World 8.

Every type carries a text description of its marks (PRD §12); none relies on colour alone. `compact` shrinks rendering for inline use in `QuestionRenderer.jsx`.

### 5.2 Reason-selection answer type
`QuestionRenderer.jsx` needs one new answer format beyond 4-option MCQ: "match each step to its reason." It renders a short step list with a dropdown or option set per step drawn from `REASONS`. The question still conforms to the fixed schema (the options array holds the candidate reason sets, and `correctAnswer` encodes the matching), so `PlayPhase.jsx` scoring is unchanged.

## 6. Simulate Station Specs

All 4 follow the fixed per-station contract: `<StationComponent onComplete={fn} audioEnabled={bool} />`, self-contained internal state, live SVG visuals themed with `design-tokens.css` variables, a `station-success` panel with a "Complete Station ✓" CTA, and keyboard-operable +/− controls alongside any slider/drag interaction. Standard single-pass architecture.

| Component | Archetype | Student manipulates | Live feedback | Completion gate |
|---|---|---|---|---|
| `ShapeShifterLab.jsx` | Concept Discovery Lab | Five sliders (`d1`, `d2`, `theta`, `s1`, `s2`) feeding `fromDiagonals` | The figure redraws live; a property panel (from `quadGeometry` measurements) shows which side, angle, and diagonal facts currently hold, and the species name updates via `mostSpecificName` | Free exploration that reaches at least four different species, **plus one confirmation question** ("which slider change turned the parallelogram into a rectangle?") per the platform's default archetype |
| `BuildToSpec.jsx` | Build-to-Target Challenge | The same sliders, aimed at a spec card of required properties | A live checklist ticks each property as `quadGeometry` confirms it, with text labels (not colour-only) | All listed properties met simultaneously; a "try another spec" loop offers a fresh spec before the station is markable complete |
| `FileTheEntry.jsx` | Multi-Step/Composite Construction | Four chained steps on one mystery shape: (1) mark confirmed properties, (2) name the most specific species via `mostSpecificName`, (3) find an unknown angle with a reason from `REASONS`, (4) place the shape on the `family-tree` view | Each step's result is shown live and feeds the next; the field-guide entry fills in as steps complete | All four steps completed correctly in sequence — targets PRD LOs 2, 4, 5, 6, and 8 |
| `TheMislabelledExhibit.jsx` | Error-Detective | Taps the line of a ranger's field-guide entry that contains the seeded mistake, then supplies the correction | The tapped line highlights; the mistake pool is generated from `misconception.*` against `PROPERTY_TABLE`, so every "error" is genuinely false and every correction is genuinely true | Correctly identifying the erroneous line and supplying the fix |

Wire all 4 into `SimulatePhase.jsx`'s `STATIONS` array and station-index render switch; tab bar, footer navigation, progress dots, and `COMPLETE_SIM_STATION`/`ADVANCE_SIM_STATION` gating logic are reused verbatim from the reference.

### 6.3 `ReflectPhase.jsx` Recap Questions
Replace the 3 hard-coded recap questions with 3 targeting classifying by appearance (including "a square is only a square"), mixing up diagonal properties, and treating adjacent parallelogram angles as equal (PRD §8.5), matching the Error-Detective station's focus.

## 7. Gamification

`utils/scoring.js` (`calcXP`, `calcStars`) — reuse formulas as-is. `utils/badgeEngine.js` — reuse `checkBadges(state)` trigger logic as-is; only the `BADGES` array's display strings change, per PRD §10's rename table (First Sighting, Sharp Eyes, Tracker's Streak, Full Ranger Kit, Habitat Mastered, Wild Card Tamed, Seasoned Ranger, Chief Ranger Badge).

## 8. Audio Pipeline

`config/audio.config.js`, `utils/audio.js`, `hooks/useAudio.js`, `utils/audioMap.js` — reuse mechanics as-is.

Rewrite `utils/narration.js` function *bodies* (signatures unchanged, same list as earlier modules' TRDs) and `scripts/generate_audio.js`'s `phrases` array using PRD §11's rules: vertex labels spoken letter by letter; `∠ABC` as "angle A, B, C"; `∥` as "is parallel to"; `⊥` as "is perpendicular to"; marks narrated explicitly; "co-interior," "bisect," and "perpendicular" explained on first use; always "trapezium"; "equal," "bisect each other," and "perpendicular" never blurred; every reason step narrated as "because" plus the reason. Dynamic generation covers the numbers and vertex-label variations in procedurally generated questions. After content lock: `npm run generate-audio` then `npm run clean-audio`.

## 9. Design Tokens

`styles/design-tokens.css` — reuse core palette/type/radii/shadows/transitions as-is. Regenerate only the `--world-0` through `--world-9` accent block, using a savanna palette distinct from the earlier modules' palettes:

| World | Accent (indicative) |
|---|---|
| 0 — Meet the Species | `#C9A227` (savanna gold) |
| 1 — Four Corners | `#7A9E3F` (acacia green) |
| 2 — Parallel Pairs | `#B5651D` (red earth) |
| 3 — Side by Side | `#8E6C4A` (dry-grass brown) |
| 4 — Cross Paths | `#E0A458` (sunset amber) |
| 5 — Name That Shape | `#3F8F8F` (waterhole teal) |
| 6 — The Family Tree | `#6B8E23` (baobab olive) |
| 7 — X Marks the Angle | `#D95D39` (termite-mound orange) |
| 8 — Give Your Reasons | `#5B4B8A` (twilight violet) |
| 9 — The Grand Field Guide | `#2F3E2C` (deep jungle green — most dramatic, for the finale) |

## 10. Build, QA, and Delivery

1. **Question bank stress test** — ≥300 randomized generations (30,000 questions) across all 10 concept categories; assert no duplicate options, no malformed/`NaN`/`undefined` fields, no non-convex or degenerate figure, and no angle or length outside the clean ranges in §4.4.
2. **Property-table audit (module-specific)** — confirm `PROPERTY_TABLE` equals the independently written expected table; confirm every property claim in the bank, true or false, agrees with it.
3. **Rule-versus-coordinates audit (module-specific, highest stakes)** — for every numeric item, confirm the answer from the rule chain equals the value measured from the figure constructed from the same specification. For multi-step items, also confirm the independent second route (§4.4) gives the same answer.
4. **Determinacy audit (module-specific)** — for every item, build at least two *different* valid constructions consistent with the drawn marks (via `distortNotToScale` with different random free parameters) and confirm the asked-for quantity is **identical** in both. A mismatch means the marks do not determine the answer and the question is ambiguous or measurable-by-picture.
5. **Definition-policy audit** — confirm no item or distractor depends on any entry of `BORDERLINE_RELATIONS`.
6. **Classification-uniqueness audit** — confirm every World 5 item's property set yields a non-null `mostSpecificName`, and that no listed distractor is also a correct "most specific" answer.
7. **Misconception audit** — spot-check that distractors come from `misconception.*` rather than arbitrary numbers or names.
8. **Audio parity check** — every string passed to a narration helper has an exact match in `audioMap.js`, or is intentionally dynamic; confirm vertex labels are spoken letter by letter.
9. **Full user-journey walkthrough** — Wonder → Story (all 4 panels) → Simulate (all 4 stations completable, tab-gating correct) → Practice (World Map, all 4 modes, all 10 Boss Battles, badges) → Reflect — zero console/page errors, including the reason-matching answer type.
10. **Production build check** — `npm install && npm run build` succeeds from a clean extract.
11. **Accessibility spot-check** — fonts/touch targets at Secondary-appropriate sizing; every figure has a text description of its marks; marks are not colour-only; sliders have keyboard equivalents.
12. **Delivery checklist** — zip excludes `node_modules/`/`dist/`; 4 story image placeholders with art-brief README; `README.md` updated and checked for leftover branding; `.env.local.example` documents `VITE_ELEVENLABS_API_KEY` with no real key committed.

## 11. Risks

- **Rule-versus-coordinates agreement is the single most important invariant.** A silent disagreement would teach a false fact with a convincing picture. §10.3 and §10.4 must not be treated as optional or folded into the generic stress test.
- **Floating-point comparisons.** Parallelism, equal diagonals, and perpendicularity are tested numerically; every comparison must go through the single `TOLERANCE` constant, with an exact-construction mode for generated figures and a looser mode for slider-driven shapes, or the Shape Shifter Lab's species name will flicker near boundaries.
- **Slider boundaries.** In the Lab, the instant a slider passes through a special value (for example `theta = 90°`) the name changes; snap points or a small hold region are needed so students can actually *land* on a rhombus rather than skate past it.
- **Not-to-scale misuse.** If `distortNotToScale` ever returns the same construction used to compute the answer, students can measure. Keep the audit in §10.4 running after any generator change.
- **Definition policy drift.** If a later content edit adds an item touching a trapezium or kite relation, `BORDERLINE_RELATIONS` must be checked first.
- **Build size.** This is the largest geometry engine in the series; budget extra time for the Lab and the audits relative to the Grade 7 modules.
- **Concept Discovery Lab tension, unresolved for this module** (PRD §15.4).
