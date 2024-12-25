import { View, Text, StatusBar, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Home = () => {

    const [isPending, setIsPending] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsPending(true);
        }, 3000)
    })

    return (
        <View className='flex-1 items-center bg-[#F5F7FA] relative'>
            <StatusBar barStyle="light-content" />

            {
                isPending && (
                    <View className="absolute z-50 w-full h-full justify-center items-center">
                        <View className="bg-[#000000] w-full h-full justify-center items-center opacity-50" />
                        <View className="absolute">

                            <ActivityIndicator size="large" color="#F49B33" style={{
                                paddingTop: 20,
                            }} />
                        </View>
                    </View>
                )
            }

            <View className='h-64 mb-4 justufy-start border-orange-600 w-full bg-[#F49B33] relative pt-16'
                style={{
                    borderBottomEndRadius: 30,
                    borderBottomStartRadius: 30
                }}
            >
            </View>


        </View>
    )
}

export default Home