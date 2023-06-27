import React, {useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {COLORS, CONSTANTS, FONTS} from '../../../config/setup';

function Login() {
  const navigation = useNavigation();

  const onSignIn = useCallback(() => {
    navigation.navigate('HomeDrawer' as never);
  }, [navigation]);

  return (
    <>
      <View style={styles.authInputs}>
        <TextInput
          style={[styles.authInput, styles.authInputMarginBottom]}
          placeholder="Email Address"
        />
        <TextInput style={styles.authInput} placeholder="Password" />
      </View>

      <TouchableOpacity onPress={onSignIn} style={styles.authButtonContainer}>
        <Text style={styles.authButtonText}>SIGN IN</Text>
      </TouchableOpacity>

      <View style={styles.bottomLineContainer}>
        <Text style={styles.bottomLineText1}>
          Don`t have an account ?{'  '}
          <Text style={styles.bottomLineText2}>SIGN UP</Text>
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  authInputs: {
    marginTop: 70,
  },

  authInput: {
    backgroundColor: COLORS.whiteColorLight,
    borderRadius: 40,
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontFamily: FONTS.EXTRA_BOLD,
    fontSize: CONSTANTS.smallFontSize,
    lineHeight: CONSTANTS.smallFontLineHeight,
    includeFontPadding: false,
  },

  authInputMarginBottom: {
    marginBottom: 25,
  },

  authButtonContainer: {display: 'flex', alignItems: 'center', marginTop: 40},
  authButtonText: {
    padding: 14,
    paddingHorizontal: 60,
    backgroundColor: COLORS.whiteColor,
    borderRadius: 30,
    color: COLORS.darkColor,
    fontSize: CONSTANTS.mediumFontSize,
    lineHeight: CONSTANTS.mediumFontLineHeight,
    includeFontPadding: false,
    fontFamily: FONTS.BOLD,
  },
  bottomLineContainer: {display: 'flex', alignItems: 'center', marginTop: 10},
  bottomLineText1: {color: COLORS.whiteColor, fontFamily: FONTS.MEDIUM},
  bottomLineText2: {
    fontFamily: FONTS.EXTRA_BOLD,
    textDecorationLine: 'underline',
    textDecorationColor: COLORS.whiteColor,
    textDecorationStyle: 'solid',
  },
});

export default Login;
