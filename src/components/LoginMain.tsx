import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import { Link } from 'expo-router'

export default function LoginMain() {

    return (

        <View style={styles.body_container}>
            <Text style={styles.login_title}>Let's Get You Started</Text>

            <Text style={styles.label}>Email Address</Text>
            <TextInput style={styles.input} placeholder='Enter your email address' />

            <Text style={styles.label}>Password</Text>
            <TextInput style={styles.input} placeholder='Enter your password' secureTextEntry />

            <Link href={"/(main)"} style={styles.button_style}>
            <TouchableOpacity >
                <Text style={styles.button_text}>LogIn</Text>
            </TouchableOpacity>
            </Link>

            <Text style={styles.login_text}>
                Don't have an account? <Link href={"/(auth)/signUp"} style={styles.red_colors}>SignUp</Link>
            </Text>
        </View>

    )
}


const styles = StyleSheet.create({

    body_container: {
        flex: 2, // Takes the middle space
        justifyContent: "center",
        paddingHorizontal: 20,
        paddingVertical: 60,
    },
    login_title: {
        fontSize: 19,
        fontWeight: "700",
        marginBottom: 20,
        textAlign: "center",
    },
    label: {
        fontSize: 16,
        fontWeight: "500",
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
    },
    button_style: {
        backgroundColor: "#F49B33",
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: "center",
        marginTop: 10,
        textAlign: "center",
    },
    button_text: {
        color: "#FFF",
        fontWeight: "700",
        fontSize: 16,
    },
    login_text: {
        textAlign: "center",
        marginTop: 15,
        fontSize: 14,
    },
    red_colors: {
        color: "#F49B33",
        fontWeight: 700,
    },
})


// Garbage Code
{/* {
                    visible && (
                      <CountryPicker
                      visible={true} onClose={() => setVisible(false)} 
                      onSelect={(e: any) => {
                        setCountryCode(`+ ${e.callingCode[0]}`)
                        setCountryName(e.name)
                    }} />
                    )} */}
{/* Dropdown Container */ }
{/* <TouchableOpacity style={styles.dropdown_container} onPress={() => setVisible(true)}>
                                <View />
                                <Text style={styles.countery_name}>{countryName}</Text>
                                <AntDesign
                                  name="caretdown"
                                  size={12}
                                  color="black"
                                />
                              </TouchableOpacity>
                              <View style={styles.horizontal_line} /> */}

{/* Phone Number */ }
{/* <View style={styles.phone_container}>
                                <TextInput style={styles.number_input} keyboardType='numeric' maxLength={10} placeholder='Enter your number' onPress={() => setVisible(true)} />
                                <Text style={styles.country_code}>{countryCode}</Text>
                                <TextInput style={styles.number_input} keyboardType='numeric' maxLength={10} placeholder='Enter your number' onPress={() => setVisible(true)} />
                              </View> */}



{/*  Login with google */ }