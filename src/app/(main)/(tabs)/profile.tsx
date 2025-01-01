import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/firebase.config';
import LogoutButton from '@/src/components/Logout';
import DineSpace_Header from '@/src/components/DineSPace-header';

const Profile = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {

    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserName(docSnap.data().name);
            setUserEmail(docSnap.data().email);
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, []);


  return (
    <ScrollView className="flex-1 bg-gray-100">
      {/* Header */}
      <DineSpace_Header route={'/(main)/(tabs)'} name= "Profile" />

      {/* Profile Section */}
      <View className="bg-white p-6 m-4 rounded-lg shadow items-center">
        <Image
          source={{
            uri: 'https://via.placeholder.com/150', // Replace with the user's profile image URL
          }}
          className="w-24 h-24 rounded-full mb-4"
        />
        <Text className="text-lg font-bold">{userName}</Text>
        <Text className="text-sm text-gray-500">{userEmail}</Text>
        <Text className="text-sm text-gray-500">+91 1234567890</Text>
      </View>

      {/* Action Buttons */}
      <View className="bg-white m-4 rounded-lg shadow p-4">
        <TouchableOpacity className="flex-row items-center py-4 border-b border-gray-200">
          <Text className="text-base font-bold text-black flex-1">Edit Profile</Text>
          <Text className="text-gray-400">{'>'}</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center py-4 border-b border-gray-200">
          <Text className="text-base font-bold text-black flex-1">View Bookings</Text>
          <Text className="text-gray-400">{'>'}</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center py-4 border-b border-gray-200">
          <Text className="text-base font-bold text-black flex-1">Payment Methods</Text>
          <Text className="text-gray-400">{'>'}</Text>
        </TouchableOpacity>

       <LogoutButton />
      </View>
    </ScrollView>
  );
};

export default Profile;