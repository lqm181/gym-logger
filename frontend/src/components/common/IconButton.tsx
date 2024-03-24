import { TouchableOpacity } from 'react-native';
import React, { ReactNode } from 'react';
import { COLORS } from '@/src/constants';

interface IconButtonProps {
  children: ReactNode;
  size: number;
}

const IconButton = ({ children, size = 40 }: IconButtonProps) => {
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: size,
        height: size,
        borderRadius: 24,
        backgroundColor: COLORS.white,
      }}
    >
      {children}
    </TouchableOpacity>
  );
};

export default IconButton;
