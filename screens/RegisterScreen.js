import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Pressable,
    KeyboardAvoidingView,
    TextInput,
    Alert,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const RegisterScreen = () => {
    const host = '192.168.1.79'
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const navigation = useNavigation();
    const handleRegister = () => {
        const user = {
            name: name,
            email: email,
            password: password,
            gender: gender,
        };

        // send a POST  request to the backend API to register the user
        axios
            .post(`http://${host}:8000/register`, user)
            .then((response) => {
                console.log(response);
                Alert.alert(
                    "Registration successful",
                    "You have been registered Successfully"
                );
                setName("");
                setEmail("");
                setPassword("");
                setGender("");
                navigation.replace("Login")
            })
            .catch((error) => {
                Alert.alert(
                    "Registration Error",
                    "An error occurred while registering"
                );
                console.log("registration failed", error);
            });
    };
    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: "white", alignItems: "center", }}
        >
            <View>
                <Text style={styles.loadingText}>Presifit</Text>
            </View>

            <KeyboardAvoidingView>
                <View style={{ alignItems: "center" }}>
                    <Text
                        style={{
                            fontSize: 17,
                            fontWeight: "bold",
                            marginTop: 12,
                            color: "#041E42",
                        }}
                    >
                        Register to your Account
                    </Text>
                </View>

                <View style={{ marginTop: 30 }}>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 5,
                            backgroundColor: "#D0D0D0",
                            paddingVertical: 5,
                            borderRadius: 5,
                            marginTop: 20,
                        }}
                    >
                        <Ionicons
                            name="ios-person"
                            size={24}
                            color="gray"
                            style={{ marginLeft: 8 }}
                        />
                        <TextInput
                            value={name}
                            onChangeText={(text) => setName(text)}
                            style={{
                                color: "gray",
                                marginVertical: 10,
                                width: 300,
                                fontSize: name ? 16 : 16,
                            }}
                            placeholder="enter your name"
                        />
                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 5,
                            backgroundColor: "#D0D0D0",
                            paddingVertical: 5,
                            borderRadius: 5,
                            marginTop: 30,
                        }}
                    >
                        <MaterialIcons
                            style={{ marginLeft: 8 }}
                            name="email"
                            size={24}
                            color="gray"
                        />

                        <TextInput
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            style={{
                                color: "gray",
                                marginVertical: 10,
                                width: 300,
                                fontSize: password ? 16 : 16,
                            }}
                            placeholder="enter your Email"
                        />
                    </View>
                </View>

                <View>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 5,
                            backgroundColor: "#D0D0D0",
                            paddingVertical: 5,
                            borderRadius: 5,
                            marginTop: 30,
                        }}
                    >
                        <AntDesign
                            name="lock1"
                            size={24}
                            color="gray"
                            style={{ marginLeft: 8 }}
                        />

                        <TextInput
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            secureTextEntry={true}
                            style={{
                                color: "gray",
                                marginVertical: 10,
                                width: 300,
                                fontSize: email ? 16 : 16,
                            }}
                            placeholder="enter your Password"
                        />
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 5,
                            backgroundColor: "#D0D0D0",
                            paddingVertical: 5,
                            borderRadius: 5,
                            marginTop: 20,
                        }}
                    >
                        <Ionicons
                            name="ios-person"
                            size={24}
                            color="gray"
                            style={{ marginLeft: 8 }}
                        />
                        <TextInput
                            value={gender}
                            onChangeText={(text) => setGender(text)}
                            style={{
                                color: "gray",
                                marginVertical: 10,
                                width: 300,
                                fontSize: gender ? 16 : 16,

                            }}
                            placeholder="enter your gender"
                        />
                    </View>
                </View>



                <View
                    style={{
                        marginTop: 12,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Text>Keep me logged in</Text>

                    <Text style={{ color: "#007FFF", fontWeight: "500" }}>
                        Forgot Password
                    </Text>
                </View>

                <View style={{ marginTop: 80 }} />

                <Pressable
                    onPress={handleRegister}
                    style={{
                        width: 200,
                        backgroundColor: "#3d405b",
                        borderRadius: 6,
                        marginLeft: "auto",
                        marginRight: "auto",
                        marginBottom: 10,
                        padding: 15,
                    }}
                >
                    <Text
                        style={{
                            textAlign: "center",
                            color: "white",
                            fontSize: 16,
                            fontWeight: "bold",

                        }}
                    >
                        Register
                    </Text>
                </Pressable>

                <Pressable
                    onPress={() => navigation.goBack()}
                    style={{ marginTop: 15 }}
                >
                    <Text style={{ textAlign: "center", color: "#007FFF", fontSize: 20 }}>
                        Already have an account? Sign In
                    </Text>
                </Pressable>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default RegisterScreen;

const styles = StyleSheet.create({
    loadingText: {
        paddingBottom: 20,
        fontSize: 50,
        marginTop: 70,
        fontWeight: 'bold',
        flex: 0,
        justifyContent: "center",
        alignItems: "center",
    },
});