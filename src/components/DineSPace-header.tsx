import { AntDesign } from "@expo/vector-icons";
import { Link, LinkProps } from "expo-router"; // Import LinkProps
import React from "react";
import { View, Text, StyleSheet } from "react-native";

type DineSpaceHeaderProps = {
  route: LinkProps<any>["href"],
  name: String,
};

export default function DineSpace_Header({ route, name }: DineSpaceHeaderProps) {
  return (
    <View style={styles.header_container}>
      <Link href={route}>
        <AntDesign name="left" color={"#F49B33"} size={18} />
      </Link>
      <Text style={styles.header_title}>{name}</Text>
      <View></View>
    </View>
  );
}

const styles = StyleSheet.create({
  header_container: {
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    // marginTop: 40,
    backgroundColor: "white",
    zIndex: 99,
  },
  header_title: {
    fontSize: 20,
    fontWeight: "700",
  },
});
