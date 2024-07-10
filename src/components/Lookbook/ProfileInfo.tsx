import { StyleSheet, View } from 'react-native';
import AvatarIcon from '../../assets/lookbook/Avatar.svg';
import { Body14M } from '../../styles/GlobalText';

interface ProfileProps {
  name: string;
  image: undefined;
}

const ProfileInfo = ({ name, image }: ProfileProps) => {
  return (
    <View style={Styles.container}>
      {image ? <></> : <AvatarIcon />}
      <Body14M>{name}</Body14M>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    alignSelf: 'flex-start',
  },
});

export default ProfileInfo;
