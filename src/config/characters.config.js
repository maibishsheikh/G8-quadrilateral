// src/config/characters.config.js
// Characters and Mascot for QuadQuest (PRD §7 / TRD §4.2)

export const CHARACTERS = {
  huiMin: {
    name: "Hui Min",
    role: "Names shapes by looks",
    emoji: "👧🏻",
    colour: "var(--char-1)",
    mascotEmoji: "🦒",
    avatar: "👧🏻",
    bio: "Always quick to judge a shape by its appearance, but learning to check the features!"
  },
  sanjay: {
    name: "Sanjay",
    role: "Measures the diagonals first",
    emoji: "🧑🏽",
    colour: "var(--char-2)",
    mascotEmoji: "🦒",
    avatar: "🧑🏽",
    bio: "Meticulous ranger who measures diagonals and sides before giving any shape a name."
  },
  gigi: {
    name: "Gigi the Giraffe",
    role: "Mascot & mentor",
    emoji: "🦒",
    colour: "var(--mascot)",
    mascotEmoji: "🦒",
    avatar: "🦒",
    bio: "The savanna lookout with a bird's-eye view. Sees the whole mathematical landscape!"
  },
};

export const MASCOT = {
  name: "Gigi the Giraffe",
  emoji: "🦒",
  greeting: "Welcome to the Savanna Ranger Academy! Stop guessing by looks and start proving by features!",
};

export default CHARACTERS;
