// import { View, Text } from 'react-native'
// import React from 'react'

// const profile = () => {
//   return (
//     <View>
//       <Text>profile</Text>
//     </View>
//   )
// }

// export default profile

import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/firebase.config';
import { Text } from 'react-native';
import LogoutButton from '@/src/components/Logout';

const Profile = () => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserName(docSnap.data().name);
        }
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <Text>Welcome, {userName}!</Text>
      <LogoutButton />
    </>
  );
};

export default Profile;
