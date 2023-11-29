import React, { useState } from 'react';
import {
 View,
 Text,
 FlatList,
 StyleSheet,
 TouchableOpacity,
 Alert,
 TextInput,
} from 'react-native';

const data = [
 { id: '1', name: 'Walkathons' },
 { id: '2', name: 'Cyclethons' },
 { id: '3', name: 'Biking' },
 { id: '4', name: 'Brisk Walking' },
];

const Event = ({ navigation }) => {
 const [events, setEvents] = useState(data);
 const [input, setInput] = useState('');

 const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.item}>
        <Text style={styles.title}>{item.name}</Text>
      </TouchableOpacity>
    );
 };

 const handleAddEvent = () => {
    if (input.trim()) {
      const newEvent = { id: events.length + 1, name: input.trim() };
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
      <FlatList
        data={events}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={events}
      />
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
 },
 item: {
    padding: 10,
    height: 44,
    backgroundColor: '#f9c2ff',
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 24,
 },
 title: {
    fontSize: 16,
 },
 inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 22,
    marginBottom: 60,
 },
 input: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ffb3e8',
    borderRadius: 24,
 },
 addButton: {
    backgroundColor: '#ffb3e8',
    padding: 12,
    borderRadius: 24,
 },
 addButtonText: {
    fontSize: 16,
    color: '#fff',
 },
});

export default Event;