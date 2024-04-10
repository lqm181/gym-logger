import { View, Text, Modal, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import styles from './exercise.style';
import { Select } from '../../common/select';
import { Button } from '../../common/button';
import { BACKEND_API_URL, COLORS } from '@/src/constants';
import SetInput from '../input/SetInput';
import useDataFetcher from '@/src/hooks/useDataFetcher';
import { Exercise, ExerciseSet } from '@/src/types';

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
  onCloseModal: () => void;
}

const AddExerciseModal = ({
  isVisible,
  onCloseModal,
}: AddExerciseModalProps) => {
  const [newSet, setNewSet] = useState<ExerciseSet | null>();
  const [newExercise, setNewExercise] = useState<Exercise | null>();

  const { data, isLoading, error, fetchData } = useDataFetcher();

  const handleAddExercise = async () => {
    // TODO: Contact backend API to save the exercise
    // TODO: Add methods for adding the new exercise to workout list
    // TODO: Provide the workout Id
    const workoutId = 9;

    if (!newExercise) {
      Alert.alert('Error', 'Please chose your exercise.');
    } else if (
      !newSet ||
      newSet?.weight == null ||
      newSet?.weight == undefined ||
      newSet?.reps == undefined ||
      newSet?.reps == null
    ) {
      Alert.alert('Error', 'Please enter the weight and reps of your set.');
    } else {
      await fetchData(
        `${BACKEND_API_URL}/performed-exercises/workouts/${workoutId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: {
            exercise: {
              id: newExercise?.id,
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
      setNewExercise(null);
      setNewSet(null);
      onCloseModal();
    }
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
          <Text style={styles.title}>Start A New Exercise</Text>

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
          <View>
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
                {isLoading ? 'Saving...' : 'Save'}
              </Button>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddExerciseModal;
