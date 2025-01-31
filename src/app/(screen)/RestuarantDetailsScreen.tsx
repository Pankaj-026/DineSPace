import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Keyboard,
    Linking,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import url from "@/src/constants/axiosUrl";

export default function RestaurantDetailsScreen() {
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [resId, setResId] = useState<{ id: string }>({ id: "" });
    const [restaurantDetails, setRestaurantDetails] = useState<any>([]);

    useEffect(() => {
        const fetchRestuarantData = async () => {
            try {
                const storedId = await AsyncStorage.getItem("SingleRestaurantDetails");
                if (storedId) {
                    setResId({ id: storedId });
                }
            } catch (error) {
                console.error("Error fetching stored restaurant ID:", error);
            }
        };

        fetchRestuarantData();

        const keyboardShowListener = Keyboard.addListener(
            "keyboardDidShow",
            () => setKeyboardVisible(true)
        );
        const keyboardHideListener = Keyboard.addListener(
            "keyboardDidHide",
            () => setKeyboardVisible(false)
        );

        return () => {
            keyboardShowListener.remove();
            keyboardHideListener.remove();
        };
    }, []);

    useEffect(() => {
        if (resId.id) {
            axios
                .get(`${url}/api/restaurants/${resId.id}`)
                .then((response) => {
                    setRestaurantDetails(response.data);
                    // console.log(response.data);
                    // console.log(resId.id);
                })
                .catch((error) => console.error("Error fetching data:", error));
        }
    }, [resId]);

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView className="flex-1">
                {/* Header */}
                <View className="flex-row items-center justify-between p-4">
                    <TouchableOpacity onPress={() => router.push("/(main)/(tabs)/")}>
                        <Ionicons name="arrow-back" size={24} color="black" />
                    </TouchableOpacity>
                    <View className="flex-1 mx-4">
                        <Text className="text-lg font-bold text-black">
                            {restaurantDetails.name}
                        </Text>
                        <Text className="text-sm text-gray-500">
                            {restaurantDetails?.address}
                        </Text>
                    </View>
                    {/* <View className="flex-row space-x-4">
                        <Ionicons name="heart-outline" size={24} color="black" />
                        <Ionicons
                            name="share-social-outline"
                            size={24}
                            color="black"
                        />
                    </View> */}
                </View>

                {/* Restaurant Info Card */}
                <View className="bg-white shadow-lg rounded-lg mx-4 mb-4">
                    <Image
                        source={{
                            uri: restaurantDetails.imageUrl,
                        }}
                        className="w-full h-48 rounded-t-lg"
                    />
                    <View className="p-4">
                        <View>
                            <View>
                                <Text className="text-lg font-bold text-black">
                                    {restaurantDetails.name}
                                </Text>
                                <Text className="text-sm text-gray-500">
                                    {restaurantDetails.address}
                                </Text>
                                <Text className="text-sm text-gray-500">
                                    {restaurantDetails.origin}
                                </Text>
                            </View>
                            <View>
                                <Text className="text-purple-600 font-bold">
                                    Flat {restaurantDetails.discount} % Discount
                                </Text>
                            </View>
                        </View>
                        {/* Opening and Closing Times */}
                        <View className="flex-row items-center justify-between mt-4">
                            <View className="flex-row items-center space-x-2 gap-2">
                                <Text className="text-green-600 font-bold">
                                    Open
                                </Text>
                                <Text className="text-gray-500">{restaurantDetails.opens}: 00 </Text>
                            </View>
                            <View className="flex-row items-center space-x-2 gap-2">
                                <Text className="text-red-600 font-bold">
                                    Close
                                </Text>
                                <Text className="text-gray-500">{restaurantDetails.closes}: 00 </Text>
                            </View>
                            <View className="flex-row space-x-4">
                                {/* <MaterialIcons
                                    name="navigate-next"
                                    size={24}
                                    color="#666"
                                /> */}
                                <Ionicons name="call-outline" size={24} color="#666" onPress={() => Linking.openURL(`tel:${restaurantDetails.contactNumber}`)} />
                            </View>
                        </View>
                    </View>
                    <View className="absolute top-4 right-4 bg-green-100 px-2 py-1 rounded-md">
                        <Text className="text-green-500 font-bold text-sm">
                            {restaurantDetails.googleRating} ⭐
                        </Text>

                    </View>
                </View>

                {/* Description */}
                <View className="px-4 mb-4">
                    <Text className="text-lg font-bold text-black mb-2">Description</Text>
                    <Text className="ml-2 text-gray-600">
                        {restaurantDetails.description}
                    </Text>
                </View>

                {/* Popular Dishes Section */}
                <View className="px-4 mb-4">
                    <Text className="text-lg font-bold text-black mb-2">
                        Popular Dishes
                    </Text>
                    <View className="flex-row flex-wrap space-x-4">
                        {restaurantDetails.popularDishes?.map((dish, index) => (
                            <View key={index} className="bg-gray-100 px-4 py-2 rounded-md mb-2">
                                <Text className="text-gray-600">{dish}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Contact Number Section */}
                {/* <View className="px-4 mb-4">
                    <Text className="text-lg font-bold text-black mb-2">Contact</Text>
                    <TouchableOpacity
                        onPress={() => Linking.openURL(`tel:${restaurantDetails.contactNumber}`)}
                        className="flex-row items-center space-x-2"
                    >
                        <Ionicons name="call-outline" size={20} color="#666" />
                        <Text className="text-blue-500">{restaurantDetails.contactNumber}</Text>
                    </TouchableOpacity>
                </View> */}

                {/* Menu Images Section */}
                <View className="px-4 mb-4">
                    <Text className="text-lg font-bold text-black mb-2">Menu</Text>
                    <ScrollView horizontal>
                        {restaurantDetails.menuImages?.map((image, index) => (
                            <Image
                                key={index}
                                source={{ uri: image }}
                                className="w-32 h-32 rounded-md mr-2"
                            />
                        ))}
                    </ScrollView>
                </View>

                {/* More Images Section */}
                <View className="px-4 mb-4">
                    <Text className="text-lg font-bold text-black mb-2">More Images</Text>
                    <ScrollView horizontal>
                        {restaurantDetails.moreImages?.map((image, index) => (
                            <Image
                                key={index}
                                source={{ uri: image }}
                                className="w-32 h-32 rounded-md mr-2"
                            />
                        ))}
                    </ScrollView>
                </View>

                {/* Cuisine Section */}
                <View className="px-4 mb-4">
                    <Text className="text-lg font-bold text-black mb-2">Cuisine</Text>
                    <View className="flex-row flex-wrap gap-2">
                        {restaurantDetails.cuisine?.map((cuisine, index) => (
                            <View key={index} className="bg-gray-100 px-4 py-2 rounded-md mb-2">
                                <Text className="text-gray-600">{cuisine}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Location */}
                <View className="px-4 mb-4">
                    <Text className="text-lg font-bold text-black mb-2">Location</Text>
                    <Text className="ml-2 text-gray-600">
                        {restaurantDetails.location}
                    </Text>
                </View>

                {/* Amenities Section */}
                <View className="px-4 mb-24">
                    <Text className="text-lg font-bold text-black mb-2">
                        Amenities ({restaurantDetails.amenities?.length})
                    </Text>
                    {restaurantDetails.amenities?.map((amenity, index) => (
                        <View key={index} className="flex-row items-center mb-2">
                            <Ionicons name="star" size={16} color="#FFD700" />
                            <Text className="ml-2 text-gray-600">{amenity}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>

            {/* Sticky Footer Button */}
            {!keyboardVisible && (
                <View className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-300 shadow-md">
                    <TouchableOpacity
                        className="bg-[#F49B33] py-3 rounded-md"
                        onPress={async () => {
                            try {
                                await AsyncStorage.setItem("BookingDetails", resId.id);
                                router.push(`/(screen)/Bookings`);
                            } catch (error) {
                                console.error("Error saving restaurant ID:", error);
                            }
                        }}
                    >
                        <Text className="text-center text-white font-bold text-lg">
                            Book a Table
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );
}
