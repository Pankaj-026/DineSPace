import { View, Text, Image } from 'react-native'
import React from 'react'

const HomeHeader = () => {
    return (
        <View className='flex-row justify-between items-center px-2'>
            <View className='w-1/2 flex-row h-17 pt-5'>
                <View className='pr-2'>
                    <View className='overflow-hidden'>
                        <Image
                            source={require("@/src/assets/images/icon.png")}
                            style={{
                                width: 50,
                                height: 50,
                                borderWidth: 2,
                                borderColor: 'white',
                                borderRadius: 100,
                            }}
                            resizeMode="cover"
                        />
                    </View>
                </View>
                <View>
                    <Text className='text-base text-neutral-100  font-medium size-22'>Welcome Back</Text>
                    
                    <Text className='text-base size-18 whitespace-nowrap dark:text-white font-bold'>Pankaj Gupta</Text>
                </View>
            </View>
            
            {/* SP Points */}
            <View className='w-1/2 flex-row h14 space-x-4 justify-end items-center h-14'>
                <View className='bg-[#F49B33] border-2 border-white w-fit rounded-full px-4 justify-center h-full flex-row items-center space-x-2 gap-2'>
                    <View className='bg-gray-400 rounded-full w-8 h-8 justify-center items-center'>
                        <Text className='text-white font-semibold'>SP</Text>
                    </View>

                    <View className='justify-start items-center space-y-1'>
                        <Text className='text-base text-gray-200'>point</Text>
                        <Text className='text-white'>🔪 106</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default HomeHeader