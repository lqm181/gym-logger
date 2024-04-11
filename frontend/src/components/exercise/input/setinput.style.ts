import { COLORS, FONTWEIGHT, SIZES } from '@/src/constants';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
  containerRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: 24,
  },

  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
  },
  inputBase: {
    height: 35,
    padding: 10,
    borderRadius: 8,
    borderColor: 'gray',
    borderBottomWidth: 0.5,
  },
  setInput: {
    flex: 1,
  },

  repInput: {
    flex: 1,
  },
  noteInput: {
    flex: 1,
    height: 90,
  },
  actionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  inputLabel: {
    fontSize: SIZES.normal,
    fontWeight: FONTWEIGHT.bold,
    marginBottom: 5,
  },
});

export default styles;
