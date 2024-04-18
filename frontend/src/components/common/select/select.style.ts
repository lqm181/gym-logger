import { COLORS, SIZES } from '@/src/constants';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  selectContainer: {
    backgroundColor: COLORS.lightWhite,
    paddingTop: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  label: {
    position: 'absolute',
    backgroundColor: COLORS.lightWhite,
    left: 6,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: SIZES.normal,
  },
  placeholderStyle: { fontSize: SIZES.medium },
  selectedTextStyle: {
    fontSize: SIZES.medium,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: SIZES.medium,
  },
  iconStyle: { width: 20, height: 20 },
});

export default styles;
