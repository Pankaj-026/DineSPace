import React, { useEffect, useState } from 'react'
import { Redirect, Stack, Slot } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'


SplashScreen.preventAutoHideAsync();

const RootLayout = () => {

    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        SplashScreen.hideAsync();
    }, [])

    return (
        <>
            <Stack screenOptions={{ headerShown: false }} />
            {
                isLogin ? <Redirect href={"/(main)"} /> : <Redirect href={"/(auth)"} />
            }

        </>
    )
}

export default RootLayout;