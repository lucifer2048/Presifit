import { StyleSheet, Text, View } from "react-native";
import React from 'react'
import StackNavigator from "./navigation/StackNavigator";
import { UserProvider } from "./UserContext";

export default function App() {
  return (
    <>

      <UserProvider>
        <StackNavigator />
        {/* <ModalPortal /> */}
      </UserProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});