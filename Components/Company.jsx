import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const Company = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* <Text style={styles.heading}>About Us</Text> */}
      <View style={styles.content}>
        <Text style={styles.paragraph}>
          Welcome to our health app! We are dedicated to helping you achieve your fitness goals and lead a healthier lifestyle.
        </Text>
        <Text style={styles.paragraph}>
          Our mission is to provide you with the tools and resources necessary to make informed decisions about your health and well-being.
        </Text>
        <Text style={styles.paragraph}>
          This app was created by a team of passionate developers and health enthusiasts who believe in the power of technology to transform lives.
        </Text>
        <Text style={styles.teamHeading}>Our Team</Text>
        <View style={styles.teamMember}>
          <Text style={styles.memberName}>Prathyush S Panicker</Text>
          <Text style={styles.memberRole}>Lead Developer</Text>
        </View>
        <View style={styles.teamMember}>
          <Text style={styles.memberName}>Akash R</Text>
          <Text style={styles.memberRole}>Developer</Text>
        </View>
        <View style={styles.teamMember}>
          <Text style={styles.memberName}>Akash V</Text>
          <Text style={styles.memberRole}>Developer</Text>
        </View>
        <View style={styles.teamMember}>
          <Text style={styles.memberName}>Syed Afreen Akther</Text>
          <Text style={styles.memberRole}>UX/UI Designer</Text>
        </View>
        <View style={styles.teamMember}>
          <Text style={styles.memberName}>Sushruth S</Text>
          <Text style={styles.memberRole}>UX/UI Designer</Text>
        </View>
        
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor:"#48cae4",
    
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  content: {
    marginBottom: 40,
  },
  paragraph: {
    marginBottom: 15,
    fontSize: 16,
    lineHeight: 24,
  },
  teamHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    
  },
  teamMember: {
    marginBottom: 10,
  },
  memberName: {
    fontSize: 20,
    fontWeight: '500',
  },
  memberRole: {
    fontSize: 16,
    color: '#caf0f8',
  },
});

export default Company;
