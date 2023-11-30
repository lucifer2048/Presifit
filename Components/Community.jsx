import React from 'react';
import { View, Text, TextInput, FlatList, Image, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { Linking } from 'react-native';

// Your data array
const data = [
  { id: '1', username: 'Charlie', avatar: require('../images/charlie.jpg') },
  { id: '2', username: 'Alice', avatar: require('../images/alice.jpg') },
  { id: '3', username: 'Bob', avatar: require('../images/Bob.jpg') },
  // Add more data...
];

const Community = () => {
    const renderUserCard = ({ item }) => (
      <TouchableOpacity style={styles.card}>
        <Image source={item.avatar} style={styles.avatar} />
        <Text style={styles.username}>{item.username}</Text>
      </TouchableOpacity>
    );

  const inviteViaWhatsApp = () => {
    Linking.openURL('whatsapp://send?text=Join me in this amazing app! https://yourapp.com');
  };

  const inviteViaFacebook = () => {
    Linking.openURL('https://www.facebook.com/sharer/sharer.php?u=https://yourapp.com');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          // Add search functionality
        />
        <TouchableOpacity onPress={() => {}} style={styles.searchButton}>
          <AntDesign name="search1" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        renderItem={renderUserCard}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
      <View style={styles.inviteContainer}>
        <TouchableOpacity onPress={inviteViaWhatsApp} style={styles.inviteButton1}>
          <FontAwesome name="whatsapp" size={24} color="white" />
          <Text style={styles.inviteText}>Invite via WhatsApp</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={inviteViaFacebook} style={styles.inviteButton2}>
          <FontAwesome name="facebook" size={24} color="white" />
          <Text style={styles.inviteText}>Invite via Facebook</Text>
        </TouchableOpacity>
    </View >
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
    
    // marginTop:50
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#3498db',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    
  },
  searchButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 8,
    marginLeft: 10,
    elevation:10
  },
  list: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 25,
    backgroundColor: '#ccdbfd',
    marginVertical: 8,
    marginHorizontal: 16,
    height:90,
    borderColor: '#3498db',
    elevation:8
    
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 10,
    resizeMode:"cover"
  },
  username: {
    fontSize: 16,
    fontWeight: '400',
    
  },
  inviteContainer: {
    flexDirection: 'col',
    justifyContent: 'space-around',
    padding: 20,
    marginBottom:60,
  },
  inviteButton1: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#29bf12',
    padding: 20,
    marginBottom:15,
    borderRadius: 8,
    elevation:8
  },
  inviteButton2: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3b5998',
    padding: 20,
    marginBottom:15,
    borderRadius: 8,
    elevation:8
    
  },
  inviteText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default Community;
