// src/utils/narration.js
// Narration script builder for QuadQuest (PRD §11 / TRD §8)
// Strictly matches on-screen text 1:1 and adheres to Grade 8 geometric narration rules

export const say       = (text) => ({ text, style: 'statement' });
export const ask       = (text) => ({ text, style: 'question' });
export const cheer     = (text) => ({ text, style: 'celebration' });
export const emphasize = (text) => ({ text, style: 'emphasis' });
export const think     = (text) => ({ text, style: 'thinking' });
export const instruct  = (text) => ({ text, style: 'instruction' });
export const encourage = (text) => ({ text, style: 'encouragement' });

export function wonderNarration() {
  return [
    say("Welcome to QuadQuest at the Savanna Ranger Academy!"),
    say("A new enclosure sign says RECTANGLE because the builder checked that opposite sides are equal."),
    ask("A ranger isn't convinced! It could be a tilted parallelogram. One single measurement would settle it — which one?"),
    cheer("Stop guessing shapes by looks! Let's discover how measuring diagonals reveals the truth!"),
  ];
}

export function storyNarration(panel) {
  const scripts = [
    [
      say("Hui Min and Sanjay arrive at the Savanna Ranger Academy as dawn breaks over the plains."),
      say("Through their binoculars, strange four-sided geometric creatures roam the grasslands."),
      say("Look over there! Hui Min points excitedly. That enclosure sign says RECTANGLE, but from here it looks like a skewed fence!"),
      say("Sanjay grabs his ranger toolkit. At the academy, we never identify a species just by squinting from the jeep. We need to check its sides, angles, and diagonals before writing any field-guide entry!"),
      emphasize("Never classify a species by appearance — inspect its features!"),
    ],
    [
      say("Gigi the Giraffe, the academy's senior lookout, strides over to the field-guide desk with a specimen sketch."),
      say("Rangers, Gigi warns, looks deceive. Behold this creature with four equal sides stretched out very thin!"),
      say("Hui Min thought it was just a diamond kite. But test its diagonals: they cross at exactly ninety degrees and bisect each other!"),
      say("Sanjay checks his notes: Four equal sides and perpendicular bisecting diagonals — that is a true Rhombus!"),
      emphasize("Three vital feature groups: Sides equal and parallel, Angles equal and supplementary, Diagonals bisect, equal, and perpendicular."),
    ],
    [
      say("Gigi points her neck toward the grand Savanna Lineage Board. Quadrilateral species belong to a living family tree."),
      say("Just as a golden retriever is still a dog, every square is still a rectangle and a rhombus!"),
      say("Hui Min gasps. A square inherits opposite sides parallel from the parallelogram branch, four right angles from the rectangle branch, and four equal sides with perpendicular diagonals from the rhombus branch!"),
      emphasize("The inclusion hierarchy: a square earns every title, but its most specific name is Square!"),
    ],
    [
      say("At the observation post, a creature rests against the riverbank. Sanjay measures: opposite sides are parallel, angle A is sixty-eight degrees."),
      say("By co-interior angles between parallel lines, angle B must be one hundred and eighty minus sixty-eight, which is one hundred and twelve degrees!"),
      say("Hui Min records: Confirmed: Parallelogram, with reasoned angle derivation."),
      cheer("Gigi stamps the certificate with the Academy Seal: APPROVED. Ready for the field, Rangers — let the QuadQuest begin!"),
    ],
  ];

  return scripts[panel] || scripts[0];
}

export function simStationIntro(stationIdx) {
  const intros = [
    [
      instruct("Welcome to Station A — The Shape Shifter Lab!"),
      instruct("Drag the diagonal sliders to reshape the quadrilateral. Observe how diagonal lengths, angles, and split ratios transform the species!"),
    ],
    [
      instruct("Welcome to Station B — Build to Spec Challenge!"),
      instruct("Adjust the diagonal sliders until your quadrilateral fulfills all requirements on the mission specification card!"),
    ],
    [
      instruct("Welcome to Station C — File the Field-Guide Entry!"),
      instruct("Inspect the raw measurements of specimen eight-oh-four, verify its features, calculate the missing angle with a reason, and place it on the family tree!"),
    ],
    [
      instruct("Welcome to Station D — The Mislabelled Exhibit!"),
      instruct("A fellow ranger filed an exhibit plaque with a seeded misconception. Tap the erroneous line, and submit the scientifically proven correction!"),
    ],
  ];

  return intros[stationIdx] || intros[0];
}

export function playQuestionNarration(questionText) {
  return [
    ask(questionText)
  ];
}

export function playCorrectNarration(streak = 1) {
  if (streak >= 5) {
    return [cheer("Incredible tracker streak! Your geometric reasoning is unstoppable! 🔥")];
  }
  if (streak >= 3) {
    return [cheer("Spotter badge worthy! Three correct in a row! ⭐")];
  }
  return [cheer("Feature confirmed! That is correct! 🎉")];
}

export function playWrongNarration() {
  return [
    think("Not quite — check the marked sides and angles, review the geometric theorem, and try again! 💡")
  ];
}

export function playHint1Narration() {
  return [
    encourage("Here is your first clue! Inspect the parallel sides and equal side tick marks.")
  ];
}

export function playHint2Narration() {
  return [
    encourage("Here is your second clue! Use the angle sum or diagonal bisection property step by step.")
  ];
}

export function districtCompleteNarration() {
  return [
    cheer("Savanna Habitat Mastered! Outstanding geometric proof work on this district! 🌟")
  ];
}

export function bossStartNarration() {
  return [
    emphasize("The Habitat Boss approaches! Prove your quadrilateral knowledge to earn the World Badge!")
  ];
}

export function bossWinNarration() {
  return [
    cheer("Victory! You outwitted the habitat boss and earned the Savanna Badge! 🏅")
  ];
}

export function reflectNarration() {
  return [
    say("Welcome to the Ranger Debrief! Let's review the headline misconceptions and check your scorecard! 📓")
  ];
}

export function reflectCompleteNarration() {
  return [
    cheer("Outstanding! You have mastered sides, angles, diagonals, and the inclusion hierarchy! You are a true Chief Ranger! 🏆")
  ];
}
