import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import DineSPaceHeader from '@/src/components/DineSPace-header';


const SignUp = () => {
  return (
    <SafeAreaView style={styles.container}>
      
      {/* Header */}
      <DineSPaceHeader />

      {/* Main Body */}
      <View style={styles.body_container}>
        <Text style={styles.signup_title}>Let's Get You Started</Text>

        <Text style={styles.label}>Full Name</Text>
        <TextInput style={styles.input} placeholder='Enter your full name' />

        <Text style={styles.label}>Email Address</Text>
        <TextInput style={styles.input} placeholder='Enter your email address' />

        <Text style={styles.label}>Password</Text>
        <TextInput style={styles.input} placeholder='Enter your password' secureTextEntry />

        <Link href={"/(auth)/verify_otp"} style={styles.button_style}>
        <TouchableOpacity >
        <Link href={"/(auth)/verify_otp"}>
          <Text style={styles.button_text}>Sign Up</Text>
        </Link>
        </TouchableOpacity>
        </Link>

        <Text style={styles.login_text}>
          Already a user? <Link href={"/(auth)/login"} style={styles.red_colors}>LogIn</Link>
        </Text>
      </View>

      {/* Blank Space */}
      <View style={{ flex: 1 }}></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#FFF",
  },
  body_container: {
    flex: 2, // Takes the middle space
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  signup_title: {
    fontSize: 19,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  button_style: {
    backgroundColor: "#F49B33",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 10,
    textAlign: "center",
  },
  button_text: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 16,
  },
  login_text: {
    textAlign: "center",
    marginTop: 15,
    fontSize: 14,
  },
  red_colors: {
    color: "#F49B33",
    fontWeight: 700,
  },
});

export default SignUp;