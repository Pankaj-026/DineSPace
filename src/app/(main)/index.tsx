import { View, Text } from 'react-native'
import React from 'react'
import { userNames } from '@/src/app/(auth)/storeUserName';

const Main = () => {
  return (
    <View>
      <Text>Hello {userNames},Welcome to DineSPace</Text>
      <Text>Login SuccessFull...............................</Text>
    </View>
  )
}

export default Main
