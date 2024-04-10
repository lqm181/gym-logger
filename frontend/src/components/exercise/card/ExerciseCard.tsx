import { View, Text } from 'react-native';
import React from 'react';
import { ExercisePerformed } from '@/src/types';
import styles from './exerciseCard.style';
import { getTotalVolume } from '@/src/utils/exerciseUtils';
import { Ionicons } from '@expo/vector-icons';
import PopoverMenu from '../../common/menu/PopoverMenu';

interface ExerciseCardProps {
  data: ExercisePerformed;
}

const ExerciseCard = ({ data }: ExerciseCardProps) => {
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

      {data.exerciseSets.length <= 0 ? (
        <Text>You have not start any set for this exercise.</Text>
      ) : (
        <View style={styles.tableContainer}>
          <View style={styles.tableRow}>
            <Text style={[styles.tableHeader, styles.smallCell]}>Set</Text>
            <Text style={[styles.tableHeader, styles.mediumCell]}>Weight</Text>
            <Text style={[styles.tableHeader, styles.mediumCell]}>Rep</Text>
            <Text style={[styles.tableHeader, styles.largeCell]}>Note</Text>
            <Text style={[styles.tableHeader, styles.smallCell]}></Text>
          </View>
          {data.exerciseSets.map((exerciseSet, index) => (
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
              <View>
                <PopoverMenu
                  options={[
                    {
                      name: 'Edit',
                      icon: <Ionicons name='pencil' size={20} color='black' />,
                    },
                    {
                      name: <Text style={{ color: 'red' }}>Delete</Text>,
                      icon: (
                        <Ionicons name='trash-outline' size={20} color='red' />
                      ),
                    },
                  ]}
                />
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default ExerciseCard;
