import {
  View,
  Text,
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './setinput.style';
import Input from '../../common/input/Input';
import { Button } from '../../common/button';
import { ExerciseSet } from '@/src/types';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

interface SetInputProps {
  action?: 'add' | 'update';
  onEndEditing?: (newValue: ExerciseSet) => void;
  initialValue?: ExerciseSet;
}

const SetInput = ({
  action = 'add',
  onEndEditing,
  initialValue,
}: SetInputProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [input, setInput] = useState<ExerciseSet | null>({
    id: uuidv4(),
  });

  if (initialValue) {
    setInput(initialValue);
  }

  const handleEditingEnd = () => {
    if (onEndEditing && input) {
      onEndEditing(input);
    }
  };

  const onHandleSave = () => {
    setIsEditing(false);
  };

  return (
    <View style={styles.container}>
      <View>
        {/* <Text style={styles.labelStyle}>
          {action === 'add' ? 'Add a new set' : 'Editing'}
        </Text> */}
      </View>
      <View style={styles.inputContainer}>
        <Input
          id='weight'
          defaultValue=''
          style={[styles.setInput]}
          placeholder='0'
          keyboardType='numeric'
          value={input?.weight?.toString()}
          onChangeText={(text) => {
            if (!isNaN(parseFloat(text))) {
              setInput((prev) => ({ ...prev, weight: parseFloat(text) }));
            } else if (text === '') {
              setInput((prev) => ({ ...prev, weight: undefined }));
            }
          }}
          onEndEditing={handleEditingEnd}
        />
        <Input
          style={[styles.repInput]}
          placeholder='0'
          defaultValue=''
          keyboardType='decimal-pad'
          inputMode='decimal'
          value={input?.reps?.toString()}
          onChangeText={(text) => {
            if (!isNaN(parseFloat(text))) {
              setInput((prev) => ({ ...prev, reps: parseFloat(text) }));
            } else {
              setInput((prev) => ({ ...prev, reps: undefined }));
            }
          }}
          onEndEditing={handleEditingEnd}
        />
        <Input
          style={[styles.noteInput]}
          placeholder='Your Note'
          multiline
          numberOfLines={4}
          textAlignVertical='top'
          value={input?.note ?? ''}
          onChangeText={(text) => setInput((prev) => ({ ...prev, note: text }))}
          onEndEditing={handleEditingEnd}
        />
      </View>

      {action === 'update' && (
        <View style={styles.actionsContainer}>
          <Button variant='outlined' color='error'>
            Delete
          </Button>
          <Button variant='contained' color='success'>
            Save
          </Button>
        </View>
      )}
    </View>
  );
};

export default SetInput;
