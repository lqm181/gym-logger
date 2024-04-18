import { SIZES, COLORS } from '@/src/constants';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  optionsContainer: {
    width: 200,
    marginTop: -65,
    backgroundColor: 'transparent',
  },
  blurView: {
    flex: 1,
    overflow: 'hidden',
    borderRadius: 12,
  },
  optionWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  titleText: { fontSize: SIZES.medium, color: COLORS.gray2 },
});

export default styles;
