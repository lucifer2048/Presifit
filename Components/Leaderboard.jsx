import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView,Image } from 'react-native';

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    // Simulated data for multiple users with steps
    const initialData = [
      { id: 1, name: 'Alice', steps: 7654,avatar: require('../images/alice.jpg') },
      { id: 2, name: 'Bob', steps: 5432,avatar: require('../images/Bob.jpg') },
      { id: 3, name: 'Charlie', steps: 9876,avatar: require('../images/charlie.jpg') },
      // Add more users as needed
    ];

    // Sort the initial data by steps in descending order
    const sortedData = initialData.sort((a, b) => b.steps - a.steps);

    // Update the ranks dynamically based on the sorted order
    const rankedData = sortedData.map((user, index) => ({
      ...user,
      rank: index + 1,
    }));

    setLeaderboardData(rankedData);
  }, []);

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
