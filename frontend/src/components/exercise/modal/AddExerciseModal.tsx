import { View, Text, Modal, ScrollView } from 'react-native';
import React, { useState } from 'react';
import styles from '../exercise.style';
import { useRouter } from 'expo-router';
import { Select } from '../../common/select';
import { Button } from '../../common/button';
import { COLORS } from '@/src/constants';
import SetInput from '../input/SetInput';

const options = [
  { label: 'Bench Press', value: 'Bench Press' },
  { label: 'Bicep Curl', value: 'Bicep Curl' },
  { label: 'Deadlift', value: 'Deadlift' },
  { label: 'Lat Pulldown', value: 'Lat Pulldown' },
  { label: 'Lateral Raise', value: 'Lateral Raise' },
  { label: 'Pullup', value: 'Pullup' },
];

interface AddExerciseModalProps {
  isVisible: boolean;
  onCloseModal: () => void;
}

const AddExerciseModal = ({
  isVisible,
  onCloseModal,
}: AddExerciseModalProps) => {
  const [currentSet, setCurrentSet] = useState(null);
  const [newExercise, setNewExercise] = useState({
    name: undefined,
    numReps: undefined,
    weight: undefined,
    note: undefined,
  });
  const [isAdding, setIsAdding] = useState(false);

  const handleAddExercise = async () => {
    setIsAdding(true);

    // TODO: Contact backend API to save the acercise
    console.log('Adding..');
    await new Promise((r) => setTimeout(r, 3000));
    console.log('Added');
    setIsAdding(false);
    onCloseModal();
  };

  const closeModal = () => {
    setCurrentSet(null);

    onCloseModal();
  };

  return (
    <Modal animationType='slide' transparent={true} visible={isVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalContainer}>
          {/* Title */}
          <Text style={styles.title}>Add a new exercise</Text>

          {/* Content */}
          <ScrollView>
            <Select
              selectContainerStyle={{
                marginTop: 4,
                marginBottom: 32,
              }}
              data={options}
              value={newExercise.name}
              labelField='label'
              valueField='value'
              onChange={(item) => {
                setNewExercise((prev) => ({ ...prev, name: item.value }));
              }}
              placeholder='Select an exercise'
              selectLabel='Your exercise'
              search
              searchPlaceholder='Search...'
              showsVerticalScrollIndicator
              containerStyle={{
                backgroundColor: COLORS.lightWhite,
                borderRadius: 8,
              }}
            />
            <SetInput />
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
                disabled={isAdding}
                onPress={handleAddExercise}
                style={{ width: 'auto' }}
              >
                {isAdding ? 'Adding...' : 'Save'}
              </Button>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddExerciseModal;
