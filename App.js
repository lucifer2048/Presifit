import React, { useEffect, useState } from 'react';
import { Accelerometer } from 'expo-sensors';
import { View, Text, Dimensions, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CircularProgress from "react-native-circular-progress-indicator";
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Goals, Leaderboard, Community, Settings, Events, Rewards, Consultation } from './Components';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const THRESHOLD = 1.4;
const STEP_DELAY = 500;
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const user = "Prathyush";
const goal = 6500;
const screenOptions = {
  tabBarShowLabel: true,
  tabBarHideOnKeyboard: true,
  headerShown: true,
  tabBarStyle: {
    position: 'absolute',
    bottom: 2,
    left: 2,
    right: 2,
    elevation: 0,
    height: 50,
    backgroundColor: "transparent",
    // backgroundColorOpacity: 0.1,
  }
}

export default function App() {
  const [isAppReady, setAppReady] = useState(false);

  useEffect(() => {
    // Simulate an asynchronous operation (e.g., fetching data)
    setTimeout(() => {
      setAppReady(true); // Set app ready state to true after the operation
    }, 1500); // Simulated delay of 3 seconds
  }, []);

  if (!isAppReady) {
    return (
      <View style={styles.splashScreenContainer}>

        <Image source={require('./images/run.jpg')} style={styles.logo} />
        <Text style={styles.loadingText}>Presifit</Text>
        <FontAwesome style={styles.arrow} name="arrow-circle-right" size={50} color="black" />

      </View>
    );
  }


  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Presifit" component={TabNavigator} />
        <Drawer.Screen name="Settings" component={Settings} />
        <Drawer.Screen name="Consultation" component={Consultation} />
        <Drawer.Screen name="Events" component={Events} />
        
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Presifit"
        component={StepCounterScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return <Ionicons name={"home"}
              size={focused ? 28 : 24} color={focused ? "black" : "grey"}
            />
          }
        }}
      />

      <Tab.Screen name="Community"
        component={Community}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return <Ionicons name="people-sharp" size={focused ? 28 : 24} color={focused ? "black" : "grey"} />
          }
        }} />

      <Tab.Screen name="Leaderboard"
        component={Leaderboard}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return <MaterialIcons name="leaderboard" size={focused ? 28 : 24} color={focused ? "black" : "grey"} />
          }
        }} />

      <Tab.Screen name="Your Goals"
        component={Goals}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return <FontAwesome name="tasks" size={focused ? 28 : 24} color={focused ? "black" : "grey"} />
          }
        }} />

      {/* <Tab.Screen name="Events"
        component={Events}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return <MaterialIcons name="emoji-events" size={focused ? 28 : 24} color={focused ? "black" : "grey"} />
          }
        }} /> */}

      <Tab.Screen name="Rewards"
        component={Rewards}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return <MaterialCommunityIcons name = {focused ? "gift-open-outline" : "gift-outline"} size={focused ? 28 : 24} color={focused ? "black" : "grey"} />
          }
        }}
      />
    </Tab.Navigator>
  );
}

const StepCounterScreen = () => {
  const [stepCount, setStepCount] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const changeDate = (numDays) => {
    const currentDate = new Date(date); // Create a copy of the current date
    // Update the date by adding/subtracting the number of days
    currentDate.setDate(currentDate.getDate() + numDays);

    setDate(currentDate); // Update the state variable
  };
  const [stepsBetweenDates, setStepsBetweenDates] = useState(0);
  const Dist = stepCount / 1300;
  const DistanceCovered = Dist.toFixed(2);
  const cal = DistanceCovered * 60;
  const caloriesBurnt = cal.toFixed(2);

  useEffect(() => {
    let lastStepTime = new Date().getTime();

    const handleSensorData = (data) => {
      const { x, y, z } = data;

      const acceleration = Math.sqrt(x * x + y * y + z * z);
      if (acceleration > THRESHOLD) {
        const currentTime = new Date().getTime();
        if (currentTime - lastStepTime > STEP_DELAY) {
          setStepCount((prevCount) => prevCount + 1);
          lastStepTime = currentTime;
        }
      }
    };

    const startAccelerometer = async () => {
      await Accelerometer.setUpdateInterval(100);
      Accelerometer.addListener(handleSensorData);
    };

    startAccelerometer();

    return () => {
      Accelerometer.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    const steps = calculateStepsBetweenDates(startDate, endDate);
    setStepsBetweenDates(steps);
  }, [startDate, endDate]);

  const calculateStepsBetweenDates = (start, end) => {
    return Math.floor(Math.random() * 1000);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
      <Text style={{ fontSize: 32, fontWeight: '600', color: "#0466c8" }}>Hey, {user}</Text>
      <Text style={{ fontSize: 24, marginTop: 10, color: "#0466c8" }}>Your goal for today is {goal} steps</Text>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {/* <View style={styles.datePicker}>
        <AntDesign
          onPress={() => changeDate(-1)}
          name="left"
          size={20}
          color="#000"
        />
        <Text style={styles.date}>{date.toDateString()}</Text>
        

        <AntDesign
          onPress={() => changeDate(1)}
          name="right"
          size={20}
          color="#000"
        />
        
      </View> */}
        {/* <Text style={{ fontSize: 20, marginTop: 20 }}>Steps between dates: {stepsBetweenDates}</Text> */}
        <CircularProgress
          value={stepCount}
          maxValue={goal}
          radius={120}
          textColor={"#0466c8"}
          activeStrokeColor={"#bfd200"}
          inActiveStrokeColor={"#84dcc6"}
          activeStrokeSecondaryColor={'#168aad'}
          inActiveStrokeOpacity={0.5}
          inActiveStrokeWidth={40}
          activeStrokeWidth={40}
          title={"Step Count"}
          titleColor={"#0466c8"}
          titleStyle={{ fontWeight: "600", fontSize: 20 }}
        />
        <View style={{ margin: 10, padding: 10 }}>
          <Text style={{ fontSize: 20, marginTop: 10, borderWidth: 1, borderRadius: 10, padding: 15, }}>Distance covered so far {DistanceCovered} km</Text>
          <Text style={{ fontSize: 20, marginTop: 10, borderWidth: 1, borderRadius: 10, padding: 15 }}>Calories burned so far {caloriesBurnt} calories</Text>
        </View>
      </View>

      {/* <Button title="Set Start Date" onPress={() => setStartDate(new Date())} />
      <Button title="Set End Date" onPress={() => setEndDate(new Date())} /> */}
    </View>
  );
};
const styles = StyleSheet.create({

  splashScreenContainer: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Adjust as per your design
  },
  logo: {
    // width: 500,
    height: 700,
    resizeMode: 'contain',

  },
  loadingText: {
    position: "absolute",
    // marginTop: 20,
    fontSize: 40,
    marginTop: 70,
    fontWeight: 'bold',
    flex: 1,
    justifyContent: "flex-end"
  },
  arrow: {
    // position:"absolute",
    marginBottom: 50,
    justifyContent: "flex-start",
    flex: 1,
  }
});




