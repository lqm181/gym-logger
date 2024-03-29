import {
  View,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  TextStyle,
} from 'react-native';
import React, { ReactNode } from 'react';
import styles from './button.style';

interface ButtonProps extends TouchableOpacityProps {
  children: ReactNode | string;
  variant?: 'outlined' | 'contained';
  color?: 'error' | 'success' | 'info' | 'primary';
  textProps?: TextStyle;
}

const Button = ({
  children,
  variant = 'contained',
  color = 'primary',
  style,
  textProps,
  disabled,
  ...props
}: ButtonProps) => {
  let textStyles = [];
  let buttonStyles = [];

  buttonStyles.push(styles.buttonBase);
  textStyles.push(styles.textContainedBase);
  if (variant === 'contained') {
    switch (color) {
      case 'primary':
        buttonStyles.push(styles.primaryContained);
        break;
      case 'error':
        buttonStyles.push(styles.errorContained);
        break;
      case 'info':
        buttonStyles.push(styles.infoContained);
        break;
      case 'success':
        buttonStyles.push(styles.successContained);
        break;
      default:
        throw Error('Invalid color argument');
    }
  } else {
    /* Outlined Button */
    buttonStyles.push(styles.outlinedButtonBase);

    switch (color) {
      case 'primary':
        buttonStyles.push(styles.primaryOutlined);
        textStyles.push(styles.textOutlinedPrimary);
        break;
      case 'error':
        buttonStyles.push(styles.errorOutlined);
        textStyles.push(styles.textOutlinedError);
        break;
      case 'info':
        buttonStyles.push(styles.infoOutlined);
        textStyles.push(styles.textOutlinedInfo);
        break;
      case 'success':
        buttonStyles.push(styles.successOutlined);
        textStyles.push(styles.textOutlinedSuccess);
        break;
      default:
        throw Error('Invalid color argument');
    }
  }
  return (
    <TouchableOpacity
      style={[...buttonStyles, style, disabled && styles.disabled]}
      {...props}
    >
      {typeof children === 'string' ? (
        <Text style={[textStyles, textProps]}>{children}</Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};

export default Button;
