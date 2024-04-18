import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { AddExerciseButton } from '@/src/components';
import { COLORS, FONTWEIGHT, SIZES } from '@/src/constants';
import { FlashList } from '@shopify/flash-list';
import { ExercisePerformed } from '@/src/types';
import ExerciseCard from '@/src/components/exercise/card/ExerciseCard';
import { MenuProvider } from 'react-native-popup-menu';
import { Ionicons } from '@expo/vector-icons';
import { useHeaderHeight } from '@react-navigation/elements';
import { useAppSelector } from '@/src/state/store';
import { selectWorkoutExercises } from '@/src/state/selectors';

const LogDetailScreen = () => {
  const router = useRouter();
  const headerHeight = useHeaderHeight();

  const { title, workoutId } = useLocalSearchParams<{
    title: string;
    workoutId: string;
  }>();

  const id = Number(workoutId);
  const performedExercises = useAppSelector((state) =>
    selectWorkoutExercises(state, id)
  );

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerLeft: (props) => (
            <TouchableOpacity
              {...props}
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: -20,
              }}
              onPress={() => router.back()}
            >
              <Ionicons
                name='chevron-back-outline'
                size={20}
                color={COLORS.primary}
              />
              <Text
                style={{
                  fontSize: SIZES.medium,
                  color: COLORS.primary,
                }}
              >
                Back
              </Text>
            </TouchableOpacity>
          ),
          headerRight: (props) => (
            <View
              style={{
                marginRight: -16,
                paddingRight: 8,
              }}
            >
              <AddExerciseButton workoutId={id} />
            </View>
          ),
        }}
      />
      <MenuProvider>
        <ScrollView
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            backgroundColor: COLORS.lightWhite,
          }}
        >
          <View
            style={{
              paddingHorizontal: 8,
              paddingTop: headerHeight,
              paddingBottom: 24,
            }}
          >
            <Text
              style={{
                fontSize: SIZES.xxLarge,
                fontWeight: FONTWEIGHT.bold,
                marginBottom: 12,
              }}
            >
              {title}
            </Text>
            {performedExercises && performedExercises.length > 0 ? (
              <View style={{ paddingHorizontal: 4, minHeight: 10 }}>
                <FlashList
                  data={performedExercises}
                  renderItem={({
                    item,
                    index,
                  }: {
                    item: ExercisePerformed;
                    index: number;
                  }) => (
                    <View style={[index != 0 && { marginTop: 24 }]}>
                      <ExerciseCard data={item} />
                    </View>
                  )}
                  estimatedItemSize={10}
                />
              </View>
            ) : (
              <View
                style={{
                  display: 'flex',
                  flex: 1,
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 12,
                }}
              >
                <Text
                  style={{
                    fontSize: SIZES.medium,
                    color: COLORS.gray,
                    fontWeight: FONTWEIGHT.semibold,
                  }}
                >
                  Get started with an exercise.
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </MenuProvider>
    </View>
  );
};

export default LogDetailScreen;
