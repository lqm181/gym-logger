import { View } from 'react-native';
import React, { useState } from 'react';
import { Button } from '../../common/button';
import AddExerciseModal from '../modal/AddExerciseModal';
import { SIZES } from '@/src/constants';

const AddExerciseButton = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleAddNewExercise = () => {
    setIsModalVisible(true);
  };

  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Button
        style={{
          width: 'auto',
          minWidth: 0,
          paddingHorizontal: 0,
          borderWidth: 0,
          backgroundColor: 'transparent',
        }}
        variant='outlined'
        color='primary'
        textProps={{
          fontSize: SIZES.medium,
        }}
        onPress={handleAddNewExercise}
      >
        Add
      </Button>

      <AddExerciseModal
        isVisible={isModalVisible}
        onCloseModal={() => setIsModalVisible(false)}
      />
    </View>
  );
};

export default AddExerciseButton;
