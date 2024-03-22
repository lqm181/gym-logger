import { Text, ScrollView, View } from 'react-native';
import { Welcome } from '../../components';
import { COLORS, SIZES } from '@/src/constants';

export default function Home() {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        backgroundColor: COLORS.lightWhite,
      }}
    >
      <View style={{ flex: 1, padding: SIZES.medium }}>
        <Welcome />
      </View>
    </ScrollView>
  );
}
