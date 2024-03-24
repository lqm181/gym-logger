import { ScrollView, View } from 'react-native';
import { Welcome } from '../../components';
import { COLORS, SIZES } from '@/src/constants';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <ScrollView showsVerticalScrollIndicator={false} style={{}}>
        <View
          style={{
            padding: SIZES.medium,
          }}
        >
          <Welcome />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
