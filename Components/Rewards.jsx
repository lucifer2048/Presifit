import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';

const Rewards = () => {
  const [leaderboard, setLeaderboard] = useState([
    { id: 1, name: 'User 1', points: 100 },
    { id: 2, name: 'User 2', points: 90 },
    { id: 3, name: 'User 3', points: 80 },
    
  ]);

  const [completedTasks, setCompletedTasks] = useState([
    { userId: 1, taskId: 1, taskDescription: 'Burn 500 calories today' },
    { userId: 2, taskId: 2, taskDescription: 'No junk foods for a week' },
    
  ]);

  const [userPoints, setUserPoints] = useState(0);

  useEffect(() => {
    updateLeaderboard();
    updatePoints();
  }, []);

  const updateLeaderboard = () => {
    const updatedLeaderboard = [
      { id: 1, name: 'User 1', points: 110 },
      { id: 2, name: 'User 2', points: 100 },
      { id: 3, name: 'User 3', points: 90 },
      // Add more users here
    ];
    setLeaderboard(updatedLeaderboard);
  };

  const updatePoints = () => {
    let points = 0;

    const firstPlaceUser = leaderboard.find((user) => user.id === 1);
    const secondPlaceUser = leaderboard.find((user) => user.id === 2);
    const thirdPlaceUser = leaderboard.find((user) => user.id === 3);

    if (firstPlaceUser && firstPlaceUser.points >= 50) {
      points += 50;
    }

    if (secondPlaceUser && secondPlaceUser.points >= 40) {
      points += 40;
    }

    if (thirdPlaceUser && thirdPlaceUser.points >= 30) {
      points += 30;
    }

    const taskPoints = completedTasks.length === 3 ? 500 : 0;

    setUserPoints(points + taskPoints);
  };

  const getCoupons = () => {
    const coupons = [
      { id: 1, name: 'Coupon 1', points: 50 },
      { id: 2, name: 'Coupon 2', points: 30 },
      ];
    return coupons;
  };

  const coupons = getCoupons();

  const purchaseCoupon = (coupon) => {
    if (userPoints >= coupon.points) {
      setUserPoints(userPoints - coupon.points);
      console.log(`You have purchased ${coupon.name}!`);
    } else {
      console.log("Insufficient points to purchase the coupon.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.rewardContainer}>
        <Text style={styles.subHeading}>Your Points: {userPoints}</Text>
        <Text style={styles.subHeading2}>Available Coupons:</Text>
        <FlatList
          data={coupons}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => purchaseCoupon(item)}>
              <View style={styles.rewardItem}>
                <Text>{`${item.name} - ${item.points} Points`}</Text>
                <Text style={styles.rewardText}>Click to Purchase</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={styles.rewardContainer}>
        <Text style={styles.subHeading2}>Leaderboard Rewards:</Text>
        <FlatList
          data={leaderboard}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.rewardItem}>
              <Text>{`${item.name} - ${item.points} Points`}</Text>
            </View>
          )}
        />
      </View>
      <View style={styles.rewardContainer}>
        <Text style={styles.subHeading2}>Task Completion Rewards:</Text>
        <FlatList
          data={completedTasks}
          keyExtractor={(item) => item.userId.toString()}
          renderItem={({ item }) => (
            <View style={styles.rewardItem}>
              <Text>{`User ${item.userId} - ${item.taskDescription}`}</Text>
            </View>
          )}
        />
      </View>
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    padding: 20,
    backgroundColor: '#ffffff',
    paddingBottom: 100,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  rewardContainer: {
    // marginTop: 20,
    marginBottom: 20,
  },
  subHeading: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop:5,
    marginBottom: 30,
  },
  subHeading2: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },

  rewardItem: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    margin: 10,
    height: 100,
    borderRadius: 15,
    backgroundColor: '#48cae4',
    elevation: 10,
  },
  rewardText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default Rewards;