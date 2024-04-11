import { COLORS, FONTWEIGHT, SIZES } from '@/src/constants';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContainer: {
    width: '95%',
    maxHeight: 600,
    minHeight: 300,
    borderRadius: 18,
    elevation: 3,
    backgroundColor: COLORS.lightWhite,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  title: {
    fontWeight: FONTWEIGHT.bold,
    fontSize: SIZES.xLarge,
    paddingBottom: 8,
  },
  modelActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    gap: 12,
    marginTop: 36,
  },
});

export default styles;
