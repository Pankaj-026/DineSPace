import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Button } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState } from 'react'
import HeaderComponent from '@/src/components/DineSPace-header'
import LoginBody from '@/src/components/LoginMain'



const login = () => {
    return (
        <SafeAreaView style={styles.container}>
            <HeaderComponent />

            <LoginBody />

            <View style={{ flex: 1 }}></View>


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: "#FFF",
    },

})

export default login
