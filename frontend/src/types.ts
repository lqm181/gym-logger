export interface ExerciseSet {
  id?: string;
  weight?: number;
  reps?: number;
  note?: string;
  // created_at?: Date;
}

export interface Exercise {
  id: number;
  name: string;
  description?: string;
}

export interface ExercisePerformed {
  id: string;
  exercise: Exercise;
  exerciseSets: ExerciseSet[];
}
