import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import DineSPaceHeader from '@/src/components/DineSPace-header';
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { auth, db } from "@/firebase.config"
import { doc, setDoc } from 'firebase/firestore';


const SignUp = () => {

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ErrorMessage, setErrorMessage] = useState("");
  const [emailSent, setEmailSent] = useState(false)
  const [userName, setUserName] = useState("");

  const handleInputChange = (setter: any) => (value: any) => {
    setter(value)
    if (ErrorMessage) {
      setErrorMessage("")
    }
  }

  const handleSignup = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        setDoc(doc(db, 'users', user.uid), {
          name: userName,
          email: user.email,
        }).catch((error) => {
          console.error("Error writing to Firestore:", error);
          setErrorMessage("Failed to save user data. Please try again.");
        });

        sendEmailVerification(user)
          .then(() => {
            alert(`A verification link has been sent to ${email}. Please verify your email.`);
            router.push('/(auth)/login')
          })
          .catch((error) => setErrorMessage("Error sending verification email"))
        setEmail('')
        setPassword('')
        setUserName('');

      })
      .catch((error) => {
        const ErrorMsg = error.message;
        setErrorMessage(ErrorMsg)
      })
  }

  return (
    <SafeAreaView style={styles.container}>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }} // Ensures space at the bottom for scrolling
        showsVerticalScrollIndicator={false}
      >


        {/* Header */}
        <DineSPaceHeader route={'/(auth)/startPage'} name="DineSPace" />

        {/* Main Body */}
        <View style={styles.body_container}>
          <Text style={styles.signup_title}>Let's Get You Started</Text>

          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            value={userName}
            onChangeText={handleInputChange(setUserName)}
          />

          <Text style={styles.label}>Email Address</Text>
          <TextInput style={styles.input}
            placeholder='Enter your email address'
            value={email}
            onChangeText={handleInputChange(setEmail)}
            keyboardType='email-address'
          />

          <Text style={styles.label}>Password</Text>
          <TextInput style={styles.input}
            placeholder='Enter your password'
            value={password}
            onChangeText={handleInputChange(setPassword)}
            secureTextEntry />

          {
            ErrorMessage && (
              <Text className="text-red-500 mb-4 text-center"> {ErrorMessage}</Text>
            )
          }

          <TouchableOpacity style={styles.button_style} onPress={handleSignup} >
            <Text style={styles.button_text}>Sign Up</Text>
          </TouchableOpacity>

          {
            emailSent && (
              <Text className='text-green-500 mt-4 text-center' >A verification email has been sent to your email address. Please verfiy yourself before login</Text>
            )
          }

          <Text style={styles.login_text}>
            Already an user? <Link href={"/(auth)/login"} style={styles.red_colors} >LogIn</Link>
          </Text>
        </View>

        {/* Blank Space */}
        <View style={{ flex: 1 }}></View>
        
      </ScrollView>
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

