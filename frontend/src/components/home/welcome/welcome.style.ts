import { COLORS, FONTWEIGHT, SIZES } from '@/src/constants';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  helloMessage: {
    fontSize: SIZES.large,
    color: COLORS.secondary,
    fontWeight: FONTWEIGHT.bold,
  },
  welcomeMessage: {
    fontSize: SIZES.medium,
    color: COLORS.gray,
    marginTop: 2,
  },
});

export default styles;
