export interface Question {
  id: string;
  text: string;
  options: { id: string; text: string }[];
}

export interface QuizData {
  answers: Record<string, string>;
  personality: string;
  modifiers: string[];
}

export interface AppState {
  step: 'landing' | 'quiz' | 'generation' | 'stories';
  quizData: QuizData | null;
}

