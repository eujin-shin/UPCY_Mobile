import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import Dropdown from '../common/Dropdown';
import { useState } from 'react';
import { Body16M, Title20B } from '../styles/GlobalText';
import LookbookButton from '../components/Lookbook/LookbookButton';
import LookbookAddButton from '../components/Lookbook/LookbookAddButton';
import TextToggle from '../common/TextToggle';
import Toggle from '../common/Toggle';
import ListItem from '../components/Lookbook/ListItem';
import LookbookList from '../components/Lookbook/LookbookList';
import ProfileInfo from '../components/Lookbook/ProfileInfo';

const TestDropdown = ({ index }: { index: number }) => {
  const [value, setValue] = useState<string | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const items = ['a', 'b', 'c', 'd', 'e'];

  return (
    <Dropdown
      title="서비스 선택하기"
      setValue={t => setValue(t)}
      value={value}
      items={items}
      index={index}
      width="90%"></Dropdown>
  );
};

const TestToggle = () => {
  const [isOn, setIsOn] = useState(true);
  return <Toggle isOn={isOn} setIsOn={setIsOn} />;
};

export default function ComponentsTest() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 20 }}>
        <Title20B>룩북 컴포넌트</Title20B>
        <View style={{ marginVertical: 20 }}>
          <LookbookButton />
          <LookbookAddButton onPress={() => {}} />
          <TestToggle />
          <LookbookList />
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
            }}>
            <ProfileInfo name="업씨러01" image={undefined} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
