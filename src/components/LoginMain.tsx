import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { Link, useRouter } from 'expo-router';
import { login } from "@/services/api";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginMain() {
  
  const router = useRouter();
  const [formData, setFormData] = useState({ id:"", email: "", password: "" });
  const [ErrorMessage, setErrorMessage] = useState("");

  const handleChange = (key: any, value: any) => {
    setFormData({ ...formData, [key]: value });
  };


// In the handleSubmit function after successful login:
const handleSubmit = async () => {
    try {
        const response = await login(formData);
        Alert.alert("Success", "Login Successful!");
        const { id, name, email } = response.data.user;
        console.log(response.data)
        
        // Store user data securely
        await AsyncStorage.setItem("userData", JSON.stringify({ id, name, email }));

        router.push('/(main)/(tabs)');
    } catch (error: any) {
        setErrorMessage(error.response?.data?.message || "An error occurred");
        Alert.alert("Error", error.response?.data?.message || "An error occurred");
        console.log("Error: ", error);
    }
};


  return (
    <View className="flex-1 justify-center px-6 py-16">
      <Text className="text-lg font-bold text-center mb-5">Let's Get You Started</Text>

      <Text className="text-sm font-medium mb-2">Email Address</Text>
      <TextInput
        className="border border-gray-300 rounded-lg px-3 py-2 mb-4 text-base"
        placeholder="Enter your email address"
        value={formData.email}
        onChangeText={(text) => handleChange("email", text)}
        keyboardType="email-address"
      />

      <Text className="text-sm font-medium mb-2">Password</Text>
      <TextInput
        className="border border-gray-300 rounded-lg px-3 py-2 mb-4 text-base"
        placeholder="Enter your password"
        value={formData.password}
        onChangeText={(text) => handleChange("password", text)}
        secureTextEntry
      />

      {ErrorMessage && (
        <Text className="text-red-500 text-center mb-3">{ErrorMessage}</Text>
      )}

      <TouchableOpacity className="bg-[#F49B33] rounded-lg py-3 mt-2" onPress={handleSubmit}>
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
