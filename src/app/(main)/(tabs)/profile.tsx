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
  const imagePath = { uri: `${url}/${userData.profilePic.replace(/\\/g,"/")}` };

  // console.log('====================================');
  // console.log("userDataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa : ", imagePath);
  // console.log('====================================');
  
  useEffect(() => {
    fetchUserData(); // ✅ Always fetch fresh user data on screen load

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
  }, []);
  
  const fetchUserData = async () => {
    try {
      const storedData = await AsyncStorage.getItem("userData");
      // console.log(storedData);
      
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        console.log(parsedData);
        setUserData(parsedData);
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };


  const handleProfilePicUpdate = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log("aaaaaaaaaaaa", result);


    if (!result.canceled) {
      const localUri = result.assets[0].uri;
      const filename = localUri.split('/').pop();

      // Extract file type (e.g., image/jpg)
      const match = /\.(\w+)$/.exec(filename ?? '');
      const type = match ? `image/${match[1]}` : 'image';

      // Prepare form data
      const formData = new FormData();
      formData.append('profilePic', {
        uri: localUri,
        name: filename,
        type: type,
      } as any);

      try {
        const response = await axios.post(`${API_URL}/update-profile-pic`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${userData.token}`,
          },
        });

        if (response.data.user) {
          // ✅ Update state and AsyncStorage with the new profile picture
          const updatedUserData = { ...userData, profilePic: response.data.user.profilePic };
          setUserData(updatedUserData);
          await AsyncStorage.setItem("userData", JSON.stringify(updatedUserData));

          // console.log('====================================');
          // console.log("updatedUserData", updatedUserData);
          // console.log('====================================');

          Alert.alert("Success", "Profile picture updated successfully");
        }
      } catch (error) {
        Alert.alert("Error", "Failed to update profile picture");
      }
    }
  };

  // console.log("yooooooooooooooooooooooooooo", userData.profilePic);

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
              // source={{ uri: userData.profilePic.replace(/\\/g,"/") }}
              // source={`/backend/${userData.profilePic.replace(/\\/g,"/")}` }
              // source={`/backend/uploads/1740205107195-4fbeab32-22fb-4d5d-9511-4590754ee88d.jpeg` }
              // source={ images.dummy }
              source={imagePath}
              className="w-28 h-28 rounded-full mb-4"
            />
            <View className="absolute bottom-3 right-0 bg-white p-2 rounded-full">
              <Feather name="camera" size={20} color="#4B5563" />
            </View>
          </TouchableOpacity>

          <View className="flex-row justify-center items-center gap-2">
            <Text className="text-lg items-center font-bold text-center">
              {userData.name}
            </Text>
            <TouchableOpacity onPress={() => router.push("/(screen)/editProfile")}>
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
            onPress={() => router.push("/(screen)/editProfile")}
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

          <TouchableOpacity className="flex-row items-center py-4 border-b border-gray-200" onPress={() => router.push("/(tabs)/")}>
            <Feather name="credit-card" size={20} color="#4B5563" className="mr-4" />
            <Text className="text-base font-bold text-black flex-1">Restaurant</Text>
            <Feather name="chevron-right" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <LogoutButton />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Profile;