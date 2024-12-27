import { signOut } from 'firebase/auth';
import { useRouter } from 'expo-router';
import { auth } from '@/firebase.config';
import { TouchableOpacity, Text } from 'react-native';
import React from 'react';

const LogoutButton = () => {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            router.replace('/(auth)/login'); // Redirect to login after logout
        } catch (error: any) {
            console.error('Error during logout:', error.message);
        }
    }; 

    return (
        <TouchableOpacity onPress={handleLogout}>
            <Text>Log out</Text>
        </TouchableOpacity>
    );
};

export default LogoutButton;
