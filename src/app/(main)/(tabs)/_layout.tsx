import { View, Text } from 'react-native'
import React from 'react'
import { Stack, Tabs } from 'expo-router'
import { FontAwesome, FontAwesome6 } from '@expo/vector-icons'

const TabRootLayout = () => {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#F49B33' }}>
      <Tabs.Screen
        name="index"
        options={{
            title: 'Home',
            headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="order"
        options={{
          title: 'Bookings',
          tabBarIcon: ({ color }) => <FontAwesome6 size={24} name="calendar" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
        }}
      />
    </Tabs>
  )
}

export default TabRootLayout