# QuadQuest — Module PRD
**Grade 8 · Quadrilaterals**
*(Produced from `Intellia_Module_Blueprint_PRD.md` — {{GRADE}} = Grade 8, {{TOPIC}} = Quadrilaterals, {{SPECIAL_INSTRUCTIONS}} = none supplied, defaults assumed throughout)*

---

## 1. Overview

QuadQuest teaches students to stop naming quadrilaterals by how they *look* and start naming them by what can be *shown*: their sides, angles, and diagonals. Students learn the properties of the six special quadrilaterals (trapezium, parallelogram, rectangle, rhombus, square, kite), use those properties to find unknown angles and lengths with a stated reason for every step, classify a shape from a set of given properties (including the most specific name it earns), and understand the "family tree" of inclusion (a square really is a rectangle *and* a rhombus). It is framed as a wildlife-ranger academy: every world is a habitat, every shape is a "species," and a field-guide entry is only valid if its identifying features are checked, not guessed.

## 2. Background

This is the first Grade 8 (Secondary 2) module built against the platform blueprint's reference architecture; the eight earlier modules in this series (EquationQuest through RepresentQuest) were all Grade 7. It reuses `G2-Money-Money-main`'s five-phase architecture per platform convention. It starts a geometry strand rather than extending the Grade 7 pattern family.

**Relationship to existing modules:**
- **Line Quest** (existing): teaches parallel, perpendicular, and intersecting lines. QuadQuest assumes that vocabulary and does not re-teach it.
- **MosaicQuest** (Grade 7): teaches line and rotational symmetry of figures. QuadQuest uses symmetry only as an *observed feature* of each special quadrilateral (for example, "a kite has one line of symmetry") and never teaches how to detect symmetry from scratch.
- **EquationQuest** (Grade 7): World 7 here uses one- and two-step linear equations to find unknown angles. It relies on EquationQuest's skill and does not re-teach solving.
- **PatternQuest, ProgressionQuest, RuleQuest, ScrollQuest, NthQuest, RepresentQuest** (Grade 7): no content overlap.

## 3. Standards Alignment

**Source and honest positioning:** the Singapore sources I found do not agree on exactly where "properties of quadrilaterals" sits. One Secondary 1 outline lists "Properties of Quadrilaterals" (parallelograms, rectangles, rhombuses, squares, trapeziums, kites), while a Secondary 2 (G2) outline lists "properties of quadrilaterals and polygons, angle sum, constructions" under Angles, triangles, and polygons. Schools also sequence the chapter differently. Primary 5 already covers parallelogram, rhombus, and trapezium properties and unknown-angle finding, and India's Class 8 chapter "Understanding Quadrilaterals" covers rectangles, squares, parallelograms, rhombuses, kites, and trapeziums. **Conclusion: this is at-level for Grade 8, so no scope-jump flag applies, but the exact chapter placement varies by school and is worth a quick check against your target textbook.**

**What this module adds beyond Primary 5 (so it is a deepening, not a repeat):** kites; properties of **diagonals** (bisect, equal, perpendicular, bisect angles); classifying from a *set* of properties and naming the **most specific** shape; the inclusion hierarchy; stating a **reason** for every step; and algebraic angle expressions.

**In-scope skills (convex quadrilaterals only):**
- Identifying the six special quadrilaterals by defining property, and stating that the angles of any quadrilateral sum to 360°.
- Using angle properties: opposite angles of a parallelogram are equal; adjacent (co-interior) angles of a parallelogram, and the angles between the parallel sides of a trapezium, sum to 180°; a kite has one pair of equal opposite angles; rectangles and squares have four right angles.
- Using side properties: opposite sides of a parallelogram are equal and parallel; a rhombus has four equal sides; a kite has two pairs of equal adjacent sides; computing perimeters.
- Using diagonal properties: which diagonals bisect each other, are equal, are perpendicular, or bisect the angles they pass through.
- Classifying a quadrilateral from a set of given properties, and identifying the most specific name.
- Using the inclusion hierarchy to judge "all / some / no" statements.
- Forming and solving a simple linear equation from algebraic angle or side expressions.
- Multi-step unknown-angle problems with a stated reason for each step.

