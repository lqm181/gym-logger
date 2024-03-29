import {
  View,
  Text,
  TextInput,
  TextInputProps,
  ColorValue,
} from 'react-native';
import React, { useState } from 'react';
import styles from './input.style';
import { COLORS } from '@/src/constants';

interface InputProps extends TextInputProps {
  color?: ColorValue;
}

const Input = ({ color, style, ...props }: InputProps) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <TextInput
      style={[
        styles.inputStyle,
        style,
        isFocus && {
          borderColor: color ?? COLORS.primary,
          borderBottomWidth: 1,
        },
      ]}
      {...props}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
    />
  );
};
export default Input;
