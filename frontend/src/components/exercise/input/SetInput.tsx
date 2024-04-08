import {
  View,
  Text,
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './setinput.style';
import Input from '../../common/input/Input';
import { Button } from '../../common/button';
import { ExerciseSet } from '@/src/types';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesome6 } from '@expo/vector-icons';

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
      <View style={styles.inputContainer}>
        <View style={styles.containerRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.inputLabel}>Weight</Text>
            <Input
              id='weight'
              variant='outlined'
              defaultValue=''
              placeholder='Weight'
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
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.inputLabel}>Reps</Text>
            <Input
              style={[styles.repInput]}
              placeholder='Reps'
              defaultValue=''
              variant='outlined'
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
          </View>
        </View>

        <View>
          <Text style={[styles.inputLabel]}>Note</Text>
          <Input
            style={[styles.noteInput]}
            placeholder='Note'
            multiline
            variant='outlined'
            numberOfLines={4}
            textAlignVertical='top'
            value={input?.note ?? ''}
            onChangeText={(text) =>
              setInput((prev) => ({ ...prev, note: text }))
            }
            onEndEditing={handleEditingEnd}
          />
        </View>
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