**Adjacent skills treated as bridge only, not tested:**
- **General polygons** (interior and exterior angle sums for any polygon) — a separate polygon topic.
- **Congruence-based proofs** of quadrilateral properties — belongs to the congruence and similarity topic.
- **Pythagoras-based diagonal lengths and coordinate-geometry verification** — later topics. No question requires a square root.
- **Area formulas** for parallelograms, trapeziums, kites, and rhombuses — a measurement topic.
- **Constructions** (drawing a quadrilateral from given conditions) — out of scope.

**Domain conventions to encode as house style:**
- **Never classify by appearance.** A figure may be marked "not drawn to scale," and only the marks (tick marks for equal sides, arrows for parallel sides, right-angle squares, given angles) count as information.
- **Every unknown-angle answer carries a reason** from a closed list (see the companion TRD), for example "angle sum of a quadrilateral," "opposite angles of a parallelogram," "co-interior angles, AB ∥ DC."
- **"Most specific name"** is the convention for classification questions: a figure with four equal sides and four right angles is a *square*, not merely a rectangle.
- **Definition policy (flagged for confirmation, §15.1):** this PRD takes a trapezium as having **exactly one pair** of parallel sides and a kite as having two pairs of equal adjacent sides that are not all equal. Questions whose answer would flip under the other textbook convention (for example "is a parallelogram a trapezium?" or "is a rhombus a kite?") are **excluded** from the bank rather than graded one way.
- British spelling and terms throughout ("trapezium," never "trapezoid").

## 4. Learning Objectives

By the end of this module, a student should be able to:
1. Identify the six special quadrilaterals by their defining properties and state that a quadrilateral's angles sum to 360°.
2. Find unknown angles using the angle properties of parallelograms, trapeziums, kites, rectangles, and squares, stating a reason for each step.
3. Use side properties to find unknown lengths and perimeters.
4. State and use the diagonal properties of each special quadrilateral.
5. Classify a quadrilateral from a set of given properties and give its most specific name.
6. Use the inclusion hierarchy to decide whether "all / some / no" statements about quadrilaterals are true.
7. Form and solve a simple linear equation to find unknown angles or sides given algebraic expressions.
8. Solve multi-step problems that combine several properties, justifying each step with a reason.

Ordering runs foundational → applied (identify → angle sum → angle properties → side properties → diagonals → classify → hierarchy → algebraic forms → multi-step with reasons), and drives the world sequence in §9.

## 5. Inherited Standards *(Section A of the platform blueprint — copied verbatim, unchanged)*

- **Five-phase architecture:** Wonder → Story → Simulate → Play ("Practice" in-UI) → Reflect.
- **Gamification:** XP per question, 0–3 stars per world, streak tracking, 8 fixed badge triggers (relabelled §10), 10 Boss Battles (5Q/3 lives).
- **Practice modes:** Guided (5Q, hints, untimed), Independent (10Q, no hints), Timed Challenge (8Q, 60s), Boss Battle (5Q, 3 lives).
- **Audio pipeline:** ElevenLabs Alice voice only, 6 emotional presets, pre-generated + dynamic narration, no browser TTS fallback, strict 1:1 narration/on-screen-text parity.
- **Question bank shape:** 10 worlds × 10 questions = 100, procedurally generated, ≥300-run stress test, fixed schema, World 9 (last, 0-indexed) is the mixed-review grand finale.
- **Product standards:** React/Vite/Tailwind/Framer Motion, pixel-faithful `design-tokens.css` reuse, enlarged Simulate/Practice fonts and touch targets, zip delivery with placeholder story art + art-brief README.
- **Simulate phase:** the standard 4 required, archetype-mapped stations.

## 6. Enhancement Requests / Special Instructions

None supplied. Defaults applied: 4-panel Story (justified §8.2), Singaporean-multicultural naming (§7), theme-specific mascot override with rationale (§7), and the standard 4-station Simulate design (§8.3). The Concept Discovery Lab confirmation-question tension is not re-resolved here (§15.4).

