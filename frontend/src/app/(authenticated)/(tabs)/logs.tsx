import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { router } from 'expo-router';
import useDataFetcher from '@/src/hooks/useDataFetcher';
import { BACKEND_API_URL, COLORS, FONTWEIGHT, SIZES } from '@/src/constants';
import { Ionicons } from '@expo/vector-icons';
import { Button, ListDivider, WorkoutPreview } from '@/src/components';
import { FlashList } from '@shopify/flash-list';
import { Workout } from '@/src/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppSelector } from '@/src/state/store';
import { selectWorkouts } from '@/src/state/selectors';

const LogsScreen = () => {
  // TODO: Change userId
  // TODO: remove all console.logs
  const workouts = useAppSelector((state) => selectWorkouts(state));
  // if (isLoading)
  //   return (
  //     <View
  //       style={{
  //         display: 'flex',
  //         flexDirection: 'column',
  //         justifyContent: 'center',
  //         alignItems: 'center',
  //         flex: 1,
  //       }}
  //     >
  //       <ActivityIndicator />
  //       <Text>Loading Your Workouts...</Text>
  //     </View>
  //   );

  // if (error)
  //   return (
  //     <View
  //       style={{
  //         display: 'flex',
  //         flexDirection: 'column',
  //         alignItems: 'center',
  //         justifyContent: 'center',
  //         paddingBottom: 32,
  //         flex: 1,
  //       }}
  //     >
  //       <View
  //         style={{
  //           display: 'flex',
  //           flexDirection: 'column',
  //           justifyContent: 'center',
  //           alignItems: 'center',
  //           marginBottom: 60,
  //         }}
  //       >
  //         <Ionicons name='alert-circle-outline' size={72} color={COLORS.gray} />
  //         <Text
  //           style={{
  //             fontSize: SIZES.large,
  //             color: COLORS.gray,
  //             marginTop: 12,
  //           }}
  //         >
  //           Somehting went wrong.
  //         </Text>
  //         <Text
  //           style={{
  //             fontSize: SIZES.large,
  //             color: COLORS.gray,
  //             marginTop: 6,
  //           }}
  //         >
  //           Unable to load your workout history.
  //         </Text>
  //       </View>

  //       <Button
  //         style={{ width: 'auto', height: 40 }}
  //         color='info'
  //         onPress={() => {
  //           router.replace('/(tabs)/logs');
  //         }}
  //       >
  //         TRY AGAIN
  //       </Button>
  //     </View>
  //   );

  return (
    <SafeAreaView
      style={{
        padding: 8,
        flex: 1,
        height: '100%',
      }}
    >
      <ScrollView style={{ minHeight: 200 }}>
        <Text
          style={{
            fontSize: SIZES.xxLarge,
            fontWeight: FONTWEIGHT.bold,
            marginBottom: 12,
          }}
        >
          Workout History
        </Text>
        <View
          style={{
            borderRadius: 12,
            overflow: 'hidden',
            minHeight: 10,
          }}
        >
          <FlashList
            ItemSeparatorComponent={() => (
              <ListDivider
                style={{
                  marginHorizontal: 8,
                }}
              />
            )}
            renderItem={({ item }: { item: string | number }) => {
              return (
                <WorkoutPreview workoutData={workouts.byIds[item]} key={item} />
              );
            }}
            data={workouts.allIds}
            estimatedItemSize={200}
            ListEmptyComponent={() => (
              <View
                style={{
                  flex: 1,
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    color: COLORS.gray,
                    fontSize: SIZES.medium,
                    fontWeight: FONTWEIGHT.semibold,
                  }}
                >
                  Get started with a workout.
                </Text>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LogsScreen;
