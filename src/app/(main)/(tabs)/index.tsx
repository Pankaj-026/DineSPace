import { View, Text, StatusBar, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import HomeHeader from '@/src/components/HomeHeader';
import MainSearchBar from '@/src/components/MainSearchBar';

const Home = () => {
    const [isPending, setIsPending] = useState(false);

    useEffect(() => {
        setIsPending(true);
        setTimeout(() => {
            setIsPending(false);
        }, 3000);

        StatusBar.setBarStyle('light-content');
        StatusBar.setBackgroundColor('#F49B33');
    }, []);

    return (
        <SafeAreaView className='flex-1 items-center bg-[#F5F7FA] relative'>
            {
                isPending && (
                    <View className="absolute z-50 w-full h-full justify-center items-center">
                        <View className="bg-[#000000] w-full h-full justify-center items-center opacity-50" />
                        <View className="absolute">
                            <ActivityIndicator size="large" color="#F49B33" />
                        </View>
                    </View>
                )
            }

            <View className='h-80 mb-5 justify-start border-orange-600 w-full bg-[#F49B33] relative'
                style={{
                    borderBottomEndRadius: 25,
                    borderBottomStartRadius: 25
                }}
            >
                <HomeHeader />
                <MainSearchBar />
            </View>
        </SafeAreaView>
    );
}

export default Home;