## 7. Module Identity

- **Module name:** **QuadQuest**
- **Story theme:** a wildlife-ranger academy. Each world is a habitat, each quadrilateral a "species," and the throughline is "a field-guide entry is only valid if you checked the features — sides, angles, diagonals — not just how the animal looks from the jeep." The species-and-family-tree framing makes the inclusion hierarchy intuitive: a square is still a rectangle, just as a Labrador is still a dog.
- **Named characters** (Singaporean-multicultural convention, first names only, distinct from the sixteen characters in the eight earlier modules):
  - **Hui Min** — names a shape by how it looks, then has to be talked into checking.
  - **Sanjay** — measures the diagonals before naming anything.
- **Mascot: Gigi the Giraffe 🦒** *(override, with rationale)* — a giraffe is the savanna's lookout, seeing the whole landscape at once, which suits "step back and check the features," and is distinct from every mascot used in the earlier modules.

## 8. Five-Phase Journey Detail

### 8.1 Wonder
Single hook screen: *"A new enclosure sign says 'RECTANGLE' because the builder checked that opposite sides are equal. A ranger isn't convinced. One more measurement would settle it — which one?"* (Answer to be discovered: the diagonals.)

### 8.2 Story — 4 panels (default, not exceeded)

| # | Title | Concept delivered | Narrative beat |
|---|---|---|---|
| 1 | A Strange Sighting | Hook: four-sided creatures that look alike from a distance | Hui Min and Sanjay join the academy and are asked to write their first field-guide entry. |
| 2 | Check the Features | The three feature groups: sides, angles, diagonals; why "looks like" fails | Gigi the Giraffe shows a very thin rhombus that looks nothing like a square, yet has perpendicular diagonals. |
| 3 | The Family Tree | The inclusion hierarchy and "most specific name" | Gigi shows how a square inherits every trait of a rectangle and a rhombus, so it belongs on both branches. |
| 4 | Filed in the Field Guide | Worked application: classify from measurements, find an unknown angle with a reason, file the entry | The pair completes the entry, giving a reason for every step, and the academy approves it. |

### 8.3 Simulate — 4 stations (archetype-mapped)
Summary (full technical spec in the companion TRD):

| Station | Archetype | Premise |
|---|---|---|
| The Shape Shifter Lab | Concept Discovery Lab | Student drags sliders that reshape a quadrilateral built from its two diagonals; a live property panel shows which sides, angles, and diagonal facts currently hold, and the shape's species name updates automatically — builds felt intuition for how specific properties turn one species into another. |
| Build to Spec | Build-to-Target Challenge | A spec card lists required properties (for example, "diagonals equal and bisecting each other, no four equal sides"); the student shapes a quadrilateral to meet it, with a live checklist and a "try another spec" loop. |
| File the Entry | Multi-Step/Composite Construction | Given a mystery shape's measurements, the student (1) marks which properties are confirmed, (2) names the most specific species, (3) finds an unknown angle with a stated reason, and (4) places it on the family tree — combining LOs 2, 4, 5, 6, and 8. |
| The Mislabelled Exhibit | Error-Detective | A fellow ranger's field-guide entry contains one seeded mistake (for example, "a rhombus has equal diagonals," "a kite has two pairs of parallel sides," a wrong reason on an angle step, or a classification made by looks); the student finds and fixes it. |

### 8.4 Play / Practice
Standard, unchanged mechanics (10 worlds × 10 questions, 4 modes). See world table in §9.

### 8.5 Reflect
3 new recap questions targeting the module's headline misconceptions: **classifying by appearance (including "a square is only a square")**, **mixing up diagonal properties (equal vs. bisecting vs. perpendicular)**, and **treating adjacent angles of a parallelogram as equal**. Followed by the standard scorecard and a reflection prompt ("Which species were you most tempted to name by looks, and what feature settled it?").

## 9. World & Question Bank Table

*Shape: `{ id, name, emoji, accent, description, conceptFocus, boss: { name, emoji, reward } }`. World 9 (last) is the mixed-review grand finale per platform standard.*

