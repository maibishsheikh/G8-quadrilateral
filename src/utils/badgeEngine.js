// src/utils/badgeEngine.js
// Badge definitions and unlock triggers for QuadQuest (PRD §10 / TRD §7)

export const BADGES = [
  { id: 'first_sighting',    icon: '🔭', label: 'First Sighting',     description: 'Identified your very first quadrilateral correctly!' },
  { id: 'sharp_eyes',        icon: '👀', label: 'Sharp Eyes',         description: 'Achieved a streak of 5 correct answers!' },
  { id: 'trackers_streak',   icon: '🔥', label: "Tracker's Streak",   description: 'Achieved a streak of 10 correct answers!' },
  { id: 'full_ranger_kit',   icon: '🧰', label: 'Full Ranger Kit',    description: 'Completed all 4 interactive simulation labs!' },
  { id: 'habitat_mastered',  icon: '⭐', label: 'Habitat Mastered',   description: 'Scored 3 stars in a savanna Practice World!' },
  { id: 'wild_card_tamed',   icon: '🏅', label: 'Wild Card Tamed',    description: 'Defeated a World Boss in battle!' },
  { id: 'seasoned_ranger',   icon: '🧭', label: 'Seasoned Ranger',    description: 'Answered over 20 questions in Practice!' },
  { id: 'chief_ranger',      icon: '🏆', label: 'Chief Ranger Badge', description: 'Completed the full 5-phase QuadQuest journey!' },
];

export function checkBadges(state) {
  const unlocked = [];

  // First correct answer
  const totalCorrect = state.districtCorrect?.reduce((s, c) => s + (c || 0), 0) || 0;
  if (totalCorrect >= 1) unlocked.push('first_sighting');

  // Streak checks
  if (state.maxStreak >= 5) unlocked.push('sharp_eyes');
  if (state.maxStreak >= 10) unlocked.push('trackers_streak');

  // Simulation completion
  if (state.simStationsComplete && state.simStationsComplete.every(Boolean)) {
    unlocked.push('full_ranger_kit');
  }

  // 3-star district check (>= 9 out of 10)
  if (state.districtScores && state.districtScores.some(score => score !== null && score >= 9)) {
    unlocked.push('habitat_mastered');
  }

  // Centurion (20+ answered)
  if (state.currentQuestion >= 20 || totalCorrect >= 20) {
    unlocked.push('seasoned_ranger');
  }

  // Boss slayer
  if (state.bossDefeated) {
    unlocked.push('wild_card_tamed');
  }

  // Full journey
  if (state.phaseComplete && Object.values(state.phaseComplete).every(Boolean)) {
    unlocked.push('chief_ranger');
  }

  return unlocked;
}

export default BADGES;
