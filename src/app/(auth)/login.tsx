import { View, StyleSheet, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import HeaderComponent from '@/src/components/DineSPace-header'
import LoginBody from '@/src/components/LoginMain'

const login = () => {


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={{ paddingBottom: 20 }} // Ensures space at the bottom for scrolling
                showsVerticalScrollIndicator={false}
            >
                <HeaderComponent route={'/(auth)/startPage'} />
                <LoginBody />
                <View style={{ flex: 1 }}></View>

            </ScrollView>

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
