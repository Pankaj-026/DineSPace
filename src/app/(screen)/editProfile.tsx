import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import url from '@/src/constants/axiosUrl';

const API_URL = `${url}/api/users`;

export default function EditProfile() {
  const [name, setName] = useState('');
  const [userData, setUserData] = useState({ token: '' });

  useEffect(() => {
    const fetchUserData = async () => {
      const storedData = await AsyncStorage.getItem("userData");
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setName(parsedData.name);
        setUserData(parsedData);
      }
    };
    fetchUserData();
  }, []);

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `${API_URL}/update-name`,
        { name },
        { headers: { Authorization: `Bearer ${userData.token}` } }
      );

      if (response.data.success) {
        // Update local storage
        const storedData = await AsyncStorage.getItem("userData");
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          parsedData.name = name;
          await AsyncStorage.setItem("userData", JSON.stringify(parsedData));
        }

        Alert.alert("Success", "Profile updated successfully");
        router.back();
      }
    } catch (error) {
      Alert.alert("Error", "Failed to update profile");
    }
  };

  return (
    <>
      <View className="flex-1 bg-gray-100 p-4">
        <View className="bg-white rounded-lg p-4">
          <View className="flex-row items-center mb-4">
            <Feather name="user" size={20} color="#4B5563" className="mr-2" />
            <Text className="text-base font-bold text-gray-700">Full Name</Text>
          </View>

          <TextInput
            className="border border-gray-300 rounded-lg p-3 text-base"
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
            autoFocus
          />
        </View>

        <TouchableOpacity
          className="bg-blue-500 rounded-lg p-4 mt-8 items-center"
          onPress={handleSave}
        >
          <Text className="text-white font-bold text-base">Save Changes</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
