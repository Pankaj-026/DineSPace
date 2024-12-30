import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Keyboard
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { RouteProp } from "@react-navigation/native";
import RouteParamList  from "@/src/components/RestuarantList";

// type RestaurantDetailsProps = {
//     route: RouteProp<RouteParamList, "RestaurantDetails">;
// };



export default function RestaurantDetailsScreen() {

    // const { id, name, address, rating, discount, origin, imageUrl } = route.params;


    const [keyboardVisible, setKeyboardVisible] = useState(false)

    useEffect(() => {
        const ifKeyboardVisible = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true)
        })
        const ifKeyboardNotVisible = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false)
        })

        return () => {
            ifKeyboardNotVisible.remove()
            ifKeyboardVisible.remove()
        }
    }, [])

    return (
        <View className="flex-1 bg-white">
            {/* Main Scrollable Content */}
            <ScrollView className="flex-1">
                {/* Header */}
                <View className="flex-row items-center justify-between p-4">
                    <TouchableOpacity>
                        <Ionicons name="arrow-back" size={24} color="black" />
                    </TouchableOpacity>
                    <View className="flex-1 mx-4">
                        <Text className="text-lg font-bold text-black">
                            name
                        </Text>
                        <Text className="text-sm text-gray-500">
                            Marol, Mumbai
                        </Text>
                    </View>
                    <View className="flex-row space-x-4">
                        <Ionicons name="heart-outline" size={24} color="black" />
                        <Ionicons
                            name="share-social-outline"
                            size={24}
                            color="black"
                        />
                    </View>
                </View>

                {/* Restaurant Info Card */}
                <View className="bg-white shadow-lg rounded-lg mx-4 mb-4">
                    <Image
                        source={{
                            uri: "https://via.placeholder.com/300x200", // Replace with actual image
                        }}
                        className="w-full h-48 rounded-t-lg"
                    />
                    <View className="p-4">
                        <Text className="text-lg font-bold text-black">
                            Cray Craft
                        </Text>
                        <Text className="text-sm text-gray-500">
                            5.7 km • Marol, Mumbai
                        </Text>
                        <Text className="text-sm text-gray-500">
                            Chinese, Asian | ₹1400 for two
                        </Text>
                        <View className="flex-row items-center justify-between mt-4">
                            <View className="flex-row items-center space-x-2">
                                <Text className="text-green-600 font-bold">
                                    Open
                                </Text>
                                <Text className="text-gray-500">till 1:30AM</Text>
                            </View>
                            <View className="flex-row space-x-4">
                                <MaterialIcons
                                    name="navigate-next"
                                    size={24}
                                    color="#666"
                                />
                                <Ionicons name="call-outline" size={24} color="#666" />
                            </View>
                        </View>
                    </View>
                    <View className="absolute top-4 right-4 bg-green-100 px-2 py-1 rounded-md">
                        <Text className="text-green-600 font-bold text-lg">4.5</Text>
                        <Text className="text-xs text-gray-500">916 ratings</Text>
                        <Text className="text-xs text-gray-500">Google</Text>
                    </View>
                </View>

                {/* Useful Bits */}
                <Text className="text-center font-bold text-lg text-gray-700 border-t border-gray-300 py-4">
                    USEFUL BITS
                </Text>

                {/* Popular Dishes Section */}
                <View className="px-4 mb-4">
                    <Text className="text-lg font-bold text-black mb-2">
                        Popular Dishes
                    </Text>
                    <View className="flex-row flex-wrap space-x-4">
                        {["quesadilla", "sushi", "cocktails", "desserts", "drinks"].map(
                            (dish, index) => (
                                <View
                                    key={index}
                                    className="bg-gray-100 px-4 py-2 rounded-md mb-2"
                                >
                                    <Text className="text-gray-600">{dish}</Text>
                                </View>
                            )
                        )}
                    </View>
                </View>

                {/* Location Section */}
                <View className="px-4 mb-4">
                    <Text className="text-lg font-bold text-black mb-2">
                        Location
                    </Text>
                    <Text className="text-sm text-gray-500">
                        5.7 km • Unit No-06, Ground Floor, Town Centre Commercial
                        Premises Co-Op Society Ltd, Opp Times Square, Marol, A.K
                        Road, Andheri (East), Mumbai-400059, Greater Mumbai,
                        Maharashtra-400059
                    </Text>
                    <TouchableOpacity className="mt-2 flex-row items-center space-x-2">
                        <MaterialIcons name="navigate-next" size={20} color="#666" />
                        <Text className="text-blue-500">Get Directions</Text>
                    </TouchableOpacity>
                </View>

                {/* Amenities Section */}
                <View className="px-4 mb-4">
                    <Text className="text-lg font-bold text-black mb-2">
                        Amenities (3)
                    </Text>
                    {["Parking available", "Free WiFi", "SwiggyPay accepted"].map(
                        (amenity, index) => (
                            <View key={index} className="flex-row items-center mb-2">
                                <Ionicons name="star" size={16} color="#FFD700" />
                                <Text className="ml-2 text-gray-600">{amenity}</Text>
                            </View>
                        )
                    )}
                </View>

                {/* Comments/Feedback Section */}
                <View className="py-24 px-4 mb-4">
                    <Text className="text-lg font-bold text-black mb-2">
                        Comments & Feedback
                    </Text>
                    <View className="flex-row space-x-2 mb-4">
                        <Ionicons name="person-circle-outline" size={40} color="#666" />
                        <TextInput
                            placeholder="Write your feedback here..."
                            className="flex-1 border border-gray-300 rounded-lg p-2 text-gray-600"
                            multiline
                        />
                    </View>
                    <TouchableOpacity className="bg-[#F49B33] rounded-md py-2">
                        <Text className="text-center text-white font-bold">
                            Submit Feedback
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Sticky Footer Button */}
            {!keyboardVisible && (
                <View className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-300 shadow-md"
                >
                    <TouchableOpacity className="bg-[#F49B33] py-3 rounded-md">
                        <Text className="text-center text-white font-bold text-lg">
                            Book a Table
                        </Text>
                    </TouchableOpacity>
                </View>
            )
            }
        </View>
    );
}
