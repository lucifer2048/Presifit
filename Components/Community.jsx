import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, FlatList, Image, StyleSheet, KeyboardAvoidingView, TouchableOpacity, ActionSheetIOS } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { Linking } from 'react-native';

// Your data array
const data = [
  { id: 1, username: 'Afreen', avatar: require('../images/alice.jpg') },
  { id: 2, username: 'Sushruth', avatar: require('../images/charlie.jpg') },
  { id: 3, username: 'Prathyush', avatar: require('../images/Bob.jpg') },
  { id: 4, username: 'Akash V', avatar: require('../images/akashv.jpg') },
  { id: 5, username: 'Akash R', avatar: require('../images/akashR.jpg') },
  { id: 6, username: 'Emma Stone', avatar: require('../images/Random.jpg') },
  { id: 7, username: 'Dakota', avatar: require('../images/Random.jpg') },
  { id: 8, username: 'Emily', avatar: require('../images/Random.jpg') },
  { id: 9, username: 'Doja Cat', avatar: require('../images/Random.jpg') },
  { id: 10, username: 'Seajay', avatar: require('../images/Random.jpg') },
  { id: 11, username: 'Violet', avatar: require('../images/Random.jpg') },

];

const Community = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(data);




  const renderUserCard = ({ item }) => (

    <TouchableOpacity style={styles.card} >
      <Image source={item.avatar} style={styles.avatar} />
      <Text style={styles.username}>{item.username}</Text>
    </TouchableOpacity>
  );

  const handleSearch = (text) => {
    setSearchQuery(text);

    // Filter the data based on the search query
    const filtered = data.filter((user) =>
      user.username.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const inviteViaWhatsApp = () => {
    Linking.openURL('whatsapp://send?text=Join me in this amazing app! https://Presifit.com');
  };

  const inviteViaFacebook = () => {
    Linking.openURL('https://www.facebook.com/sharer/sharer.php?u=https://Presifit.com');
  };



  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Adjust behavior as needed
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    // Adjust the vertical offset as needed
    >

      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={handleSearch}
          placeholder="Search"
        />
        <TouchableOpacity onPress={() => handleSearch(searchQuery)} style={styles.searchButton}>
          <AntDesign name="search1" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.inviteContainer}>
        <TouchableOpacity onPress={inviteViaWhatsApp} style={styles.inviteButton1}>
          <FontAwesome name="whatsapp" size={24} color="white" />
          <Text style={styles.inviteText}>Invite via WhatsApp</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={inviteViaFacebook} style={styles.inviteButton2}>
          <FontAwesome name="facebook" size={24} color="white" />
          <Text style={styles.inviteText}>Invite via Facebook</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredData}
        renderItem={renderUserCard}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
      />

    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginBottom: 50
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
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
    elevation: 10
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
    backgroundColor: '#48cae4',
    marginVertical: 8,
    marginHorizontal: 16,
    height: 90,
    borderColor: '#3498db',
    elevation: 8,
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 10,
    resizeMode: "cover"
  },
  username: {
    fontSize: 18,
    fontWeight: '400',
  },
  inviteContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 10,
    backgroundColor: 'transparent',

  },
  inviteButton1: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#29bf12',
    padding: 20,
    marginBottom: 15,
    borderRadius: 8,
    elevation: 8
  },
  inviteButton2: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3b5998',
    padding: 20,
    marginBottom: 15,
    borderRadius: 8,
    elevation: 8

  },
  inviteText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default Community;
