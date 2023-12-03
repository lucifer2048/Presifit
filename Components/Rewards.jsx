import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';

const Rewards = () => {
  const [leaderboard, setLeaderboard] = useState([
    { id: 1, name: 'User 1', points: 100 },
    { id: 2, name: 'User 2', points: 90 },
    { id: 3, name: 'User 3', points: 80 },
    // Add more users here
  ]);

  const [completedTasks, setCompletedTasks] = useState([
    // Mock completed tasks, replace with actual task completion logic
    { userId: 1, taskId: 1, taskDescription: 'Burn 500 calories today' },
    { userId: 2, taskId: 2, taskDescription: 'No junk foods for a week' },
    // Add more completed tasks here
  ]);

  const [userPoints, setUserPoints] = useState(0);

  useEffect(() => {
    // Logic to update leaderboard, fetch data from server, etc.
    // This could include checking and updating positions for a week.
    updateLeaderboard();
    updatePoints();
  }, []);

  const updateLeaderboard = () => {
    // Simulate updating leaderboard positions for a week
    // Replace with your actual logic
    const updatedLeaderboard = [
      { id: 1, name: 'User 1', points: 110 },
      { id: 2, name: 'User 2', points: 100 },
      { id: 3, name: 'User 3', points: 90 },
      // Add more users here
    ];
    setLeaderboard(updatedLeaderboard);
  };

  const updatePoints = () => {
    // Calculate points based on leaderboard and task completion
    let points = 0;

    // Points for leaderboard positions
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

    // Points for task completion
    const taskPoints = completedTasks.length === 3 ? 500 : 0;

    // Update user points
    setUserPoints(points + taskPoints);
  };

  const getCoupons = () => {
    // Simulate coupons available for users to purchase
    // Replace with your actual data
    const coupons = [
      { id: 1, name: 'Coupon 1', points: 50 },
      { id: 2, name: 'Coupon 2', points: 30 },
      // Add more coupons here
    ];
    return coupons;
  };

  const coupons = getCoupons();

  const purchaseCoupon = (coupon) => {
    if (userPoints >= coupon.points) {
      // Deduct points and update userPoints
      setUserPoints(userPoints - coupon.points);
      // Implement logic to provide the coupon to the user
      console.log(`You have purchased ${coupon.name}!`);
    } else {
      console.log("Insufficient points to purchase the coupon.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* <Text style={styles.heading}>Rewards</Text> */}
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
    fontWeight: '400',
    marginTop:20,
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
    // borderWidth: 1,
    // borderColor: '#cccccc',
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