import { Dimensions, View } from 'react-native';

const ListItem = () => {
  const { width } = Dimensions.get('screen');

  const COLUMN_COUNT = 2;
  const ITEM_WIDTH = (width * 0.9) / COLUMN_COUNT;

  return (
    <View style={{ width: ITEM_WIDTH }}>
      <View style={{ width: '100%', backgroundColor: 'gray', height: 200 }} />
    </View>
  );
};

export default ListItem;
