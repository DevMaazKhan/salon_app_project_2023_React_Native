import React, {useContext, useMemo} from 'react';
import Logo from '../../../assets/images/logo.png';
import {View, SafeAreaView, StyleSheet, ScrollView, Image} from 'react-native';
import AuthOptions from './AuthOptions';
import {COLORS, CONSTANTS, FONTS} from '../../../config/setup';
import Register from './Register';
import {AUTH_OPTIONS, AuthContext} from '../Auth.context';
import Login from './Login';

function AuthScreen() {
  const {authOption} = useContext(AuthContext);

  const AuthComp = useMemo(
    () => (authOption === AUTH_OPTIONS.SIGN_IN ? Login : Register),
    [authOption],
  );

  const {width, height} = useMemo(
    () => ({
      width: authOption === AUTH_OPTIONS.SIGN_IN ? 300 : 200,
      height: authOption === AUTH_OPTIONS.SIGN_IN ? 300 : 200,
    }),
    [authOption],
  );

  const bodyStyles = useMemo(
    () => ({
      flex: authOption === AUTH_OPTIONS.SIGN_IN ? 2 : 4,
    }),
    [authOption],
  );

  return (
    <SafeAreaView style={[styles.container]}>
      <ScrollView
        contentContainerStyle={[styles.scrollViewStyles]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="interactive">
        <View style={{height: '100%'}}>
          <View style={styles.bodyStyles}>
            <View style={styles.bodyTop}>
              <Image
                source={Logo}
                style={{
                  width,
                  height,
                }}
              />
            </View>

            <View style={[styles.bodyBottom, bodyStyles]}>
              <AuthOptions />
              <AuthComp />
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
    backgroundColor: COLORS.darkColor,
  },

  scrollViewStyles: {
    flexGrow: 1,
  },

  bodyStyles: {
    display: 'flex',
    flex: 1,

    paddingHorizontal: 10,
  },

  bodyTop: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoText: {
    color: COLORS.whiteColor,
    textTransform: 'uppercase',
    fontSize: CONSTANTS.extraLargeFontSize,
    lineHeight: CONSTANTS.extraLargeFontLineHeight,
    fontFamily: FONTS.BOLD,
    includeFontPadding: false,
  },

  bodyBottom: {
    flex: 2,
  },
});

export default AuthScreen;
