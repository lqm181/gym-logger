import { View, Text, Modal, ScrollView, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './exercise.style';
import { Button } from '../../common/button';
import { BACKEND_API_URL, COLORS } from '@/src/constants';
import SetInput from '../input/SetInput';
import { ExerciseSet } from '@/src/types';
import _ from 'lodash';
import { isValidSet } from '@/src/utils/exerciseUtils';
import { useAppDispatch } from '@/src/state/store';
import { updateSet } from '@/src/state/performedExerciseSlice';
import useJwtFetcher from '@/src/hooks/useJwtFetcher';
import { useSession } from '@/src/providers/SessionProvider';

interface EditSetModalProps {
  isVisible: boolean;
  onCloseModal: () => void;
  initialValue: ExerciseSet;
  exerciseId: string | number;
}

const EditSetModal = ({
  isVisible,
  onCloseModal,
  initialValue,
  exerciseId,
}: EditSetModalProps) => {
  const dispatch = useAppDispatch();
  const { session } = useSession();
  const [newSet, setNewSet] = useState<ExerciseSet>(initialValue);
  const [hasChange, setHasChange] = useState(false);
  const { isLoading, error, securedFetch } = useJwtFetcher();

  const handleAddNewSet = async () => {
    if (!isValidSet(newSet)) {
      Alert.alert('Error', 'Please enter valid values for your set.');
    }
    if (!session) {
      Alert.alert(
        'Error',
        'Please check your internet connection or login again to continue.'
      );
      return;
    }
    const updatedSet = (await securedFetch(
      `${BACKEND_API_URL}/exercise-sets/${initialValue.id}`,
      session.token,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          ...newSet,
        },
      }
    )) as ExerciseSet;

    if (updateSet) {
      dispatch(updateSet({ updatedSet: updatedSet, exerciseId: exerciseId }));
    }
    onCloseModal();
  };

  useEffect(() => {
    if (initialValue) {
      setNewSet(initialValue);
    }
  }, [initialValue]);

  useEffect(() => {
    if (newSet && initialValue && _.isEqual(newSet, initialValue)) {
      setHasChange(false);
    } else {
      setHasChange(true);
    }
  }, [newSet]);

  const closeModal = () => {
    setNewSet(initialValue);
    setHasChange(false);
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
            <SetInput
              onEndEditing={(newValue) => setNewSet(newValue)}
              initialValue={initialValue}
            />
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
                disabled={isLoading || !hasChange}
                onPress={handleAddNewSet}
              >
                {isLoading ? 'Updating...' : 'Update'}
              </Button>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EditSetModal;
