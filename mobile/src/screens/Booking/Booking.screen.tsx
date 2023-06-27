import React, {useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {useHeaderHeight} from '@react-navigation/elements';
import {useNavigation} from '@react-navigation/native';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import EntIcon from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/Feather';
import {COLORS, CONSTANTS, FONTS} from '../../config/setup';

const barbers = [
  {
    name: 'John Doe',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWVufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    phone: '123 123 1231',
  },
  {
    name: 'Tom Hardy',
    image:
      'https://images.unsplash.com/photo-1584043720379-b56cd9199c94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fG1lbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    phone: '123 123 1231',
  },
  {
    name: 'Wick Skeleton',
    image:
      'https://images.unsplash.com/photo-1618088129969-bcb0c051985e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fG1lbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    phone: '123 123 1231',
  },
  {
    name: 'Gary From',
    image:
      'https://images.unsplash.com/photo-1588731222899-68315ddd5e8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fG1lbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    phone: '123 123 1231',
  },
];

const dates = [
  {
    dayName: 'MON',
    date: '14',
  },
  {
    dayName: 'TUE',
    date: '15',
  },
  {
    dayName: 'WED',
    date: '16',
  },
  {
    dayName: 'THU',
    date: '17',
  },
  {
    dayName: 'FRI',
    date: '18',
  },
  {
    dayName: 'SAT',
    date: '19',
  },
  {
    dayName: 'SUN',
    date: '20',
  },
];

const slots = [
  {
    time: '10:00 AM',
  },
  {
    time: '11:00 AM',
  },
  {
    time: '12:00 PM',
  },
  {
    time: '01:00 PM',
  },
  {
    time: '10:00 AM',
  },
  {
    time: '10:30 AM',
  },
  {
    time: '11:30 AM',
  },
  {
    time: '02:00 AM',
  },
  {
    time: '03:00 AM',
  },
  {
    time: '04:00 AM',
  },
  {
    time: '05:00 AM',
  },
  {
    time: '06:00 AM',
  },
];

function CustomHeader(props: NativeStackHeaderProps) {
  return (
    <View style={styles.customHeaderContainer}>
      <Icon
        name="chevron-left"
        size={20}
        color={COLORS.whiteColor}
        onPress={() => {
          props.navigation.goBack();
        }}
      />
      <View style={{alignSelf: 'center', flex: 1}}>
        <Text
          style={{
            color: COLORS.whiteColor,
            textAlign: 'center',
            textTransform: 'uppercase',
            fontFamily: FONTS.MEDIUM,
            includeFontPadding: false,
            lineHeight: 23,
          }}>
          Book Appointment
        </Text>
      </View>
    </View>
  );
}

function BookingScreen() {
  const [selectedSlot, setSelectedSlot] = useState('5');
  const [currIndex, setCurrIndex] = useState('0');
  const [selectedBarber, setSelectedBarber] = useState('0');
  const headerHeight = useHeaderHeight();

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      header: CustomHeader,
      headerStyle: {
        backgroundColor: 'transparent',
      },
      headerTitleStyle: {
        fontWeight: 'bold',
        color: '#fff',
      },
      headerTintColor: '#fff',
      animationEnabled: true,
      headerShown: true,
    });
  }, [navigation]);

  return (
    <SafeAreaView style={[styles.container]}>
      <ScrollView
        contentContainerStyle={[styles.scrollViewStyles]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="interactive">
        <View style={{height: CONSTANTS.windowHeight - headerHeight}}>
          <View
            style={{
              backgroundColor: COLORS.darkColor2,
              display: 'flex',
              paddingVertical: 20,
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
                marginBottom: 20,
              }}>
              <Icon name="chevron-left" size={20} color={COLORS.whiteColor} />
              <Text
                style={{
                  color: COLORS.whiteColor,
                  fontFamily: FONTS.MEDIUM,
                  includeFontPadding: false,
                  lineHeight: 20,
                }}>
                January, 2019
              </Text>
              <Icon name="chevron-right" size={20} color={COLORS.whiteColor} />
            </View>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              {dates.map((date, i) => (
                <View
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: COLORS.whiteColor,
                      fontFamily: FONTS.REGULAR,
                      includeFontPadding: false,
                      lineHeight: 20,
                      fontSize: 12,
                      marginBottom: 7,
                    }}>
                    {date.dayName}
                  </Text>
                  <View
                    style={{
                      width: 26,
                      height: 26,
                      backgroundColor: i === 3 ? COLORS.darkColor : '',
                      borderRadius: 100,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        color: COLORS.whiteColor,
                        fontFamily: FONTS.MEDIUM,
                        includeFontPadding: false,
                        lineHeight: 20,
                        fontSize: 12,
                      }}>
                      {date.date}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          <View style={{marginTop: 10}}>
            <Text
              style={{
                fontFamily: FONTS.BOLD,
                color: COLORS.darkColor,
                textTransform: 'uppercase',
                paddingHorizontal: 10,
                marginTop: 10,
                includeFontPadding: false,
                fontSize: 16,
              }}>
              Available Slots
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                paddingHorizontal: 10,
                gap: 10,
                marginTop: 10,
              }}>
              {slots.map((slot, i) => (
                <View
                  style={{
                    width: '31.5%',
                    padding: 10,
                    backgroundColor:
                      +selectedSlot === i ? COLORS.darkColor : COLORS.grayColor,
                    display: 'flex',
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: FONTS.BOLD,
                      includeFontPadding: false,
                      fontSize: 12,
                      color:
                        +selectedSlot === i
                          ? COLORS.whiteColor
                          : COLORS.darkColor,
                    }}>
                    {slot.time}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View style={{marginTop: 10, paddingHorizontal: 10}}>
            <Text
              style={{
                fontFamily: FONTS.BOLD,
                color: COLORS.darkColor,
                textTransform: 'uppercase',
                marginTop: 10,
                includeFontPadding: false,
                fontSize: 16,
              }}>
              CHOOSE HAIR SPECIALIST
            </Text>
            <FlatList
              data={barbers}
              showsHorizontalScrollIndicator={false}
              // snapToOffsets={[...Array(7)].map(
              //   (x, i) =>
              //     i * (CONSTANTS.windowWidth * 0.974 - 5) + (i - 1) * 5,
              // )}
              onScroll={e => {
                const x = e.nativeEvent.contentOffset.x;
                setCurrIndex((x / 150).toFixed(0));
              }}
              style={{
                marginTop: 10,
              }}
              horizontal
              scrollEventThrottle={16}
              snapToAlignment="start"
              decelerationRate="fast"
              renderItem={({item: barber, index: i}) => (
                <View
                  style={{
                    minWidth: 150,
                    marginRight: 10,
                    backgroundColor:
                      +selectedBarber === i
                        ? COLORS.darkColor
                        : COLORS.grayColor,
                    padding: 20,
                    borderRadius: 10,
                  }}>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => {
                      navigation.navigate('Booking');
                    }}>
                    <View
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Image
                        source={{
                          uri: barber.image,
                        }}
                        style={{
                          width: 100,
                          height: 100,
                          borderRadius: 100,
                        }}
                        resizeMode="cover"
                      />
                      <View style={{marginTop: 3}}>
                        <Text
                          style={{
                            fontFamily: FONTS.EXTRA_BOLD,
                            color:
                              +selectedBarber === i
                                ? COLORS.whiteColor
                                : COLORS.darkColor,
                            textTransform: 'uppercase',
                            includeFontPadding: false,
                          }}>
                          {barber.name}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            />
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 10,
                gap: 3,
              }}>
              {barbers.map((_, i) => (
                <View
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: 100,
                    backgroundColor: COLORS.darkColor,
                    opacity: +currIndex === i ? 1 : 0.4,
                  }}
                />
              ))}
            </View>
          </View>

          <View style={{marginTop: 20, paddingHorizontal: 10}}>
            <View
              style={{
                backgroundColor: COLORS.darkColor,
                padding: 10,
                borderRadius: 10,
              }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Thanks');
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: COLORS.whiteColor,
                    textTransform: 'uppercase',
                    fontFamily: FONTS.BOLD,
                    fontSize: 16,
                    includeFontPadding: false,
                  }}>
                  Book Appointment
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.whiteColor,
  },

  scrollViewStyles: {
    flexGrow: 1,
  },

  customHeaderContainer: {
    marginTop: CONSTANTS.statusBarHeight,
    backgroundColor: COLORS.darkColor,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});
export default BookingScreen;
