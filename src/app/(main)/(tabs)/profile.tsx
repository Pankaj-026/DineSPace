import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/firebase.config';
import { Text } from 'react-native';
import LogoutButton from '@/src/components/Logout';

const Profile = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserName(docSnap.data().name);
            setUserEmail(docSnap.data().email);
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
  
    fetchUserData();
  }, []);
  

  return (
    <>
      <Text>Welcome, {userName}!</Text>
      <Text>Email: {userEmail}</Text>
      <LogoutButton />
    </>
  );
};

export default Profile;