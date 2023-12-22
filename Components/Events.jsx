import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
} from 'react-native';

const Events = () => {
  const [eventText, setEventText] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [events, setEvents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [addEventModalVisible, setAddEventModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleAddEvent = () => {
    if (
      eventText.trim() !== '' &&
      eventTime.trim() !== '' &&
      eventLocation.trim() !== '' &&
      eventDate.trim() !== ''
    ) {
      const newEvent = {
        id: Math.random().toString(),
        text: eventText,
        date: eventDate,
        time: eventTime,
        place: eventLocation,
        description: eventDescription,
        isAttending: false,
      };

      setEvents([...events, newEvent]);
      setEventText('');
      setEventTime('');
      setEventLocation('');
      setEventDate('');
      setEventDescription('');
      setAddEventModalVisible(false);
    }
  };

  const handleEventPress = (event) => {
    setSelectedEvent(event);
    setModalVisible(true);
  };

  const handleEventLongPress = () => {
    // Optional: You can add an alert or any other action for long press on an event
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Event Page</Text> */}

      {/* Events List */}
      <View style={styles.eventsList}>
        {events.map((event) => (
          <TouchableOpacity
            key={event.id}
            onPress={() => handleEventPress(event)}
            onLongPress={handleEventLongPress}
            style={[
              styles.eventItem,
              event.isAttending && styles.attendingEventItem,
            ]}>
            <Text
              style={[
                styles.eventText,
                event.isAttending && styles.attendingText,
                event.isAttending && styles.crossedOutText,
              ]}>
              {event.text}
            </Text>
            <Text style={styles.eventDetailText}>{event.time}</Text>
            <Text style={styles.eventDetailText}>{event.date}</Text>
            <Text style={styles.eventDetailText}>{event.place}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Event Details Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Event Details</Text>
            <Text style={styles.modalDetailText}>{selectedEvent?.text}</Text>
            <Text style={styles.modalDetailText}>{selectedEvent?.time}</Text>
            <Text style={styles.modalDetailText}>{selectedEvent?.date}</Text>
            <Text style={styles.modalDetailText}>{selectedEvent?.place}</Text>
            <Text style={styles.modalDetailText}>
              {selectedEvent?.description}
            </Text>
            <Pressable onPress={() => setModalVisible(false)}>
              <Text style={styles.closeModalText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Add Event Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setAddEventModalVisible(true)}>
        <Text style={styles.buttonText}>Add Event</Text>
      </TouchableOpacity>

      {/* Add Event Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={addEventModalVisible}
        onRequestClose={() => setAddEventModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Event</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Event Name"
              value={eventText}
              onChangeText={(text) => setEventText(text)}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Event Time"
              value={eventTime}
              onChangeText={(text) => setEventTime(text)}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Event Location"
              value={eventLocation}
              onChangeText={(text) => setEventLocation(text)}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Event Date (DD-MM-YYYY)"
              value={eventDate}
              onChangeText={(text) => setEventDate(text)}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Event Description"
              value={eventDescription}
              onChangeText={(text) => setEventDescription(text)}
            />
            <TouchableOpacity style={styles.modalButton} onPress={handleAddEvent}>
              <Text style={styles.buttonText}>Add Event</Text>
            </TouchableOpacity>
            <Pressable onPress={() => setAddEventModalVisible(false)}>
              <Text style={styles.closeModalText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  eventsList: {
    marginTop: 10,backgroundColor: '#fff',
    marginVertical: 8,
    marginHorizontal: 20,
    borderRadius: 24,
    elevation:10
  },
  eventItem: {
    padding: 15,
  },
  attendingEventItem: {
    backgroundColor: '#3d405b',
  },
  eventText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
    textAlign: 'center',
  },
  attendingText: {
    color: 'white',
  },
  eventDetailText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 2,
    // padding:20
  },
  crossedOutText: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#3d405b',
    padding: 15,
    borderRadius: 24,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 24,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 32,
    fontWeight: '400',
    marginBottom: 10,
    padding:20,
    paddingTop:0,
  },
  modalDetailText: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 2,
    paddingLeft:30,
    paddingRight:30,
  },
  modalInput: {
    height: 50,
    width:250,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    margin: 10,
    padding: 10,
  },
  modalButton: {
    backgroundColor: '#3d405b',
    padding: 15,
    borderRadius: 24,
    margin:10
  },
  closeModalText: {
    color: 'purple',
    textAlign: 'center',
    marginTop: 10,
    fontSize:20
  },
});

export default Events;