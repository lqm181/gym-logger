import { View, StyleSheet, ViewStyle } from 'react-native';
import React from 'react';

interface ListDividerProps {
  style?: ViewStyle;
}

const ListDivider = ({ style }: ListDividerProps) => {
  return (
    <View
      style={{
        height: StyleSheet.hairlineWidth,
        backgroundColor: 'lightgray',
        ...style,
      }}
    />
  );
};

export default ListDivider;
