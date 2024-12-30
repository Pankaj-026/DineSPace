import React, { useEffect, useState } from 'react'
import { Redirect, Stack, Slot } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import "@/global.css"
import { auth } from '@/firebase.config';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomePage from "@/src/app/(main)/(tabs)/index";
import RestaurantDetailsScreen from "@/src/app/(screen)/RestuarantDetailsScreen";

SplashScreen.preventAutoHideAsync();

const RootLayout = ({values}:any) => {

    const [isLogin, setIsLogin] = useState(true);


    useEffect(() => {
        SplashScreen.hideAsync();
    }, []);

    return (
        <>
            <Stack screenOptions={{ headerShown: false }} />
            {
                isLogin ? <Redirect href={"/(main)/(tabs)"} /> : <Redirect href={"/(auth)/startPage"} />
            }

        </>
    )
}

export default RootLayout;