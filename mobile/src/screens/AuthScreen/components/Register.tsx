import React, {useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {COLORS, CONSTANTS, FONTS} from '../../../config/setup';
import {AUTH_OPTIONS, AuthContext} from '../Auth.context';

function Register() {
  const {onAuthOptionChange} = useContext(AuthContext);

  return (
    <>
      <View style={styles.authInputs}>
        <TextInput
          style={[styles.authInput, styles.authInputMarginBottom]}
          placeholder="Full Name"
        />
        <TextInput
          style={[styles.authInput, styles.authInputMarginBottom]}
          placeholder="Email Address"
        />
        <TextInput
          style={[styles.authInput, styles.authInputMarginBottom]}
          placeholder="Password"
        />
        <TextInput style={styles.authInput} placeholder="Confirm Password" />
      </View>

      <TouchableOpacity
        style={styles.authButtonContainer}
        onPress={onAuthOptionChange(AUTH_OPTIONS.SIGN_UP)}>
        <Text style={styles.authButtonText}>SIGN UP</Text>
      </TouchableOpacity>

      <View style={styles.bottomLineContainer}>
        <Text style={styles.bottomLineText1}>
          Already have an account ?{'  '}
          <Text style={styles.bottomLineText2}>SIGN IN</Text>
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

export default Register;
