import { View } from 'react-native';
import React, { useState } from 'react';
import { Button } from '../../common/button';
import AddExerciseModal from '../modal/AddExerciseModal';
import { FONTWEIGHT, SIZES } from '@/src/constants';

const AddExerciseButton = ({ workoutId }: { workoutId: string | number }) => {
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
          fontWeight: FONTWEIGHT.regular,
        }}
        onPress={handleAddNewExercise}
      >
        Add Exercise
      </Button>

      <AddExerciseModal
        isVisible={isModalVisible}
        onCloseModal={() => setIsModalVisible(false)}
        workoutId={workoutId}
      />
    </View>
  );
};

export default AddExerciseButton;
