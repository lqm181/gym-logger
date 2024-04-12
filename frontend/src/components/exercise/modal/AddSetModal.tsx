import { View, Text, Modal, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import styles from './exercise.style';
import { Button } from '../../common/button';
import { BACKEND_API_URL } from '@/src/constants';
import SetInput from '../input/SetInput';
import useDataFetcher from '@/src/hooks/useDataFetcher';
import { ExerciseSet } from '@/src/types';

interface AddSetModalProps {
  isVisible: boolean;
  onCloseModal: () => void;
  performedExerciseId: string | number;
}

const AddSetModal = ({
  isVisible,
  onCloseModal,
  performedExerciseId,
}: AddSetModalProps) => {
  const [newSet, setNewSet] = useState<ExerciseSet | null>();
  const { data, isLoading, error, fetchData } = useDataFetcher();

  const handleAddNewSet = async () => {
    // TODO: Add methods for adding the new set to the corresponding set list

    if (
      !newSet ||
      newSet?.weight == null ||
      newSet?.weight == undefined ||
      newSet?.reps == undefined ||
      newSet?.reps == null
    ) {
      Alert.alert('Error', 'Please enter the weight and reps of your set.');
    } else {
      await fetchData(
        `${BACKEND_API_URL}/exercise-sets/performed-exercises/${performedExerciseId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: {
            weight: newSet.weight ?? 0,
            reps: newSet.reps ?? 0,
            note: newSet.note ?? null,
            created_at: new Date(),
          },
        }
      );

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
          <Text style={styles.title}>Add a new set</Text>

          {/* Content */}
          <ScrollView automaticallyAdjustKeyboardInsets>
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
                onPress={handleAddNewSet}
              >
                {isLoading ? 'Adding...' : 'Add'}
              </Button>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddSetModal;
