import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, TextInput } from 'react-native';

const generateRandomDate = () => {
  const startDate = new Date(2023, 10, 1);
  const endDate = new Date(2023, 11, 31);
  const randomTime = startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime());
  return new Date(randomTime);
};

const generateNewEventDate = () => {
  const startDate = new Date();
  const endDate = new Date(2023, 11, 31);
  const randomTime = startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime());
  return new Date(randomTime);
};

const generateRandomEvents = () => {
  const data = [
    { id: '1', name: 'Walkathons',place:'Bangalore' },
    { id: '2', name: 'Cyclethons',place:'Bangalore' },
    { id: '3', name: 'Biking',place:'Bangalore' },
    { id: '4', name: 'Brisk Walking',place:'Bangalore' },
  ];

  return data.map((event) => ({
    ...event,
    date: generateRandomDate(),
  }));
};

const Events = ({ navigation }) => {
  const [events, setEvents] = useState(generateRandomEvents());
  const [input, setInput] = useState('');

  const sortEventsByDate = (eventA, eventB) => {
    const dateA = new Date(eventA.date);
    const dateB = new Date(eventB.date);
    return dateA - dateB;
  };

  // const sortedEvents = events.slice().sort(sortEventsByDate);

  const renderItem = ({ item }) => {
    const isDatePassed = new Date(item.date) < new Date();
  
    return (
      <TouchableOpacity style={[styles.item, isDatePassed && styles.strikeThroughItem]}>
        <Text style={[styles.title, isDatePassed && styles.strikeThroughText]}>{item.name}</Text>
        <Text style={[styles.title2, isDatePassed && styles.strikeThroughText]}>{item.date.toDateString()}</Text>
        <Text style={[styles.title2, isDatePassed && styles.strikeThroughText]}>{item.place ? item.place : 'Bangalore'}</Text>
      </TouchableOpacity>
    );
  };

  const handleAddEvent = () => {
    if (input.trim()) {
      const newEvent = {
        id: `${events.length + 1}`,
        name: input.trim(),
        date: generateNewEventDate(),
      };
      setEvents([...events, newEvent]);
      setInput('');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList data={events} renderItem={renderItem} keyExtractor={(item) => item.id} />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a new event"
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddEvent}>
          <Text style={styles.addButtonText}>Add Event</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    backgroundColor: '#48cae4',
    // marginBottom:51
  },
  item: {
    // padding: 10,
    height: 120,
    backgroundColor: '#fff',
    marginVertical: 8,
    marginHorizontal: 20,
    borderRadius: 24,
    flex:0.5,
    alignItems:"center",
    justifyContent:"center",
    elevation:10
  },
  title: {
    fontSize: 30,
    padding:5,
  },
  title2: {
    fontSize: 14,
    padding:5,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginBottom:20
  },
  input: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: '#3d405b',
    borderRadius: 24,
    marginRight:5
  },
  addButton: {
    backgroundColor: '#3d405b',
    padding: 12,
    borderRadius: 24,
  },
  addButtonText: {
    fontSize: 16,
    color: '#fff',
  },
  strikeThroughItem: {
    opacity:0.5,
  },
  strikeThroughText: {
    textDecorationLine: 'line-through',
    opacity: 0.5,
  },
});

export default Events;
