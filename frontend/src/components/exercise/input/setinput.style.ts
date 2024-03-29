import { COLORS, FONTWEIGHT, SIZES } from '@/src/constants';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 0,
    borderRadius: 8,
    backgroundColor: COLORS.lightWhite,
    // elevation: 1,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 0 },
    // shadowOpacity: 0.1,
    // shadowRadius: 5,
    // borderTopWidth: 0.5,
    // borderColor: COLORS.gray,
    // borderBottomWidth: 0.5,
  },
  labelStyle: {
    fontWeight: FONTWEIGHT.semibold,
    fontSize: SIZES.medium,
    // color: COLORS.primary,
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 6,
  },
  inputBase: {
    height: 35,
    padding: 10,
    borderRadius: 8,
    borderColor: 'gray',
    borderBottomWidth: 0.5,
  },
  setInput: {
    flex: 2,
  },

  repInput: {
    flex: 1,
  },
  noteInput: {
    flex: 7,
    height: 'auto',
    maxHeight: 90,
  },
  actionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
});

export default styles;
