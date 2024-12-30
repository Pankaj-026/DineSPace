import { View, Text, StatusBar, ActivityIndicator, TextInput, ScrollView, Keyboard, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeHeader from '@/src/components/HomeHeader';
import RestaurantCard from '@/src/components/RestuarantCard';
import RestuarantImg from '@/src/constants/imagePath';
import RestuarantList from '@/src/components/RestuarantList';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

const Home = () => {
    const [isPending, setIsPending] = useState(false);
    const [restuarants, setRestuarants] = useState(RestuarantList);
    const [searchText, setSearchText] = useState("");
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false); // Track keyboard visibility

    function filteredData(searchText: any, restuarants: any) {
        return restuarants.filter((res: any) =>
            res.name.toLowerCase().includes(searchText.toLowerCase())
        );
    }

    useEffect(() => {
        setIsPending(true);
        setTimeout(() => {
            setIsPending(false);
        }, 3000);

        StatusBar.setBarStyle('light-content');
        StatusBar.setBackgroundColor('#F49B33');

        // Keyboard event listeners to hide or show tabs based on keyboard visibility
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setIsKeyboardVisible(true);
        });

        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setIsKeyboardVisible(false);
        });

        // Clean up event listeners on component unmount
        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    return (
        <SafeAreaView className='flex-1 bg-[#F5F7FA] relative'>
            {isPending && (
                <View className="absolute z-50 w-full h-full justify-center items-center">
                    <View className="bg-[#000000] w-full h-full justify-center items-center opacity-50" />
                    <ActivityIndicator size="large" color="#F49B33" className="absolute" />
                </View>
            )}

            <ScrollView
                contentContainerStyle={{ paddingBottom: 20 }} // Ensures space at the bottom for scrolling
                showsVerticalScrollIndicator={false}
            >
                {/* Header Section */}
                <View
                    className={`h-80 justify-start border-orange-600 w-full bg-[#F49B33] ${isKeyboardVisible ? 'mb-0' : ''}`} // Hide tabs when keyboard is visible
                    style={{
                        borderBottomEndRadius: 25,
                        borderBottomStartRadius: 25,
                    }}
                >
                    <HomeHeader />

                    {/* Search */}
                    <View className="flex-row items-center bg-white rounded-full shadow px-6 py-2 mx-3 mt-6 gap-2">
                        <FontAwesome name="search" size={20} color="#F49B33" />
                        <TextInput
                            placeholder="Explore Restaurants"
                            placeholderTextColor="#888"
                            className="flex-1 text-gray-700 border-collapse border-white"
                            value={searchText}
                            onChange={(e) => {
                                setSearchText(e.nativeEvent.text);
                                if (!e.nativeEvent.text) {
                                    setRestuarants(RestuarantList);
                                } else {
                                    const data = filteredData(e.nativeEvent.text, RestuarantList);
                                    setRestuarants(data);
                                }
                            }}
                        />
                        <MaterialIcons name="keyboard-voice" size={23} color="#F49B33" />
                    </View>

                    <Image source={RestuarantImg.lightStrip} className='w-full h-28 object-cover' />
                    <Text className='text-white text-center font-bold text-lg'>DineSPace MealMap</Text>
                </View>

                {/* Restaurant Cards */}
                <View className="px-4 mt-4">
                    {restuarants.length > 0 ? (
                        restuarants.map((restaurant:any) => (
                            <RestaurantCard key={restaurant.id} {...restaurant}  />
                        ))
                    ) : (
                        <Text className="text-center text-gray-600 mt-10 font-medium">
                            No Results Found
                        </Text>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;
