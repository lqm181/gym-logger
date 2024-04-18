import { View, Text } from 'react-native';
import React from 'react';
import { ExercisePerformed } from '@/src/types';
import styles from './exerciseCard.style';
import { getTotalVolume } from '@/src/utils/exerciseUtils';
import AddSetButton from '../button/AddSetButton';
import SetRow from './SetRow';

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
          {data.exerciseSets.map((exerciseSet, index) => (
            <SetRow
              key={index}
              index={index}
              exerciseSet={exerciseSet}
              exerciseId={data.id}
            />
          ))}
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
