import { router } from "expo-router";
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface RestaurantCardProps {
  id: string;
  name: string;
  address: string;
  rating: number;
  discount: number;
  origin: string;
  imageUrl: string;
}

const RestaurantCard = ({ id, name, address, rating, discount, origin, imageUrl }: RestaurantCardProps) => {
  return (
    <TouchableOpacity
      className="bg-white rounded-lg mx-4 my-3 shadow-sm overflow-hidden"
      onPress={async () => {
        try {
          await AsyncStorage.setItem("SingleRestaurantDetails", id);
          router.push(`/(screen)/RestuarantDetailsScreen`);
        } catch (error) {
          console.error("Error saving restaurant ID:", error);
        }
      }}

    >
      <Image
        source={{ uri: imageUrl }}
        style={{ width: '100%', height: 190, resizeMode: 'cover' }}
      />
      <View className="p-4">
        <Text className="text-lg font-bold text-gray-800">{name}</Text>
        <Text className="text-sm text-gray-600 mt-1">{address}</Text>
        <Text className="text-sm text-gray-500 mt-1">{origin}</Text>
        <View className="flex-row justify-between items-center mt-3">
          <Text className="text-sm font-semibold text-green-600">⭐ {rating}</Text>
          <Text className="text-sm font-semibold text-orange-600">Flat {discount}% OFF</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;