| id | World | conceptFocus | Description | Boss | Reward |
|---|---|---|---|---|---|
| 0 | Meet the Species | `identify-special-quadrilaterals` | Identify the six special quadrilaterals by defining property | The Look-Alike Lurker 🦎 | Spotter Badge |
| 1 | Four Corners | `angle-sum-quadrilateral` | Use the 360° angle sum to find a missing angle | The Four-Corner Croc 🐊 | Corner Badge |
| 2 | Parallel Pairs | `angle-properties-parallel` | Angle properties of parallelograms, trapeziums, kites | The Parallel Python 🐍 | Parallel Badge |
| 3 | Side by Side | `side-properties-perimeter` | Side properties; unknown lengths and perimeters | The Side-Swapping Baboon 🐒 | Sides Badge |
| 4 | Cross Paths | `diagonal-properties` | Diagonal properties of each special quadrilateral | The Crossing Cheetah 🐆 | Diagonal Badge |
| 5 | Name That Shape | `classify-from-properties` | Classify from given properties; most specific name | The Name-Game Parrot 🦜 | Namer Badge |
| 6 | The Family Tree | `hierarchy-inclusion` | All / some / no statements using the hierarchy | The Family-Tree Elephant 🐘 | Lineage Badge |
| 7 | X Marks the Angle | `algebraic-angles-and-sides` | Form and solve equations from algebraic angle/side expressions | The Mystery-X Monkey 🐵 | Solver Badge |
| 8 | Give Your Reasons | `multi-step-with-reasons` | Multi-step angle problems with a reason for each step | The Reasons Rhino 🦏 | Reasoner Badge |
| 9 | The Grand Field Guide | `mixed-review` | Mixed review of every concept above; hardest boss | The Chief Park Warden 🏞️ | Field Guide Champion Trophy |

**Sample questions (illustrative, not the full 100):**

- **World 0:** *"A quadrilateral has exactly one pair of parallel sides. Which is it?"* → trapezium ✓ (distractors: parallelogram, kite, rhombus)
- **World 1:** *"Three angles of a quadrilateral are 80°, 100°, and 90°. Find the fourth."* → `90°` ✓ (distractor `270°`, giving the sum instead of the remainder)
- **World 2:** *"ABCD is a parallelogram with angle A = 68°. Find angle B."* → `112°` ✓ (headline distractor `68°`, treating adjacent angles as equal)
- **World 3:** *"A rhombus has a perimeter of 36 cm. Find the length of each side."* → `9 cm` ✓ (distractor `18 cm`)
- **World 4:** *"The diagonals of rectangle PQRS meet at X. PR = 18 cm. Find QX."* → `9 cm` ✓ (diagonals are equal and bisect each other; distractor `18 cm`, forgetting they bisect)
- **World 5:** *"A quadrilateral's diagonals bisect each other and are equal. Nothing else is known. What is its most specific name?"* → rectangle ✓ (distractors: parallelogram is true but less specific; square is over-specific)
- **World 6:** *"True or false: every square is a rectangle."* → True ✓ (headline distractor: False, "a square is only a square")
- **World 7:** *"In parallelogram ABCD, angle A = (2x + 10)° and angle B = (3x − 5)°. Find x."* → `35` ✓ (headline distractor `15`, setting adjacent angles equal)
- **World 8:** *"In rhombus ABCD, angle ABC = 70°, and the diagonals meet at P. Find angle PAB, with a reason for each step."* → `55°` ✓ (angle BAD = 110° by co-interior angles; AC bisects it)
- **World 9:** mixed-type item combining a diagonal-property classification (World 5) with an algebraic angle step (World 7).

## 10. Gamification — Badge Renames

| Fixed trigger | Badge name |
|---|---|
| First correct answer | First Sighting 🔭 |
| 5-answer streak | Sharp Eyes 👀 |
| 10-answer streak | Tracker's Streak 🔥 |
| All 4 Simulate stations complete | Full Ranger Kit 🧰 |
| Any world scores 3 stars | Habitat Mastered ⭐⭐⭐ |
| Any Boss Battle won | Wild Card Tamed 🏅 |
| 20+ questions answered in Practice | Seasoned Ranger 🧭 |
| Full 5-phase journey complete | Chief Ranger Badge 🏆 |

