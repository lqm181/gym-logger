import { View, Text, ViewStyle, TextStyle, ColorValue } from 'react-native';
import React, { useState } from 'react';
import styles from './select.style';
import { Dropdown } from 'react-native-element-dropdown';
import { DropdownProps } from 'react-native-element-dropdown/lib/typescript/components/Dropdown/model';
import { COLORS } from '@/src/constants';

interface SelectProps<T> extends DropdownProps<T> {
  selectLabel?: string;
  selectContainerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  color?: ColorValue;
}

const Select = <T,>({
  selectLabel,
  placeholder,
  value,
  selectContainerStyle,
  labelStyle,
  color,
  ...dropdownProps
}: SelectProps<T>) => {
  //   const [selectedValue, setSelectedValue] = useState('');
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text
          style={[
            styles.label,
            labelStyle,
            isFocus && { color: color ?? COLORS.primary },
          ]}
        >
          {selectLabel}
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={[styles.selectContainer, selectContainerStyle]}>
      {renderLabel()}
      <Dropdown
        {...dropdownProps}
        style={[
          styles.dropdown,
          isFocus && { borderColor: color ?? COLORS.primary },
        ]}
        placeholder={!isFocus ? placeholder : ''}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      />
    </View>
  );
};

export default Select;
