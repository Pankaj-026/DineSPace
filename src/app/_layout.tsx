import React, { useEffect, useState } from 'react'
import { Redirect, Stack, Slot } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
// import { signInWithEmailAndPassword } from 'firebase/auth'
// import { auth } from '@/firebase.config'
import "@/global.css"


SplashScreen.preventAutoHideAsync();

const RootLayout = () => {

    const [isLogin, setIsLogin] = useState(true);
    // let email = "luffyyy.00001@gmail.com"
    // let password = "Pankaj026"

    useEffect(() => {
        SplashScreen.hideAsync();
    }, [])

    // const checkLogin = () => {

    //     signInWithEmailAndPassword(auth, email, password)
    //         .then((userCredential) => {
    //             const user = userCredential.user;

    //             if (user.emailVerified) {
    //                 setIsLogin(true)

    //             } else {
    //                 setIsLogin(false)
    //             }
    //         })
    // }

    // { checkLogin() }
    return (
        <>
            <Stack screenOptions={{ headerShown: false }} />
            {
                isLogin ? <Redirect href={"/(main)/(tabs)"} /> : <Redirect href={"/(auth)"} />
            }

        </>
    )
}

export default RootLayout;