## 11. Audio & Narration Content Rules

- Vertex labels are always spoken letter by letter ("A, B, C, D"), never as a word. `∠ABC` is "angle A, B, C."
- `∥` is spoken "is parallel to," `⊥` "is perpendicular to," and `°` "degrees."
- Marks are narrated explicitly ("sides A B and D C are marked equal").
- "Co-interior angles," "bisect," and "perpendicular" are each explained in plain language on first use per world.
- Always "trapezium," never "trapezoid."
- Diagonal facts are always narrated with all three words kept distinct ("equal," "bisect each other," "perpendicular"); the narration never says "the diagonals are the same" or other loose wording that blurs them.
- A reason step is always narrated as "because" plus the stated reason, never skipped.

## 12. Accessibility

Standard enlarged fonts/touch targets in Simulate and Practice, calibrated toward the platform's Secondary sizing precedent. Every figure carries a text description of its marks ("A B is parallel to D C; angle A is 68 degrees") so no information is conveyed by drawing alone, and figures flagged "not drawn to scale" say so in text. Right-angle marks, equal-side ticks, and parallel arrows are never colour-only. The Shape Shifter Lab's sliders require keyboard-operable +/− equivalents.

## 13. Assets Required

4 story images at the reference's standard placeholder dimensions, delivered as blank CSS-framed placeholders, with an art-brief README describing each panel:
1. The ranger academy gate and a savanna overlook, Hui Min and Sanjay arriving as strange four-sided shapes appear in the distance.
2. Gigi the Giraffe at a field-guide table, comparing a thin rhombus with a square.
3. A large family-tree board showing the quadrilateral species and their branches.
4. The completed field-guide entry being stamped "approved."

## 14. Success Metrics / Acceptance Criteria

Standard fixed criteria (question-bank stress test, audio parity, clean build, full-journey walkthrough) plus module-specific:
- Every property claim in the bank (including every false claim used as a distractor or Error-Detective mistake) agrees with a property table *computed from geometry*, not typed in by hand.
- Every unknown-angle or unknown-length answer is the same whether derived by the stated rule chain or measured from an independent consistent construction of the same figure.
- Every figure's marks fully determine the asked-for quantity, so no question depends on measuring a not-to-scale drawing.
- No item depends on the exclusive-vs-inclusive trapezium or kite definition (§3, §15.1).
- Algebraic items always give integer *x* and valid angles (each between 0° and 180° and consistent with the shape).
- All 4 Simulate stations are genuinely interactive, not static reveal-and-answer screens.

## 15. Assumptions & Open Questions

1. **Definition policy:** this PRD uses "exactly one pair of parallel sides" for a trapezium and "two pairs of equal adjacent sides, not all equal" for a kite, and excludes questions that would flip under the other convention. Please confirm against your target textbook; if it uses the inclusive definitions, only a small set of hierarchy items changes.
2. **Chapter placement:** Singapore sources disagree on Secondary 1 vs. Secondary 2 (§3). Confirm where your target schools teach it, since that affects how much Primary 5 and Secondary 1 content to assume.
3. **Prerequisites assumed:** parallel and perpendicular vocabulary (Line Quest) and co-interior/alternate angles on parallel lines. If students may not have the latter, the Story's panel 2 would need a short recap.
4. **Concept Discovery Lab tension — not re-resolved here.** The Shape Shifter Lab is naturally free-play, but with no special instruction it defaults to the blueprint's standard archetype (free exploration plus one light confirmation question), consistent with most earlier modules. A single catalogue-wide decision would settle this everywhere.
5. **Character names and mascot** (Hui Min, Sanjay, Gigi the Giraffe) are proposed defaults, not yet stakeholder-approved.
6. **Possible companion module:** general polygons (interior and exterior angle sums) is a natural next topic and is deliberately left out here.
