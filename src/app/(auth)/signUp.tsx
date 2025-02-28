import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import DineSPaceHeader from '@/src/components/DineSPace-header';
import { signup } from '@/services/api'

const SignUp = ({ navigation }: any) => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (key: any, value: any) => {
    setFormData({ ...formData, [key]: value });
    setErrorMessage(""); // Clear error on input change
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setErrorMessage("Name is required");
      return false;
    }
    if (!formData.email.trim()) {
      setErrorMessage("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setErrorMessage("Please enter a valid email address");
      return false;
    }
    if (!formData.password) {
      setErrorMessage("Password is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const response = await signup(formData);
      Alert.alert("Success", response.data.message);
      setFormData({ name: "", email: "", password: "" });
      navigation.navigate("./login.tsx");
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "An error occurred");
      Alert.alert("Error", error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <DineSPaceHeader route={'/(auth)/startPage'} name="DineSPace" />

        <View style={styles.body_container}>
          <Text style={styles.signup_title}>Let's Get You Started</Text>

          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            value={formData.name}
            onChangeText={(text) => handleChange("name", text)}
          />

          <Text style={styles.label}>Email Address</Text>
          <TextInput 
            style={styles.input}
            placeholder='Enter your email address'
            value={formData.email}
            onChangeText={(text) => handleChange("email", text)}
            keyboardType='email-address'
            autoCapitalize='none'
          />

          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder='Enter your password'
              value={formData.password}
              onChangeText={(text) => handleChange("password", text)}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              style={styles.toggleButton}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Text style={styles.toggleText}>
                {showPassword ? 'Hide' : 'Show'}
              </Text>
            </TouchableOpacity>
          </View>

          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}

          <TouchableOpacity style={styles.button_style} onPress={handleSubmit}>
            <Text style={styles.button_text}>Sign Up</Text>
          </TouchableOpacity>

          <Text style={styles.login_text}>
            Already an user?{' '}
            <Link href={"/(auth)/login"} style={styles.red_colors}>
              LogIn
            </Link>
          </Text>
        </View>
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
    flex: 2,
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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    padding: 10,
  },
  toggleButton: {
    padding: 10,
  },
  toggleText: {
    color: '#F49B33',
    fontWeight: '500',
  },
  button_style: {
    backgroundColor: "#F49B33",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 10,
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
    fontWeight: '700',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default SignUp;