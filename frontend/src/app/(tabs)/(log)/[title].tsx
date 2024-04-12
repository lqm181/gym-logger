import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { AddExerciseButton } from '@/src/components';
import useDataFetcher from '@/src/hooks/useDataFetcher';
import { BACKEND_API_URL, COLORS, FONTWEIGHT, SIZES } from '@/src/constants';
import { FlashList } from '@shopify/flash-list';
import { ExercisePerformed, Workout } from '@/src/types';
import ExerciseCard from '@/src/components/exercise/card/ExerciseCard';
import { MenuProvider } from 'react-native-popup-menu';
import { Ionicons } from '@expo/vector-icons';

const LogDetailScreen = () => {
  const { title, id } = useLocalSearchParams();
  const router = useRouter();
  const { data, isLoading, error, fetchData } = useDataFetcher<Workout>();

  useEffect(() => {
    /* Dynamically set the title for each log */
    // TODO: Fetch workout information
    fetchData(`${BACKEND_API_URL}/workouts/${id}`);
  }, [title]);

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerLeft: (props) => (
            <TouchableOpacity
              // {...props}
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
              <AddExerciseButton />
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
          {data && data.performedExercises.length > 0 ? (
            <View style={{ paddingHorizontal: 8, paddingVertical: 8 }}>
              <Text
                style={{
                  fontSize: SIZES.xxLarge,
                  fontWeight: FONTWEIGHT.bold,
                  marginBottom: 12,
                }}
              >
                {title}
              </Text>

              <View style={{ paddingHorizontal: 4, minHeight: 10 }}>
                <FlashList
                  data={data?.performedExercises}
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
            </View>
          ) : (
            <View
              style={{
                display: 'flex',
                flex: 1,
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 24,
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
        </ScrollView>
      </MenuProvider>
    </View>
  );
};

export default LogDetailScreen;
