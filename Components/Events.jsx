import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, TextInput } from 'react-native';

const generateRandomDate = () => {
  const startDate = new Date(2023, 10, 1); // Replace with your desired start date
  const endDate = new Date(2023, 11, 31); // Replace with your desired end date
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

const Events= ({ navigation }) => {
  const [events, setEvents] = useState(generateRandomEvents());
  const [input, setInput] = useState('');

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.item}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.title2}>{item.date.toDateString()}</Text>
        <Text style={styles.title2}>{item.place? item.place:"Bangalore"}</Text>
      </TouchableOpacity>
    );
  };

  const handleAddEvent = () => {
    if (input.trim()) {
      const newEvent = { id: `${events.length + 1}`, name: input.trim(), date: generateRandomDate() };
      setEvents([...events, newEvent]);
      setInput('');
    }
  };

  const handleDeleteEvent = (id) => {
    Alert.alert(
      'Delete Event',
      'Are you sure you want to delete this event?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            setEvents(events.filter((item) => item.id !== id));
          },
        },
      ],
      { cancelable: false }
    );
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
    backgroundColor: '#a3c4f3',
    marginBottom:51
  },
  item: {
    // padding: 10,
    height: 150,
    backgroundColor: '#fff',
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 24,
    flex:0.5,
    alignItems:"center",
    justifyContent:"center"
  },
  title: {
    fontSize: 35,
    padding:10,
  },
  title2: {
    fontSize: 18,
    padding:10,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
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
});

export default Events;
