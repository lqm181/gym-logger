import { View, Text } from 'react-native';
import React from 'react';
import { ExercisePerformed } from '@/src/types';
import styles from './exerciseCard.style';
import { getTotalVolume } from '@/src/utils/exerciseUtils';
import IconButton from '../../common/IconButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
        <View>
          <IconButton size={24}>
            <MaterialCommunityIcons
              name='dots-horizontal'
              size={24}
              color='gray'
            />
          </IconButton>
        </View>
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
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default ExerciseCard;
