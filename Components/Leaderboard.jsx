import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView,Image } from 'react-native';

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [stepCount, setStepCount] = useState(0);
  const [username, setUsername] = useState("user");
  const userIdno = '658a7e5dcc19ff2c6317e2dd';
  const host = '192.168.1.79'

  const fetchStepDataFromBackend = async (userIdno) => {
    try {
      const response = await fetch(`http://${host}:8000/steps/${userIdno}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error fetching step count data from backend');
      }

      const userData = await response.json();
      console.log('User data fetched from backend:', userData);

      const { username, steps } = userData; // Assuming the response has 'username' and 'steps' properties

      return { username, steps };
      // Assuming the steps data is structured as an object with a 'steps' property
    } catch (error) {
      console.error('Error fetching step count data from backend:', error);
      return 0; // Return default value or handle the error accordingly
    }
  };

  const fetchUserDetails = async (userId) => {
    const userDetails = await fetchStepDataFromBackend(userId);
    setStepCount(userDetails.steps);
    setUsername(userDetails.username); // Assuming you have a state variable for username
  };
  
  useEffect(() => {
    fetchUserDetails(userIdno);
  }, []);

  useEffect(() => {
    // Second useEffect - Update initialData every 5 seconds
    const interval = setInterval(async () => {
      fetchUserDetails(userIdno); // Fetch updated user details

      // Update leaderboardData with the latest username and stepCount
      const updatedData = [
        { id: 1, name: 'Alice', steps: 35, avatar: require('../images/alice.jpg') },
        { id: 2, name: 'Bob', steps: 555, avatar: require('../images/charlie.jpg') },
        { id: 3, name: username, steps: stepCount, avatar: require('../images/Bob.jpg') },
      ];

      const sortedData = updatedData.sort((a, b) => b.steps - a.steps);

      const rankedData = sortedData.map((user, index) => ({
        ...user,
        rank: index + 1,
      }));

      setLeaderboardData(rankedData); // Update the leaderboard data
    }, 3000);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [stepCount, username]);

  const renderLeaderboardItem = ({ item }) => {
    return (
      <View style={styles.card} key={item.id}>
        <View style={styles.rankCard}>
          <Text style={styles.rank}>#{item.rank}</Text>
        </View>
        <View style={styles.userCard}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.steps}>{item.steps} steps</Text>
        </View>
        <View>
        <Image source={item.avatar} style={styles.avatar} />
        </View>
      </View>
    );
  };

  return (
      <SafeAreaView style={styles.container}>
          <View style={styles.container1}>
              <Text style={styles.heading}>Today's Rankings</Text>
              <FlatList
                  data={leaderboardData}
                  renderItem={renderLeaderboardItem}
                  keyExtractor={(item) => item.id.toString()}
                  style={styles.list}
              />
          </View>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    
  },
  container: {
    flex:1,
    backgroundColor:"fff",
    
  },
  heading: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    width: '100%',
    backgroundColor: '#48cae4',
    height:150,
    elevation:8
  },
  rankCard: {
    backgroundColor: '#bbdefb',
    padding: 20,
    borderRadius: 50,
  },
  rank: {
    color: '#072ac8',
    fontWeight: 'bold',
    fontSize: 30,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginRight: 10,
    resizeMode:"cover"
  },
  userCard: {
    flex: 1,
    marginLeft: 12,
    alignItems:"center"
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  steps: {
    color: '#072ac8',
    marginTop: 5,
    fontSize: 20,
    fontWeight:"600",
  },
  list: {
    width: '100%',
  },
});

export default Leaderboard;
