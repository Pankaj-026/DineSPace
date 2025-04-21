import { View, Text, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router/build/hooks';
import { router } from 'expo-router';
import url from "@/src/constants/axiosUrl";

const EmailVerification = () => {
  const [validUrl, setValidUrl] = useState(true);
  const [searchParams]: any = useLocalSearchParams();
  const token = searchParams.toLocaleString('token');

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const urlz = `${url}/api/users/verify-email/${token}`;
        const { data } = await axios.get(urlz);
        console.log(data);
        setValidUrl(true);
      } catch (error) {
        console.error("Verification failed", error);
        setValidUrl(false);
      }
    };
    verifyEmailUrl();
  }, [token]);

  return (
    <View style={{ padding: 20 }}>
      {validUrl ? (
        <>
          <Text>Email verified successfully!</Text>
          <Button title="Login" onPress={() => { router.push("/(auth)/login") }} />
        </>
      ) : (
        <Text>404 Not Found</Text>
      )}
    </View>
  );
};

export default EmailVerification;
