import {
  SafeAreaView,
  View,
  Dimensions,
  StyleSheet,
  Alert,
} from 'react-native';
import styled from 'styled-components/native';
import { Body14M, Caption11M, Subtitle16B } from '../../../styles/GlobalText';
import { PageProps } from './Reformer';
import BottomButton from '../../../common/BottomButton';
import RightArrow from '../../../assets/common/RightArrow.svg';
import PlusIcon from '../../../assets/common/Plus.svg';
import { useEffect, useState } from 'react';
import { BLACK, BLACK2, GRAY } from '../../../styles/GlobalColor';
import EducationModal from './EducationModal';
import SelectBox from '../../../common/SelectBox';
import CareerModal from './CareerModal';
import CustomScrollView from '../../../common/CustomScrollView';
import Request from '../../../common/requests';
import { CareerType, Careers } from '../../../types/UserTypes';
import { err } from 'react-native-svg';

const SelectView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 44px;
  width: 100%;
  border-width: 2px;
  border-color: #929292;
  border-radius: 5px;
  margin-top: 8px;
`;

const SelectTouchable = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 44px;
  padding-left: 16px;
  padding-right: 16px;
`;

const AddTouchable = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 44px;
  width: 100%;
  border-width: 2px;
  border-color: #bdbdbd;
  border-radius: 5px;
  border-style: dashed;
  margin-top: 8px;
`;

export default function ReformCareer({ setNext, form, setForm }: PageProps) {
  const { width } = Dimensions.get('screen');
  const [educationModal, setEducationModal] = useState(false);
  const [careerModal, setCareerModal] = useState(false);
  const [careerIndex, setCareerIndex] = useState(-1);
  const request = Request();

  const handleAddCareer = () => {
    const newIndex = form.career.length;
    setForm(prev => {
      return {
        ...prev,
        career: [...prev.career, { name: '', file: [], type: undefined }],
      };
    });
    setCareerIndex(newIndex);
  };

  const handleEditCareer = (index: number) => {
    setCareerIndex(index);
  };

  const handleDeleteCareer = (delIndex: number) => {
    const newCareer = form.career.filter((_, i) => i !== delIndex);
    setForm(prev => {
      return { ...prev, career: newCareer };
    });
  };

  const handlePressCareer = (index: number) => {
    Alert.alert('경력을 수정하시겠습니까?', undefined, [
      { text: '수정하기', onPress: () => handleEditCareer(index) },
      { text: '삭제하기', onPress: () => handleDeleteCareer(index) },
    ]);
  };

  useEffect(() => {
    if (careerIndex >= 0) setCareerModal(true);
  }, [careerIndex]);

  const handleCareerRegister = async (career: object, category: string) => {
    const response = await request.post('users/' + category + '_register/', {});
    if (response?.status !== 200) {
      console.log(response);
      throw Error('career register failed');
    }
  };

  const handleSubmit = async () => {
    let path = '';
    let param = {};
    form.career.map(value => {
      if (value.type === '프리랜서') {
        path = 'freelancer';
        param = {
          project_name: value.name,
          client: value.client,
          main_tasks: value.content,
          // params 확인
        };
      } else if (value.type === '실무 / 인턴') {
        path = 'internship';
        param = {
          company_name: value.name,
          department: value.team,
          position: value.position,
          start_date: value.start,
          end_date: value.end,
        };
      } else if (value.type === '공모전') {
        path = 'competition';
        param = {
          name: value.name,
          organizer: value.host,
          award_date: value.date,
        };
      } else if (value.type === '자격증') {
        path = 'certification';
        param = {
          name: value.name,
          issuing_authority: value.host,
          issue_date: value.date,
        };
      } else if (value.type === '기타 (외주)') {
      }
      try {
        handleCareerRegister(param, path);
      } catch (error) {
        console.log(error);
      }
    });
    const profileForm = {
      nickname: form.nickname,
      market_name: form.market,
      market_intro: form.introduce,
      links: form.link,
      area: form.region,
      work_style: form.style,
      special_material: form.material,
    };
    const response = await request.post('users/profile_register/', profileForm);
    if (response?.status === 200) {
      setNext();
    } else {
      console.log(response);
      Alert.alert('프로필 등록에 실패했습니다.');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomScrollView minHeight={500}>
        <View style={{ flexGrow: 1 }}>
          <View style={{ marginHorizontal: width * 0.04 }}>
            <View style={styles.formView}>
              <Subtitle16B>학력 전공을 작성해 주세요</Subtitle16B>
              <SelectBox
                value={form.education.school}
                onPress={() => {
                  setEducationModal(true);
                }}
                add={true}
              />
            </View>
            <View style={styles.formView}>
              <Subtitle16B>보유한 경력을 작성해 주세요</Subtitle16B>
              {form.career.map((item, index) => (
                <SelectView key={index}>
                  <SelectTouchable
                    onPress={() => {
                      handlePressCareer(index);
                    }}>
                    {item.name === '' && item.type === undefined ? (
                      <Body14M style={{ color: BLACK2 }}>선택해 주세요</Body14M>
                    ) : (
                      <Body14M>
                        {item.type} / {item.name}
                      </Body14M>
                    )}

                    <RightArrow color={BLACK2} />
                  </SelectTouchable>
                </SelectView>
              ))}
              {form.career.length < 3 && (
                <AddTouchable onPress={handleAddCareer}>
                  <PlusIcon color={GRAY} />
                </AddTouchable>
              )}
            </View>
          </View>
          <View style={styles.bottomView}>
            <Caption11M style={{ color: 'white' }}>
              최대 추가 개수 {form.career.length}/3개
            </Caption11M>
          </View>
          <View style={{ marginHorizontal: width * 0.04 }}>
            <BottomButton
              value="다음"
              pressed={false}
              onPress={handleSubmit}
              style={{ width: '75%', alignSelf: 'center', marginBottom: 10 }}
            />
          </View>
        </View>
      </CustomScrollView>
      <EducationModal
        open={educationModal}
        setOpen={setEducationModal}
        form={form}
        setForm={setForm}
      />
      {careerIndex >= 0 && (
        <CareerModal
          open={careerModal}
          setOpen={setCareerModal}
          form={form}
          setForm={setForm}
          index={careerIndex}
          setIndex={setCareerIndex}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  formView: {
    marginTop: 30,
  },
  bottomView: {
    marginTop: 'auto',
    marginBottom: 10,
    width: '100%',
    height: 32,
    backgroundColor: BLACK,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
