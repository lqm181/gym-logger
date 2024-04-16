import { View, Text, Modal, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import styles from './exercise.style';
import { Select } from '../../common/select';
import { Button } from '../../common/button';
import { BACKEND_API_URL, COLORS } from '@/src/constants';
import SetInput from '../input/SetInput';
import { Exercise, ExercisePerformed, ExerciseSet } from '@/src/types';
import useJwtFetcher from '@/src/hooks/useJwtFetcher';
import { useSession } from '@/src/providers/SessionProvider';
import { useAppDispatch } from '@/src/state/store';
import { addExercises } from '@/src/state/performedExerciseSlice';
import { addExerciseId } from '@/src/state/workoutSlice';

// TODO: Add methods to fetch all options
const options = [
  { name: 'Bench Press', id: 1 },
  { name: 'Bicep Curl', id: 2 },
  { name: 'Deadlift', id: 3 },
  { name: 'Lat Pulldown', id: 4 },
  { name: 'Lateral Raise', id: 5 },
  { name: 'Pullup', id: 6 },
] as Exercise[];

interface AddExerciseModalProps {
  isVisible: boolean;
  workoutId: string | number;
  onCloseModal: () => void;
}

const AddExerciseModal = ({
  isVisible,
  onCloseModal,
  workoutId,
}: AddExerciseModalProps) => {
  const { session } = useSession();
  const dispatch = useAppDispatch();
  const [newSet, setNewSet] = useState<ExerciseSet | null>();
  const [newExercise, setNewExercise] = useState<Exercise | null>();
  const { data, isLoading, error, securedFetch } =
    useJwtFetcher<ExercisePerformed>();

  const handleAddExercise = async () => {
    if (!newExercise) {
      Alert.alert('Error', 'Please chose your exercise.');
      return;
    }
    if (
      !newSet ||
      newSet?.weight == null ||
      newSet?.weight == undefined ||
      newSet?.reps == undefined ||
      newSet?.reps == null
    ) {
      Alert.alert('Error', 'Please enter the weight and reps of your set.');
      return;
    }
    if (!session) {
      Alert.alert(
        'Error',
        'Please check your internet connection or login again to continue'
      );
      return;
    }

    const newData = await securedFetch(
      `${BACKEND_API_URL}/performed-exercises/workouts/${workoutId}`,
      session.token,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          exercise: {
            id: newExercise?.id,
            name: newExercise?.name,
          },
          exerciseSets: [
            {
              weight: newSet.weight ?? 0,
              reps: newSet.reps ?? 0,
              note: newSet.note ?? null,
              created_at: new Date(),
            },
          ],
        },
      }
    );
    console.log(newData);
    if (newData) {
      dispatch(addExercises([newData]));
      dispatch(addExerciseId({ exerciseId: newData.id, workoutId: workoutId }));
    }
    setNewExercise(null);
    setNewSet(null);
    onCloseModal();
  };

  const closeModal = () => {
    setNewSet(null);

    onCloseModal();
  };

  return (
    <Modal animationType='slide' transparent={true} visible={isVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalContainer}>
          {/* Title */}
          <Text style={styles.title}>Add a new exercise</Text>

          {/* Content */}
          <ScrollView automaticallyAdjustKeyboardInsets>
            <Select
              selectContainerStyle={{
                marginBottom: 24,
              }}
              data={options}
              value={newExercise?.id.toString()}
              labelField='name'
              valueField='id'
              onChange={(item) => {
                setNewExercise((prev) => ({
                  ...prev,
                  id: item.id,
                  name: item.name,
                }));
              }}
              placeholder='Select an exercise'
              selectLabel='Exercise Name'
              search
              searchPlaceholder='Search...'
              showsVerticalScrollIndicator
              containerStyle={{
                backgroundColor: COLORS.lightWhite,
                borderRadius: 8,
              }}
            />
            <SetInput onEndEditing={(newValue) => setNewSet(newValue)} />
          </ScrollView>

          {/* Actions */}
          <View style={styles.modelActions}>
            <Button variant='outlined' color='error' onPress={closeModal}>
              Cancel
            </Button>
            <Button
              variant='contained'
              color='primary'
              disabled={isLoading}
              onPress={handleAddExercise}
            >
              {isLoading ? 'Adding...' : 'Add'}
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddExerciseModal;
