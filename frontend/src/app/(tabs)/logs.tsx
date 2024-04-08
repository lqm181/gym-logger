import { View, Text, ActivityIndicator } from 'react-native';
import React, { useEffect } from 'react';
import { Link, router } from 'expo-router';
import useDataFetcher from '@/src/hooks/useDataFetcher';
import { BACKEND_API_URL, COLORS, SIZES } from '@/src/constants';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/src/components';
import { FlashList } from '@shopify/flash-list';

const LogsScreen = () => {
  // TODO: Change userId
  // TODO: remove all console.logs
  const userId = 1;
  const { data, isLoading, error, fetchData } = useDataFetcher();

  useEffect(() => {
    fetchData(`${BACKEND_API_URL}/workouts/users/${userId}`);
  }, []);

  if (isLoading)
    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}
      >
        <ActivityIndicator />
        <Text>Loading Your Workouts...</Text>
      </View>
    );

  if (error)
    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: 32,
          flex: 1,
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 60,
          }}
        >
          <Ionicons name='alert-circle-outline' size={72} color={COLORS.gray} />
          <Text
            style={{
              fontSize: SIZES.large,
              color: COLORS.gray,
              marginTop: 12,
            }}
          >
            Somehting went wrong.
          </Text>
          <Text
            style={{
              fontSize: SIZES.large,
              color: COLORS.gray,
              marginTop: 6,
            }}
          >
            Unable to load your workout history.
          </Text>
        </View>

        <Button
          style={{ width: 'auto', height: 40 }}
          color='info'
          onPress={() => {
            console.log('Refreshing');
            router.replace('/(tabs)/logs');
          }}
        >
          TRY AGAIN
        </Button>
      </View>
    );

  return (
    <View>
      <Text>Display all logs</Text>
      <Link
        href={{
          pathname: '/(tabs)/(log)/[date]',
          params: { date: '3/27/2024', id: 9 },
        }}
      >
        3/27/2024
      </Link>
      <Link
        href={{
          pathname: '/(tabs)/(log)/[date]',
          params: { date: '3/26/2024', id: 9 },
        }}
      >
        3/26/2024
      </Link>

      <View style={{ minHeight: 200 }}>
        <FlashList
          renderItem={({ item }: { item: any }) => {
            return <Text>{item.id}</Text>;
          }}
          data={data}
          estimatedItemSize={200}
        />
      </View>
    </View>
  );
};

export default LogsScreen;
