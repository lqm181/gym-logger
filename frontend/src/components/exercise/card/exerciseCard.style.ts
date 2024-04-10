import { COLORS, FONTWEIGHT, SIZES } from '@/src/constants';
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 12,
    marginTop: 24,
  },
  cardHeader: {
    display: 'flex',
    paddingVertical: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: SIZES.medium,
    fontWeight: FONTWEIGHT.bold,
    color: COLORS.primary,
  },
  totalVolumne: {
    color: COLORS.gray,
    fontSize: SIZES.small,
  },
  tableContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  tableRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  tableCell: {
    fontSize: SIZES.normal,
    fontWeight: FONTWEIGHT.medium,
  },
  smallCell: {
    flex: 1,
  },
  mediumCell: {
    flex: 2,
  },
  largeCell: {
    flex: 5,
  },
  tableHeader: {
    fontSize: SIZES.small,
    color: 'gray',
  },
});

export default styles;
