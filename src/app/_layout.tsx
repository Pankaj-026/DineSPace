import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { Redirect, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import "@/global.css";
import axios from 'axios';
import url from '../constants/axiosUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
    const [isLogin, setIsLogin] = useState<boolean | null>(null); // Set to null initially
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        SplashScreen.hideAsync();
    }, []);

    useEffect(() => {
        (async () => {
            try {
                let userInfoString = await AsyncStorage.getItem("userData");

                if (!userInfoString) {
                    setIsLogin(false);
                    return;
                }

                let UserInfo: { id: string } | null = JSON.parse(userInfoString);
                if (!UserInfo || !UserInfo.id) {
                    setIsLogin(false);
                    return;
                }

                const response = await axios.get(`${url}/api/users/user/${UserInfo.id}`);
                let data = response.data;

                if (data?.status) {
                    setIsLogin(true);
                } else {
                    setIsLogin(false);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                setIsLogin(false);
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    if (isLoading || isLogin === null) return null; 

    return (
        <>
            <Stack screenOptions={{ headerShown: false }} />
            {isLogin ? <Redirect href={"/(main)/(tabs)"} /> : <Redirect href={"/(auth)/startPage"} />}
        </>
    );
};

export default RootLayout;
