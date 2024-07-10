import { Dimensions, View } from 'react-native';

const LookbookList = () => {
  const { width } = Dimensions.get('window');
  return (
    <View
      style={{ width: '100%', backgroundColor: 'gray', height: 300 }}></View>
  );
};

export default LookbookList;
