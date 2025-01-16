import { View, Text, StatusBar, ActivityIndicator, TextInput, ScrollView, Keyboard, Image, ScrollViewBase } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeHeader from '@/src/components/HomeHeader';
import RestaurantCard from '@/src/components/RestuarantCard';
import RestuarantImg from '@/src/constants/imagePath';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';  // Axios for API calls

const Home = () => {
    const [isPending, setIsPending] = useState(false);
    const [restaurants, setRestaurants] = useState([]);  // Dynamically loaded restaurant data
    const [searchText, setSearchText] = useState("");
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

    // Fetch restaurant data from backend
    useEffect(() => {
        setIsPending(true);
        axios.get('http://192.168.0.101:5106/api/restaurants')
            .then(response => setRestaurants(response.data))
            .catch(error => console.error('Error fetching data:', error))
            .finally(() => setIsPending(false));

        StatusBar.setBarStyle('light-content');
        StatusBar.setBackgroundColor('#F49B33');

        // Keyboard event listeners
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setIsKeyboardVisible(true);
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setIsKeyboardVisible(false);
        });

        // Cleanup listeners
        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    function filteredData(searchText: string, restaurants: any) {
        return restaurants.filter((res: any) =>
            res.name.toLowerCase().includes(searchText.toLowerCase())
        );
    }

    return (
        <SafeAreaView className='flex-1 bg-[#F5F7FA] relative'>
            {isPending && (
                <View className="absolute z-50 w-full h-full justify-center items-center">
                    <View className="bg-[#000000] w-full h-full justify-center items-center opacity-50" />
                    <ActivityIndicator size="large" color="#F49B33" className="absolute" />
                </View>
            )}

            <ScrollView
                contentContainerStyle={{ paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Header Section */}
                <View
                    className={`h-80 justify-start border-orange-600 w-full bg-[#F49B33] ${isKeyboardVisible ? 'mb-0' : ''}`}
                    style={{ borderBottomEndRadius: 25, borderBottomStartRadius: 25 }}
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
                                    axios.get('http://192.168.0.100:5106/api/restaurants')
                                        .then(response => setRestaurants(response.data))
                                        .catch(error => console.error('Error fetching data:', error));
                                } else {
                                    const data = filteredData(e.nativeEvent.text, restaurants);
                                    setRestaurants(data);
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
                    {restaurants.length > 0 ? (
                        restaurants.map((restaurant: any) => (
                            <RestaurantCard
                                key={restaurant._id}
                                id={restaurant._id}
                                name={restaurant.name}
                                address={restaurant.address}
                                rating={restaurant.rating}
                                discount={restaurant.discount}
                                origin={restaurant.origin}
                                imageUrl={restaurant.imageUrl}
                            />
                        ))
                    ) : (
                        <Text className="text-center text-gray-600 mt-10 font-medium">No Results Found</Text>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;
