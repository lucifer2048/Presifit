import {
    StyleSheet,
    Text,
    View,
    Button
} from "react-native";
import React, { useLayoutEffect, useEffect, useContext, useState } from "react";
import { useNavigation, Link } from "@react-navigation/native";
// import { Ionicons, AntDesign } from "@expo/vector-icons";
// import axios from "axios";
// import { UserType } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Logout = () => {
    const navigation = useNavigation();
    const logout = () => {
        clearAuthToken();

    };
    const clearAuthToken = async () => {
        await AsyncStorage.removeItem("authToken");
        console.log("auth token cleared");
        navigation.reset('Login')
    };
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Are you sure you want to logout?</Text>
            <Button title="Logout" onPress={logout} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        marginBottom: 30,
    },
});

export default Logout;