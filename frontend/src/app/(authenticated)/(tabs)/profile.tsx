import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, { ReactNode } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, ListDivider, UserAvatar } from '@/src/components';
import { useAppSelector } from '@/src/state/store';
import { selectUser } from '@/src/state/selectors';
import { COLORS, FONTWEIGHT, SIZES } from '@/src/constants';
import { Ionicons } from '@expo/vector-icons';
import { Href, useRouter } from 'expo-router';
import { useSession } from '@/src/providers/SessionProvider';

const SettingOption = ({
  href,
  label,
  rightAction,
}: {
  href?: Href<string>;
  label: string;
  rightAction?: ReactNode;
}) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      disabled={href === undefined || href === null}
      onPress={() => {
        if (href) {
          router.push(href);
        }
      }}
    >
      <View style={styles.setting}>
        <Text style={styles.settingLabel}>{label}</Text>
        {rightAction ? (
          rightAction
        ) : (
          <Ionicons name='chevron-forward-outline' size={20} color='gray' />
        )}
      </View>
    </TouchableOpacity>
  );
};

const profile = () => {
  const user = useAppSelector((state) => selectUser(state));
  const { signOut } = useSession();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: 48,
            paddingHorizontal: 12,
            flex: 1,
          }}
        >
          <UserAvatar
            image_url={user.img_url ?? ''}
            dimension={112}
            color='gray'
            imageStyle={{
              borderRadius: 100,
              backgroundColor: 'lightgray',
            }}
          />
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{user.firstName} </Text>
            <Text style={styles.name}>{user.lastName}</Text>
          </View>

          <View style={styles.settingContainer}>
            <View style={styles.settingGroup}>
              <Text style={styles.settingGroupTitle}>Account settings</Text>

              <View style={styles.settings}>
                <SettingOption label='Edit account name' />
                <ListDivider />
                <SettingOption label='Change email address' />
                <ListDivider />
                <SettingOption label='Change password' />
              </View>
            </View>

            <View style={styles.settingGroup}>
              <Text style={styles.settingGroupTitle}>App settings</Text>

              <View style={styles.settings}>
                <SettingOption label='Weight Unit' />
                <ListDivider />
                <SettingOption label='Theme' />
              </View>
            </View>
          </View>
          <Button
            variant='outlined'
            color='error'
            style={styles.button}
            textProps={{ fontSize: SIZES.medium }}
            onPress={() => {
              signOut();
            }}
          >
            Log out
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default profile;

const styles = StyleSheet.create({
  nameContainer: { flex: 1, flexDirection: 'row', marginTop: 12 },
  name: { fontSize: SIZES.xLarge, fontWeight: FONTWEIGHT.semibold },
  settingContainer: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    marginTop: 24,
    gap: 24,
  },
  settingGroup: {
    flex: 1,
    flexDirection: 'column',
  },
  settingGroupTitle: {
    fontSize: SIZES.large,
    fontWeight: FONTWEIGHT.bold,
    marginBottom: 12,
  },
  settings: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COLORS.lightWhite,
    borderRadius: 12,
  },
  setting: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  settingLabel: {
    fontSize: SIZES.medium,
    fontWeight: FONTWEIGHT.medium,
  },
  button: { width: '100%', marginTop: 48, backgroundColor: 'transparent' },
});
