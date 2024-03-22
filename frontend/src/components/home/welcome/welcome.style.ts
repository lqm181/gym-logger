import { COLORS, FONTWEIGHT, SIZES } from '@/src/constants';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  helloMessage: {
    fontSize: SIZES.large,
    color: COLORS.secondary,
  },
  welcomeMessage: {
    fontSize: SIZES.xLarge,
    fontWeight: FONTWEIGHT.bold,
    marginTop: 2,
  },
});

export default styles;
