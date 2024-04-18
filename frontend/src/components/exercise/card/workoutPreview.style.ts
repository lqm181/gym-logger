import { COLORS, FONTWEIGHT, SIZES } from '@/src/constants';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    width: '100%',
    height: '100%',
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: COLORS.lightWhite,
  },
  title: {
    fontSize: SIZES.large,
    fontWeight: FONTWEIGHT.semibold,
    color: COLORS.primary,
  },
  content: {
    marginTop: 4,
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  entryText: {
    fontSize: SIZES.normal,
  },
  exerciseSummary: {
    display: 'flex',
    flexDirection: 'column',
    paddingVertical: 1,
  },
  noWorkoutText: {
    fontSize: SIZES.normal,
    color: COLORS.gray,
    marginTop: 4,
    paddingVertical: 1,
  },
});

export default styles;
