import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { Link, useRouter } from 'expo-router';
import { login } from "@/services/api";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginMain() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    setErrorMessage("");
  };

  const validateForm = () => {
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
      const response = await login(formData);
      Alert.alert("Success", "Login Successful!");
      
      const { id, name, email, admin, owner, profilePic } = response.data.user;
      const token = response.data.token;

      await AsyncStorage.setItem("userData", 
        JSON.stringify({ token, id, name, email, admin, owner, profilePic })
      );

      router.push('/(main)/(tabs)');
    } catch (error: any) {
      const message = error.response?.data?.message || "An error occurred";
      setErrorMessage(message);
      Alert.alert("Error", message);
    }
  };

  return (
    <View className="flex-1 justify-center px-6 py-16">
      <Text className="text-lg font-bold text-center mb-5">Welcome Back!</Text>

      <Text className="text-sm font-medium mb-2">Email Address</Text>
      <TextInput
        className="border border-gray-300 rounded-lg px-3 py-2 mb-4 text-base"
        placeholder="Enter your email address"
        value={formData.email}
        onChangeText={(text) => handleChange("email", text)}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text className="text-sm font-medium mb-2">Password</Text>
      <View className="border border-gray-300 rounded-lg mb-4 flex-row items-center">
        <TextInput
          className="flex-1 px-3 py-2 text-base"
          placeholder="Enter your password"
          value={formData.password}
          onChangeText={(text) => handleChange("password", text)}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          className="px-3 py-2"
          onPress={() => setShowPassword(!showPassword)}
        >
          <Text className="text-[#F49B33] font-medium">
            {showPassword ? 'Hide' : 'Show'}
          </Text>
        </TouchableOpacity>
      </View>

      {errorMessage && (
        <Text className="text-red-500 text-center mb-3">{errorMessage}</Text>
      )}

      <TouchableOpacity 
        className="bg-[#F49B33] rounded-lg py-3 mt-2" 
        onPress={handleSubmit}
      >
        <Text className="text-white text-center font-semibold">Log In</Text>
      </TouchableOpacity>

      <Text className="text-center mt-4 text-sm">
        Don't have an account?{" "}
        <Link href={"/(auth)/signUp"} className="text-[#F49B33] font-semibold">
          Sign Up
        </Link>
      </Text>
    </View>
  );
}