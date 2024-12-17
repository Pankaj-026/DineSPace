import { View, Text, StyleSheet, Image, TouchableOpacity, Animated, Easing } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useRef } from 'react';
import { Link } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import imagePath from '@/src/constants/imagePath';

const StartPage = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Animation for fade-in

  // Animate main content on mount
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Image source={imagePath.login_head_black} style={styles.header_image} />

      {/* Main Content with Animation */}
      <Animated.View style={[styles.main_content, { opacity: fadeAnim }]}>
        {/* Sign Up Buttons */}
        <View>
          <TouchableOpacity style={styles.button}>
            <AntDesign name="mail" size={18} color="white" />
            <Link href={"/(auth)/signUp"}>
              <Text style={styles.button_text}>Sign up With Email</Text>
            </Link>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <AntDesign name="google" size={18} color="white" />
            <Link href={"/(auth)/signUp"}>
              <Text style={styles.button_text}>Sign up With Google</Text>
            </Link>
          </TouchableOpacity>
        </View>

        {/* Horizontal Line with "OR" */}
        <View style={styles.or_container}>
          <View style={styles.horizontal_line} />
          <Text style={styles.or_text}>or</Text>
          <View style={styles.horizontal_line} />
        </View>

        {/* Continue as Guest */}
        {/* <Text style={styles.guest_text}>
          <Link href={"/(auth)/guest"}>Continue as Guest</Link>
        </Text> */}

        {/* Login Link */}
        <Text style={styles.login_text}>
          Already a user? <Link href={"/(auth)/login"}><Text style={{ fontWeight: 'bold' }}>LogIn</Text></Link>
        </Text>

        {/* Offer Text */}
        <Text style={styles.offer_text}>
          Sign up for an account to receive 20% off your bill on every reservation!
        </Text>
      </Animated.View>

      {/* Footer */}
      <Image source={imagePath.down_dine} style={styles.footer_image} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F49B33',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header_image: {
    width: '100%',
    resizeMode: 'contain',
    marginTop: 20,
  },
  main_content: {
    width: '80%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'transparent', // Transparent Background
    borderWidth: 2,
    borderColor: 'white', // White Border
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 8,
    marginVertical: 10,
    minWidth: '100%',
    textAlign: "center",
  },
  button_text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  or_container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
    width: '100%',
  },
  horizontal_line: {
    flex: 1,
    height: 1,
    backgroundColor: 'white',
  },
  or_text: {
    color: 'white',
    marginHorizontal: 10,
    fontWeight: 'bold',
  },
  guest_text: {
    color: '#FFF',
    fontSize: 16,
    textDecorationLine: 'underline',
    marginVertical: 10,
  },
  login_text: {
    color: '#FFF',
    fontSize: 16,
    marginTop: 10,
  },
  offer_text: {
    color: '#FFF',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 14,
  },
  footer_image: {
    width: '100%',
    resizeMode: 'contain',
    marginBottom: 10,
  },
});

export default StartPage;
