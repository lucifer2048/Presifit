import React, { useState } from 'react';
import { Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';

const Consultation = () => {
  const [selectedProfessional, setSelectedProfessional] = useState(null);
  const [customerName, setCustomerName] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const professionals = [
    {
      type: 'Personal Trainer',
      cost: 1000,
      specialties: 'Fitness, Strength Training',
      contactNumber: '123-456-7890',
    },
    {
      type: 'Doctor',
      cost: 500,
      specialties: 'General Medicine, Health Checkups',
      contactNumber: '987-654-3210',
    },
    {
      type: 'Dietician',
      cost: 800,
      specialties: 'Nutrition, Meal Planning',
      contactNumber: '456-789-0123',
    },
  ];

  const handleBooking = () => {
    if (selectedProfessional) {
      //logic to handle the booking
      alert(`Appointment booked with ${selectedProfessional.type} for ${customerName}`);
      alert(`Contact ${selectedProfessional.type} at ${selectedProfessional.contactNumber}`);
    } else {
      alert('Please select a professional before booking.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Book Consultation</Text>

      {professionals.map((professional, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.card,
            selectedProfessional === professional && styles.selectedCard,
          ]}
          onPress={() => setSelectedProfessional(professional)}>
          <Text style={styles.cardTitle}>{professional.type}</Text>
          <Text style={styles.cardText}>{`Rs ${professional.cost}/hour`}</Text>
          <Text style={styles.cardText}>{`Specialties: ${professional.specialties}`}</Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.sectionTitle}>Customer Information</Text>
      <TextInput
        style={styles.input}
        placeholder="Your Name"
        value={customerName}
        onChangeText={(text) => setCustomerName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Contact Number"
        value={contactNumber}
        onChangeText={(text) => setContactNumber(text)}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.bookButton} onPress={handleBooking}>
        <Text style={styles.buttonText}>Book Appointment</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:20,
    alignItems: 'center',
    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  card: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
    width: '100%',
    backgroundColor: '#48cae4',
  },
  selectedCard: {
    borderColor: 'blue',

  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    padding: 10,
    width: '85%',
    backgroundColor: '#fff',
  },
  bookButton: {
    backgroundColor: '#3d405b',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    marginBottom:50
  },
  buttonText: {
    color: '#eee',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    
  },
});

export default Consultation;
