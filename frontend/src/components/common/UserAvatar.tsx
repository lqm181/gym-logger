import { DimensionValue, View } from 'react-native';
import { Image, ImageSource, ImageStyle } from 'expo-image';
import { FontAwesome6 } from '@expo/vector-icons';

interface UserAvatarProps {
  image_url: string | null | number | string[] | ImageSource | ImageSource[];
  color?: string;
  imageStyle?: ImageStyle;
  dimension?: DimensionValue;
}
const UserAvatar = ({
  image_url,
  color = 'black',
  imageStyle,
  dimension = 40,
}: UserAvatarProps) => {
  return image_url && image_url !== '' ? (
    <Image
      source={image_url}
      contentFit='cover'
      style={{
        width: dimension,
        height: dimension,
        borderRadius: 24,
        ...imageStyle,
      }}
    />
  ) : (
    <View
      style={{
        width: dimension,
        height: dimension,
        justifyContent: 'center',
        alignItems: 'center',
        ...imageStyle,
      }}
    >
      <FontAwesome6
        name='user'
        size={(dimension as number) * 0.6}
        color={color}
      />
    </View>
  );
};

export default UserAvatar;
