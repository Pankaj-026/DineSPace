import { View, TextInput } from 'react-native';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons'; // For the search icon
import { MaterialIcons } from '@expo/vector-icons'; // For the microphone icon

const MainSearchBar = () => {
  return (

    <View className="flex-row items-center bg-white rounded-full shadow px-6 py-2 mx-3 mt-6">
      {/* Search Icon */}
      <FontAwesome name="search" size={20} color="#F49B33" className="mr-2" />
      {/* Text Input */}
      <TextInput
        placeholder="Explore Restuarants"
        placeholderTextColor="#888"
        className="flex-1 text-gray-700"
      />
      {/* Microphone Icon */}
      <MaterialIcons name="keyboard-voice" size={23} color="#F49B33" />
    </View>
  );
};

export default MainSearchBar;
