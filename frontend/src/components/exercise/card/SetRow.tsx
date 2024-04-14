import { View, Text } from 'react-native';
import React, { useState } from 'react';
import styles from './exerciseCard.style';
import { ExerciseSet } from '@/src/types';
import PopoverMenu from '../../common/menu/PopoverMenu';
import { Ionicons } from '@expo/vector-icons';
import EditSetModal from '../modal/EditSetModal';
import DeleteSetConfirmModal from '../modal/DeleteSetConfirmModal';

interface SetRowProps {
  index: number;
  exerciseSet: ExerciseSet;
  exerciseId: string | number;
}

const SetRow = ({ index, exerciseSet, exerciseId }: SetRowProps) => {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  return (
    <View style={styles.tableRow}>
      <Text style={[styles.tableCell, styles.smallCell]}>{index + 1}</Text>
      <Text style={[styles.tableCell, styles.mediumCell]}>
        {exerciseSet.weight}
      </Text>
      <Text style={[styles.tableCell, styles.mediumCell]}>
        {exerciseSet.reps}
      </Text>
      <Text style={[styles.tableCell, styles.largeCell]}>
        {exerciseSet.note}
      </Text>
      <View style={[styles.tableAction]}>
        <PopoverMenu
          options={[
            {
              name: 'Edit',
              icon: <Ionicons name='pencil' size={20} color='black' />,
              onPress: () => setIsEditModalVisible(true),
            },
            {
              name: <Text style={{ color: 'red' }}>Delete</Text>,
              icon: <Ionicons name='trash-outline' size={20} color='red' />,
              onPress: () => setIsDeleteModalVisible(true),
            },
          ]}
        />
      </View>

      <EditSetModal
        isVisible={isEditModalVisible}
        onCloseModal={() => setIsEditModalVisible(false)}
        initialValue={exerciseSet}
        exerciseId={exerciseId}
      />
      {exerciseSet.id != null && exerciseSet.id !== undefined && (
        <DeleteSetConfirmModal
          isVisible={isDeleteModalVisible}
          exerciseSetId={exerciseSet.id}
          onCloseModal={() => setIsDeleteModalVisible(false)}
        />
      )}
    </View>
  );
};

export default SetRow;
