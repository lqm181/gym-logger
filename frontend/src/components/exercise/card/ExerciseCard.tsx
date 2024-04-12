import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { ExercisePerformed } from '@/src/types';
import styles from './exerciseCard.style';
import { getTotalVolume } from '@/src/utils/exerciseUtils';
import { Ionicons } from '@expo/vector-icons';
import PopoverMenu from '../../common/menu/PopoverMenu';
import AddSetButton from '../button/AddSetButton';
import EditSetModal from '../modal/EditSetModal';
import DeleteSetConfirmModal from '../modal/DeleteSetConfirmModal';

interface ExerciseCardProps {
  data: ExercisePerformed;
}

const ExerciseCard = ({ data }: ExerciseCardProps) => {
  console.log(undefined == undefined);

  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.cardTitle}>{data.exercise.name}</Text>
          <Text style={styles.totalVolumne}>
            Total volumne: {getTotalVolume(data)}
          </Text>
        </View>
        <View></View>
      </View>

      {/* Card Content */}
      {data.exerciseSets.length <= 0 ? (
        <Text>You have not started any set for this exercise.</Text>
      ) : (
        <View style={styles.tableContainer}>
          <View style={styles.tableRow}>
            <Text style={[styles.tableHeader, styles.smallCell]}>Set</Text>
            <Text style={[styles.tableHeader, styles.mediumCell]}>Weight</Text>
            <Text style={[styles.tableHeader, styles.mediumCell]}>Rep</Text>
            <Text style={[styles.tableHeader, styles.largeCell]}>Note</Text>
            <Text style={[styles.tableAction]}></Text>
          </View>
          {data.exerciseSets.map((exerciseSet, index) => {
            const [isEditModalVisible, setIsEditModalVisible] = useState(false);
            const [isDeleteModalVisible, setIsDeleteModalVisible] =
              useState(false);

            return (
              <View key={index} style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.smallCell]}>
                  {index + 1}
                </Text>
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
                        icon: (
                          <Ionicons name='pencil' size={20} color='black' />
                        ),
                        onPress: () => setIsEditModalVisible(true),
                      },
                      {
                        name: <Text style={{ color: 'red' }}>Delete</Text>,
                        icon: (
                          <Ionicons
                            name='trash-outline'
                            size={20}
                            color='red'
                          />
                        ),
                        onPress: () => setIsDeleteModalVisible(true),
                      },
                    ]}
                  />
                </View>

                <EditSetModal
                  isVisible={isEditModalVisible}
                  onCloseModal={() => setIsEditModalVisible(false)}
                  initialValue={exerciseSet}
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
          })}
        </View>
      )}

      {/* Card Action */}
      <View
        style={{
          marginTop: 24,
        }}
      >
        <AddSetButton performedExerciseId={data.id} />
      </View>
    </View>
  );
};

export default ExerciseCard;
