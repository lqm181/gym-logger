import {
  View,
  Text,
  TextInput,
  TextInputProps,
  ColorValue,
  StyleProp,
  ViewStyle,
} from 'react-native';
import React, { useState } from 'react';
import styles from './input.style';
import { COLORS } from '@/src/constants';

interface InputProps extends TextInputProps {
  color?: ColorValue;
  variant?: 'filled' | 'outlined' | 'standard';
  label?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

const Input = ({
  color = 'blue',
  style,
  variant = 'standard',
  label,
  containerStyle,
  ...props
}: InputProps) => {
  const [isFocus, setIsFocus] = useState(false);

  let variantStyle;
  let focusStyle;
  switch (variant) {
    case 'filled':
      variantStyle = styles.filled;
      focusStyle = styles.focusFilled;
      break;
    case 'outlined':
      variantStyle = styles.outlined;
      focusStyle = styles.focusOutlined;
      break;
    default:
      variantStyle = styles.standard;
      focusStyle = styles.focusStandard;
  }

  return (
    <View style={containerStyle}>
      {label && isFocus && (
        <Text style={[styles.labelStyle, { color: color }]}>{label}</Text>
      )}
      <TextInput
        style={[
          styles.inputStyle,
          variantStyle,
          style,
          isFocus && {
            ...focusStyle,
            borderColor: color ?? COLORS.primary,
          },
        ]}
        {...props}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      />
    </View>
  );
};
export default Input;
