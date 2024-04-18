export interface ExerciseSet {
  id?: string | number;
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
  id: string | number;
  exercise: Exercise;
  exerciseSets: ExerciseSet[];
}

export interface Workout {
  id: number | string;
  title: string;
  performedExercises: ExercisePerformed[];
  created_at?: Date;
}

export interface NormalizedWorkout
  extends Pick<Workout, 'id' | 'title' | 'created_at'> {
  performedExerciseIds: (string | number)[];
}

export interface WorkoutState {
  allIds: (number | string)[];
  byIds: { [id: string | number]: NormalizedWorkout };
}

export interface ExercisePerformedState {
  allIds: (number | string)[];
  byIds: { [id: string | number]: ExercisePerformed };
}

export interface User {
  id: string | number;
  email: string;
  firstName: string;
  lastName: string;
  img_url?: string;
  weight_unit?: 'kg' | 'lbs';
}
