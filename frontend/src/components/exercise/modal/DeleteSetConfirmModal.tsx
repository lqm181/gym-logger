import { View, Text, Modal, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import styles from './exercise.style';
import { Select } from '../../common/select';
import { Button } from '../../common/button';
import { BACKEND_API_URL, COLORS, SIZES } from '@/src/constants';
import SetInput from '../input/SetInput';
import useDataFetcher from '@/src/hooks/useDataFetcher';
import { Exercise, ExerciseSet } from '@/src/types';

interface DeleteSetConfirmModalProps {
  isVisible: boolean;
  onCloseModal: () => void;
  exerciseSetId: string | number;
}

const DeleteSetConfirmModal = ({
  isVisible,
  onCloseModal,
  exerciseSetId,
}: DeleteSetConfirmModalProps) => {
  const { data, isLoading, error, fetchData } = useDataFetcher();

  const handleDeleteSet = async () => {
    // TODO: Add methods for deleting the set from the exercise
    // TODO: Add toast error notfication.
    await fetchData(`${BACKEND_API_URL}/exercise-sets/${exerciseSetId}`, {
      method: 'DELETE',
    });
    onCloseModal();
  };

  const closeModal = () => {
    onCloseModal();
  };

  return (
    <Modal animationType='slide' transparent={true} visible={isVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalContainer}>
          {/* Title */}
          <Text style={styles.title}>Delete Set?</Text>

          <View style={{ marginTop: 4 }}>
            <Text style={{ fontSize: SIZES.medium }}>
              The set will be permanently deleted and cannot be undone.
            </Text>
          </View>

          {/* Actions */}
          <View>
            <View style={styles.modelActions}>
              <Button variant='outlined' color='info' onPress={closeModal}>
                Cancel
              </Button>
              <Button
                variant='contained'
                color='error'
                disabled={isLoading}
                onPress={handleDeleteSet}
              >
                {isLoading ? 'Deleting...' : 'Confirm'}
              </Button>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteSetConfirmModal;
