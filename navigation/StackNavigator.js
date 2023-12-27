import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
// import Logout from "../screens/Logout";
// import HomeScreen from "../screens/HomeScreen";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { Entypo } from "@expo/vector-icons";
// import { AntDesign } from "@expo/vector-icons";
// import { Ionicons } from "@expo/vector-icons";
// import ProductInfoScreen from "../screens/ProductInfoScreen";
// import AddAddressScreen from "../screens/AddAddressScreen";
// import AddressScreen from "../screens/AddressScreen";
// import CartScreen from "../screens/CartScreen";
// import ProfileScreen from "../screens/ProfileScreen";
// import ConfirmationScreen from "../screens/ConfirmationScreen";
// import OrderScreen from "../screens/OrderScreen";
import MainApp from "../screens/Mainapp";
import { Settings } from "../Components";

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={MainApp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Logout"
          component={Settings}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen
          name="Address"
          component={AddAddressScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Add"
          component={AddressScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Confirm"
          component={ConfirmationScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Order"
          component={OrderScreen}
          options={{ headerShown: false }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});