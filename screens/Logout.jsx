import {
  StyleSheet,
  Text,
  View,
  Button
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";

const Logout = ({ navigation }) => {
  // const navigation = useNavigation();

  const onPressHandler = () => {
    // Execute multiple functions here
    logout();
    // navigateToLogin();
  };
  const logout = async () => {
    try {
      await clearAuthToken();
      console.log("Logged out successfully");
      // navigation.replace('Login');
    } catch (error) {
      console.error("Error while logging out:", error);
      // Handle error cases if necessary
    }
  };

  const clearAuthToken = async () => {
    await AsyncStorage.removeItem("authToken");
    console.log("auth token cleared");
  };
  
  return (
      <View style={styles.container}>
          <Text style={styles.text}>Are you sure you want to logout?</Text>
          <Button title="Logout" onPress={onPressHandler} />
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