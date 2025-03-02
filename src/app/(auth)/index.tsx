import { View, Text, StyleSheet, Image, ActivityIndicator, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import imagePath from '@/src/constants/imagePath'
import { router } from 'expo-router'

const Auth = () => {

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(true)
      setTimeout(() => {
        router.push("/(auth)/startPage")
      }, 3000)
    }, 4000)


    StatusBar.setBarStyle('dark-content');
    StatusBar.setBackgroundColor('#F49B33');
    return () => {
      clearTimeout(timeout);
    }

  }, [])

  return (
    <SafeAreaView style={styles.container}>


      <View style={styles.header} />

      <View style={styles.body}>
        <Image source={imagePath.DineSPace_logo} style={styles.DSP_logo} resizeMode='contain' />
      </View>


      <View style={styles.footer}>
        {
          isLoading ? (
            <>
              <ActivityIndicator size={40} color={"#fff"} />
              <Text style={styles.SP_loading}>Loading...</Text>
            </>
          ) : (
            <>
              <Text style={styles.from__text}>from</Text>
              <Text style={styles.SP_text}>Pankaj Gupta</Text>
            </>)
        }
      </View>

      {/* <View style={styles.header}>
        <Image source={imagePath.Splash_footer_immage} style={styles.index_img} resizeMode='contain' />
      </View> */}

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 50,
  },
  header: {
  },
  body: {
  },
  footer: {
    height: 40,
    width: 100,
    alignItems: "center",
    paddingVertical: 50,
  },
  from__text: {
    fontSize: 12,
    color: "gray"
  },
  SP_text: {
    fontSize: 15,
    color: "white"
  },
  DSP_logo: {
    // height: 100,
  },
  SP_loading: {
    fontSize: 15,
    color: "#fff",
    margin: 10,
  },
  // index_img: {
  //   width: 290,
  //   position: "absolute",
  //   bottom: -130,
  //   left: -120,
  // },
})

export default Auth