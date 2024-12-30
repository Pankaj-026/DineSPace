import { signOut } from 'firebase/auth';
import { useRouter } from 'expo-router';
import { auth } from '@/firebase.config';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import React, { useState } from 'react';

const LogoutButton = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleLogout = async () => {
        setIsLoading(true);
        setErrorMessage("");

        try {
            await signOut(auth);
            router.replace('/(auth)/login'); // Redirect to login
        } catch (error: any) {
            console.error('Error during logout:', error.message);
            setErrorMessage("Failed to log out. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View>
            {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
            <TouchableOpacity onPress={handleLogout} style={styles.button}>
                {isLoading ? (
                    <ActivityIndicator size="small" color="#ffffff" />
                ) : (
                    <Text style={styles.buttonText}>Log out</Text>
                )}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#ff5c5c',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
        textAlign: 'center',
    },
});

export default LogoutButton;
