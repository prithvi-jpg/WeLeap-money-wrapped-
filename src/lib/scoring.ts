import { QuizData } from './types';

// Scoring mapping
export function calculateQuizData(answers: Record<string, string>): QuizData {
  let T = 0, L = 0, S = 0, M_vigilance = 0, C = 0;
  
  if (answers.q1 === "A") T += 2;
  else if (answers.q1 === "B") { T += 1; M_vigilance += 1; }
  else if (answers.q1 === "C") { L -= 1; }
  else if (answers.q1 === "D") { T -= 2; L -= 1; }

  if (answers.q2 === "A") L += 2;
  else if (answers.q2 === "B") L += 2;
  else if (answers.q2 === "C") L += 1;
  else if (answers.q2 === "D") { L -= 1; C += 1; }

  if (answers.q3 === "A") S += 2;
  else if (answers.q3 === "B") { S -= 1; M_vigilance += 1; }
  else if (answers.q3 === "C") { S += 2; L += 1; }
  else if (answers.q3 === "D") { S -= 1; L += 2; }

  // Q4 acts manually per spec
  // A: Money Worship/Scarcity
  // B: Money Vigilance/Neutral
  // C: Money Status
  // D: Money Avoidance/Inherited

  if (answers.q5 === "A") { C += 2; T += 2; }
  else if (answers.q5 === "B") { C += 1; }
  else if (answers.q5 === "C") { C -= 2; L += 1; }
  else if (answers.q5 === "D") { C += 2; T += 2; }

  const modifiers: string[] = [];
  if (answers.q5 === "B") modifiers.push("intention_action_gap");
  if (answers.q2 === "B" || answers.q2 === "C") modifiers.push("avoidance");

  // simplified mapped identities based on spec
  // Q6 mostly uses direct mapping, tie breakers exist
  const scores = [
    { dim: 'T', val: T },
    { dim: 'L', val: L },
    { dim: 'S', val: S },
    { dim: 'C', val: C },
  ].sort((a, b) => b.val - a.val);

  let top = scores[0].dim;

  let personality = "THE_ALMOST_INVESTOR";

  if (answers.q4 === "D") {
    personality = "THE_INHERITED_SCRIPT";
  } else if (answers.q5 === "B") {
    personality = "THE_ALMOST_INVESTOR";
  } else if (top === "T" && T > 1) {
    personality = "THE_OPTIMIZER";
  } else if (top === "L" && L > 1) {
    personality = "THE_FORTRESS";
  } else if (top === "S" && S > 1) {
    personality = "THE_SOCIAL_BANKER";
  } else if (answers.q4 === "A") {
    personality = "THE_INVISIBLE_SPENDER";
  } else if (top === "C" && C > 1) {
    personality = "THE_LEAP_OF_FAITH";
  } else {
    personality = "THE_ANALYST";
  }

  return {
    answers,
    personality,
    modifiers
  };
}
