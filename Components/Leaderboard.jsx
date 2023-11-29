import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

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
    <View style={styles.container}>
      <Text style={styles.heading}>Today's Rankings</Text>
      <FlatList
        data={leaderboardData}
        renderItem={renderLeaderboardItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    width: '100%',
  },
  rankCard: {
    backgroundColor: '#5bc0de',
    padding: 8,
    borderRadius: 5,
  },
  rank: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  userCard: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  steps: {
    color: '#888',
    marginTop: 5,
  },
  list: {
    width: '100%',
  },
});

export default Leaderboard;
