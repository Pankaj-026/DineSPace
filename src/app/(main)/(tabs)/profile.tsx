import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LogoutButton from '@/src/components/Logout';
import DineSpace_Header from '@/src/components/DineSPace-header';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const Profile = () => {
  const [userData, setUserData] = useState<{ id: String, name: string; email: string }>({ id: "", name: "", email: "" });

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      const storedData = await AsyncStorage.getItem("userData");
      if (storedData) {
        setUserData(JSON.parse(storedData));
      }
    };

    fetchUserData();
  }, []);

  return (
    <ScrollView className="flex-1 bg-gray-100">
      <SafeAreaView>

        {/* Header */}
        <DineSpace_Header route={'/(main)/(tabs)'} name="Profile" />

        {/* Profile Section */}
        <View className="bg-white p-6 m-4 rounded-lg shadow items-center">
          <Image
            source={{ uri: 'https://res.cloudinary.com/drwy0czge/image/upload/v1737036087/vz9pikjzarahf3sxppkj.png' }}
            className="w-24 h-24 rounded-full mb-4"
          />
          <Text className="text-lg font-bold">{userData.name || "User Name"}</Text>
          <Text className="text-sm text-gray-500">{userData.email || "user@example.com"}</Text>
          {/* <Text className="text-sm text-gray-500">{userData.id || "user@example.com"}</Text> */}
          <Text className="text-sm text-gray-500">+91 1234567890</Text>
        </View>

        {/* Action Buttons */}
        <View className="bg-white m-4 rounded-lg shadow p-4">
          <TouchableOpacity className="flex-row items-center py-4 border-b border-gray-200">
            <Text className="text-base font-bold text-black flex-1">Edit Profile</Text>
            <Text className="text-gray-400">{'>'}</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center py-4 border-b border-gray-200" onPress={() => router.push("/(admin)/admin")}>
            <Text className="text-base font-bold text-black flex-1">View Bookings</Text>
            <Text className="text-gray-400">{'>'}</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center py-4 border-b border-gray-200">
            <Text className="text-base font-bold text-black flex-1">Payment Methods</Text>
            <Text className="text-gray-400">{'>'}</Text>
          </TouchableOpacity>

          <LogoutButton />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Profile;
