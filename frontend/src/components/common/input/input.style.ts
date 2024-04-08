import { COLORS, SIZES } from '@/src/constants';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: 'auto',
  },
  inputStyle: {
    height: 40,
    padding: 10,
    paddingTop: 10,
    fontSize: SIZES.medium,
  },
  standard: {
    borderColor: 'gray',
    borderBottomWidth: 0.5,
  },
  outlined: {
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
  },
  filled: {
    borderRadius: 8,
    backgroundColor: 'lightgray',
  },
  focusStandard: {
    borderBottomWidth: 1,
  },
  focusOutlined: {
    borderWidth: 1,
  },
  focusFilled: {
    borderWidth: 1,
  },
  labelStyle: {
    position: 'absolute',
    top: -8,
    left: 6,
    paddingHorizontal: 5,
    zIndex: 999,
    backgroundColor: COLORS.lightWhite,
    fontSize: SIZES.normal,
  },
});

export default styles;
