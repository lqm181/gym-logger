import {
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import React, { ReactNode } from 'react';

interface IconButtonProps extends TouchableOpacityProps {
  children: ReactNode;
  size: number;
  buttonStyle?: ViewStyle;
}

const IconButton = ({
  children,
  size = 40,
  buttonStyle,
  ...props
}: IconButtonProps) => {
  return (
    <TouchableOpacity
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: size,
        height: size,
        borderRadius: 24,
        ...buttonStyle,
      }}
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
};

export default IconButton;
