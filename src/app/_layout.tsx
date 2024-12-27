import React, { useEffect, useState } from 'react'
import { Redirect, Stack, Slot } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import "@/global.css"


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
                isLogin ? <Redirect href={"/(main)/(tabs)"} /> : <Redirect href={"/(auth)/startPage"} />
            }

        </>
    )
}

export default RootLayout;



// import { signInWithEmailAndPassword } from 'firebase/auth'
// import { auth } from '@/firebase.config'
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
// let email = "luffyyy.00001@gmail.com"
// let password = "Pankaj026"



// import React, { useEffect, useState } from 'react';
// import { Redirect, Stack } from 'expo-router';
// import * as SplashScreen from 'expo-splash-screen';
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth } from '@/firebase.config';
// import '@/global.css';

// SplashScreen.preventAutoHideAsync();

// const RootLayout = () => {
//     const [isLogin, setIsLogin] = useState<boolean | null>(null); // `null` for loading state

//     useEffect(() => {
//         // Check user authentication status
//         const unsubscribe = onAuthStateChanged(auth, (user) => {
//             setIsLogin(!!user); // `true` if user exists, `false` otherwise
//         });

//         SplashScreen.hideAsync(); // Hide splash screen when the app is ready

//         return () => unsubscribe(); // Cleanup subscription on unmount
//     }, []);

//     if (isLogin === null) {
//         // Show a splash/loading screen while authentication status is being determined
//         return null;
//     }

//     return (
//         <>
//             <Stack screenOptions={{ headerShown: false }} />
//             {isLogin ? <Redirect href="/(main)/(tabs)" /> : <Redirect href="/(auth)" />}
//         </>
//     );
// };

// export default RootLayout;
