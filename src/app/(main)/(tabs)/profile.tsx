import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Alert, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons';
import LogoutButton from '@/src/components/Logout';
import DineSpace_Header from '@/src/components/DineSPace-header';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import url from '@/src/constants/axiosUrl';

const API_URL = `${url}/api/users`;

const Profile = () => {
  const [userData, setUserData] = useState({ id: '', name: '', email: '', profilePic: '', token: '' });
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    const fetchUserData = async () => {
      const storedData = await AsyncStorage.getItem("userData");
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setUserData(parsedData);
      }
    };
    fetchUserData();
    Animated.timing(fadeAnim, { toValue: 1, duration: 1000, useNativeDriver: true }).start();

  }, []);

  const handleProfilePicUpdate = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    });

    if (!result.canceled) {
      const formData = new FormData();
      const response = await fetch(result.assets[0].uri);
      const blob = await response.blob();
      formData.append("profilePic", blob, "profile.jpg");

      try {
        const response = await axios.post(`${API_URL}/update-profile-pic`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${userData.token}`
          }
        });

        if (response.data.success) {
          setUserData({ ...userData, profilePic: response.data.profilePic });
          Alert.alert("Success", "Profile picture updated successfully");
        }
      } catch (error) {
        Alert.alert("Error", "Failed to update profile picture");
      }
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-100">
      <SafeAreaView>
        <DineSpace_Header route={'/(main)/(tabs)'} name="Profile" />

        <Animated.View style={{ opacity: fadeAnim }} className="flex bg-white p-6 m-4 rounded-lg shadow items-center justify-center">
          <TouchableOpacity
            onPress={handleProfilePicUpdate}
            className='items-center relative'
          >
            <Image
              source={{ uri: userData.profilePic || 'https://res.cloudinary.com/drwy0czge/image/upload/v1737036087/vz9pikjzarahf3sxppkj.png' }}
              className="w-28 h-28 rounded-full mb-4"
            />
            <View className="absolute bottom-2 right-2 bg-white p-2 rounded-full">
              <Feather name="camera" size={20} color="#4B5563" />
            </View>
          </TouchableOpacity>

          <View className="flex-row items-center gap-2">
            <Text className="text-lg font-bold text-center">
              {userData.name}
            </Text>
            <TouchableOpacity onPress={() => router.push("/(screen)editProfile")}>
              <Feather name="edit" size={18} color="#4B5563" />
            </TouchableOpacity>
          </View>

          <Text className="text-center text-sm text-gray-500 mt-1">
            {userData.email || "user@example.com"}
          </Text>
        </Animated.View>

        <View className="bg-white m-4 rounded-lg shadow p-4">
          <TouchableOpacity
            className="flex-row items-center py-4 border-b border-gray-200"
            onPress={() => router.push("/(screen)editProfile")}
          >
            <Feather name="user" size={20} color="#4B5563" className="mr-4" />
            <Text className="text-base font-bold text-black flex-1">Edit Profile</Text>
            <Feather name="chevron-right" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center py-4 border-b border-gray-200"
            onPress={() => router.push("/(tabs)/order")}
          >
            <Feather name="calendar" size={20} color="#4B5563" className="mr-4" />
            <Text className="text-base font-bold text-black flex-1">View Bookings</Text>
            <Feather name="chevron-right" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center py-4 border-b border-gray-200">
            <Feather name="credit-card" size={20} color="#4B5563" className="mr-4" />
            <Text className="text-base font-bold text-black flex-1">Payment Methods</Text>
            <Feather name="chevron-right" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <LogoutButton />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Profile;