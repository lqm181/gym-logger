import { View, Text, FlatList, StyleSheet } from 'react-native';
import React, { ReactNode } from 'react';
import styles from './popover-menu.style';
import { BlurView } from 'expo-blur';

import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';
import { COLORS, FONTWEIGHT, SIZES } from '@/src/constants';

interface OptionProps {
  name: string | ReactNode;
  icon?: any;
  onPress?: () => void;
}

interface PopoverMenuProps {
  options: OptionProps[];
  title?: string;
}

const Divider = () => (
  <View
    style={{
      height: StyleSheet.hairlineWidth,
      backgroundColor: 'lightgray',
    }}
  />
);

const PopoverMenu = ({ options, title }: PopoverMenuProps) => {
  return (
    <Menu>
      <MenuTrigger>
        <MaterialCommunityIcons name='dots-vertical' size={24} color='gray' />
      </MenuTrigger>
      <MenuOptions
        customStyles={{
          optionsContainer: styles.optionsContainer,
        }}
      >
        <BlurView intensity={70} style={styles.blurView} tint='light'>
          {title && (
            <>
              <MenuOption
                customStyles={{
                  optionWrapper: styles.titleContainer,
                }}
              >
                <Text style={styles.titleText}>{title}</Text>
              </MenuOption>
              <Divider />
            </>
          )}
          <FlatList
            data={options}
            ItemSeparatorComponent={() => <Divider />}
            renderItem={({ item }) => (
              <View>
                <MenuOption
                  customStyles={{
                    optionWrapper: styles.optionWrapper,
                  }}
                >
                  <Text style={{ fontSize: 16 }}>{item.name}</Text>
                  <Text>{item.icon}</Text>
                </MenuOption>
              </View>
            )}
          />
        </BlurView>
      </MenuOptions>
    </Menu>
  );
};

export default PopoverMenu;
