import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { Button } from '../../common/button';
import AddExerciseModal from '../modal/AddExerciseModal';

const AddExerciseButton = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleAddNewExercise = () => {
    // setIsAdding(true);
    setIsModalVisible(true);
  };

  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 12,
      }}
    >
      {!isAdding && (
        <Button
          style={{ width: '100%' }}
          variant='contained'
          color='primary'
          onPress={handleAddNewExercise}
        >
          Add New Exercise
        </Button>
      )}

      <AddExerciseModal
        isVisible={isModalVisible}
        onCloseModal={() => setIsModalVisible(false)}
      />
    </View>
  );
};

export default AddExerciseButton;
