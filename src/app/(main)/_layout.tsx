import React from 'react'
import { Stack } from 'expo-router'

const MainStack = () => {
  return (
    <Stack screenOptions={{headerShown:false}}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  )
}

export default MainStack
