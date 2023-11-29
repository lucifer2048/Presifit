import React, { useEffect, useState } from 'react';
import { Accelerometer } from 'expo-sensors';
import { View, Text, Button, Dimensions,StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CircularProgress from "react-native-circular-progress-indicator";
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons,AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';



const THRESHOLD = 1.4;
const STEP_DELAY = 500;
const WindowHeight = Dimensions.get("window").height;
const Tab = createBottomTabNavigator();
const user = "Prathyush";
const goal = 6500;
const screenOptions = {
  tabBarShowLabel: false,
  tabBarHideOnKeyboard: true,
  headerShown: true,
  tabBarStyle: {
      position: 'absolute',
      bottom: 2,
      left: 2,
      right: 2,
      elevation: 0.5,
      height: 50,
      backgroundColor:"transparent",
      backgroundColorOpacity:0.1,
  }
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen
          name="Presifit"
          component={StepCounterScreen}
          options={{
            tabBarIcon: ({ focused }) => {
              return <Ionicons name={focused ? "home" : "home"}
              size={focused? 28:24} color={focused? "black":"grey"}
              />
            }
          }}
        />

        <Tab.Screen name="Presifit Community"
          component={Community}
          options={{
            tabBarIcon: ({ focused }) => {
              return <Ionicons name="people-sharp" size={focused? 28:24} color={focused? "black":"grey"} />
            }
          }} />
          
          <Tab.Screen name="Presifit Leaderboard"
          component={Leaderboard}
          options={{
            tabBarIcon: ({ focused }) => {
              return <MaterialIcons name="leaderboard"  size={focused? 28:24} color={focused? "black":"grey"} />
            }
          }} />
        
        <Tab.Screen name="Presifit Goals"
          component={Goals}
          options={{
            tabBarIcon: ({ focused }) => {
              return <FontAwesome name="tasks"  size={focused? 28:24} color={focused? "black":"grey"} />
            }
          }} />
        
        <Tab.Screen name="Settings"
          component={Settings}
          options={{
            tabBarIcon: ({ focused }) => {
              return <Ionicons name="settings-sharp"  size={focused? 28:24} color={focused? "black":"grey"} />
            }
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
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
      <Text style={{ fontSize: 50, textAlign: 'left', fontWeight: '400' }}>Hey, {user}</Text>
      <Text style={{ fontSize: 20, marginTop: 10 }}>Your goal is {goal}</Text>
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
          textColor={"#ecf0f1"}
          activeStrokeColor={"#bfd200"}
          inActiveStrokeColor={"#84dcc6"}
          activeStrokeSecondaryColor={'#168aad'}
          inActiveStrokeOpacity={0.5}
          inActiveStrokeWidth={40}
          activeStrokeWidth={40}
          title={"Step Count"}
          titleColor={"#000"}
          titleStyle={{ fontWeight: "300" }}
        />
        <View style={{ margin: 10, padding: 10 }}>
          <Text style={{ fontSize: 20, marginTop: 10, borderWidth: 1, borderRadius: 10, padding: 10 }}>Distance covered so far {DistanceCovered} km</Text>
          <Text style={{ fontSize: 20, marginTop: 10, borderWidth: 1, borderRadius: 10, padding: 10 }}>Calories burned so far {caloriesBurnt} calories</Text>
        </View>
      </View>
      
      {/* <Button title="Set Start Date" onPress={() => setStartDate(new Date())} />
      <Button title="Set End Date" onPress={() => setEndDate(new Date())} /> */}
    </View>
  );
};
const styles = StyleSheet.create({
  
  datePicker: {
    alignItems: 'center',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  date: {
    color: '#000',
    fontWeight: '500',
    fontSize: 20,
    marginHorizontal: 20,
  },
});

const Settings = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings Screen</Text>
    </View>
  );

};
const Community = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings Screen</Text>
    </View>
  );

};
const Leaderboard = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings Screen</Text>
    </View>
  );

};
const Goals = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Goals Screen</Text>
    </View>
  );

};