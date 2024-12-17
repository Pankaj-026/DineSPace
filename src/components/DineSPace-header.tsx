import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function DineSpace_Header() {
    return (
        <View style={styles.header_container}>
            <Link href={"/(auth)/startPage"}>
                <AntDesign name="left" color={"#F49B33"} size={18} />
            </Link>
            <Text style={styles.header_title}>DineSPace</Text>
            <View></View>
        </View>
    )
}

const styles = StyleSheet.create({
    header_container: {
        height: 60, 
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 15,
        backgroundColor: "white", 
        zIndex: 99,
    },
    header_title: {
        fontSize: 24,
        fontWeight: "700",
    },
})