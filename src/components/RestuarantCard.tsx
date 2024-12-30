import { router } from "expo-router";
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

const RestaurantCard = ({ name, address, rating, discount, origin, imageUrl }: any) => {
  return (
    <TouchableOpacity className="bg-white rounded-lg mx-4 my-3 shadow-sm overflow-hidden" 
    onPress={() => router.push('/RestuarantDetailsScreen')}
    >
      {/* Image Section */}
      <Image
        source={imageUrl}
        // className="h-32 w-full object-cover"
        style={{
          width: '100%',
          height: 190, // Adjust for landscape
          resizeMode: 'cover',
        }
        }
      />

      {/* Content Section */}
      <View className="p-4">
        {/* Restaurant Name */}
        <Text className="text-lg font-bold text-gray-800">{name}</Text>
        {/* Address */}
        <Text className="text-sm text-gray-600 mt-1">{address}</Text>
        {/* Cuisine */}
        <Text className="text-sm text-gray-500 mt-1">{origin}</Text>
        {/* Rating & Discount */}
        <View className="flex-row justify-between items-center mt-3">
          <Text className="text-sm font-semibold text-green-600">⭐ {rating}</Text>
          <Text className="text-sm font-semibold text-orange-600">
            Flat {discount}% OFF
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;
