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

interface SetInputProps {
  action?: 'add' | 'update';
}

const SetInput = ({ action = 'add' }: SetInputProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState({
    weight: '',
    numReps: '',
    note: '',
  });

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
          style={[styles.setInput]}
          placeholder='50'
          keyboardType='numeric'
          value={data.weight}
          onChangeText={(text) =>
            setData((prev) => ({ ...prev, weight: text }))
          }
        />

        <Input
          style={[styles.repInput]}
          placeholder='12'
          keyboardType='decimal-pad'
          inputMode='decimal'
          value={data.numReps}
          onChangeText={(text) =>
            setData((prev) => ({ ...prev, numReps: text }))
          }
        />
        <Input
          style={[styles.noteInput]}
          placeholder='Note'
          multiline
          numberOfLines={4}
          textAlignVertical='top'
          value={data.note}
          onChangeText={(text) => setData((prev) => ({ ...prev, note: text }))}
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
