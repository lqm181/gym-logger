import { COLORS, FONTWEIGHT, SIZES } from '@/src/constants';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  disabled: {
    opacity: 0.5,
  },
  buttonBase: {
    height: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: SIZES.medium, // 16
    minWidth: 100,
  },

  textContainedBase: {
    color: COLORS.lightWhite,
    fontWeight: FONTWEIGHT.semibold,
  },

  outlinedButtonBase: {
    backgroundColor: COLORS.lightWhite,
  },

  primaryContained: {
    backgroundColor: COLORS.primary,
  },
  primaryOutlined: {
    borderColor: COLORS.primary,
  },
  textOutlinedPrimary: {
    color: COLORS.primary,
  },

  errorContained: {
    backgroundColor: COLORS.error,
  },
  errorOutlined: {
    borderColor: COLORS.error,
  },
  textOutlinedError: {
    color: COLORS.error,
  },

  infoContained: {
    backgroundColor: COLORS.info,
  },
  infoOutlined: {
    borderColor: COLORS.info,
  },
  textOutlinedInfo: {
    color: COLORS.info,
  },

  successContained: {
    backgroundColor: COLORS.success,
  },
  successOutlined: {
    borderColor: COLORS.success,
  },
  textOutlinedSuccess: {
    color: COLORS.success,
  },
});

export default styles;
