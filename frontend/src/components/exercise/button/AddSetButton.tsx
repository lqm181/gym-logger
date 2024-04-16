import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { Button } from '../../common/button';
import AddSetModal from '../modal/AddSetModal';

interface AddSetButtonProps {
  performedExerciseId: number | string;
}

const AddSetButton = ({ performedExerciseId }: AddSetButtonProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
      }}
    >
      <Button
        variant='contained'
        style={{ width: '100%', backgroundColor: 'lightgray', height: 40 }}
        textProps={{ color: 'black' }}
        onPress={() => {
          setIsVisible(true);
        }}
      >
        Add new Set
      </Button>
      <AddSetModal
        isVisible={isVisible}
        onCloseModal={() => {
          setIsVisible(false);
        }}
        performedExerciseId={performedExerciseId}
      />
    </View>
  );
};

export default AddSetButton;
