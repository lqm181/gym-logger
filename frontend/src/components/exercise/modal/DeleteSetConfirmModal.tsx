import { View, Text, Modal, Alert } from 'react-native';
import React from 'react';
import styles from './exercise.style';
import { Button } from '../../common/button';
import { BACKEND_API_URL, SIZES } from '@/src/constants';
import { useAppDispatch } from '@/src/state/store';
import { deleteSet } from '@/src/state/performedExerciseSlice';
import { useSession } from '@/src/providers/SessionProvider';
import useJwtFetcher from '@/src/hooks/useJwtFetcher';

interface DeleteSetConfirmModalProps {
  isVisible: boolean;
  onCloseModal: () => void;
  exerciseSetId: string | number;
  exerciseId: string | number;
}

const DeleteSetConfirmModal = ({
  isVisible,
  onCloseModal,
  exerciseSetId,
  exerciseId,
}: DeleteSetConfirmModalProps) => {
  const dispatch = useAppDispatch();
  const { session } = useSession();
  const { isLoading, error, securedFetch } = useJwtFetcher();

  const handleDeleteSet = async () => {
    if (!session) {
      Alert.alert(
        'Error',
        'Please check your internet connection or login again to continue.'
      );
      return;
    }
    await securedFetch(
      `${BACKEND_API_URL}/exercise-sets/${exerciseSetId}`,
      session.token,
      {
        method: 'DELETE',
      }
    );

    dispatch(deleteSet({ exerciseId, setId: exerciseSetId }));
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
