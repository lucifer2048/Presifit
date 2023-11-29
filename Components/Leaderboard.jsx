import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    // Simulated data for multiple users with steps
    const initialData = [
      { id: 1, name: 'Alice', steps: 7654 },
      { id: 2, name: 'Bob', steps: 5432 },
      { id: 3, name: 'Charlie', steps: 9876 },
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
    backgroundColor: '#a3c4f3',
    height:150,
  },
  rankCard: {
    backgroundColor: '#bbdefb',
    padding: 20,
    borderRadius: 50,
  },
  rank: {
    color: '#c1121f',
    fontWeight: 'bold',
    fontSize: 30,
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
    color: '#ff6700',
    marginTop: 5,
    fontSize: 20,
    fontWeight:"600",
  },
  list: {
    width: '100%',
  },
});

export default Leaderboard;
