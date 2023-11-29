import React from 'react';
import { View, TouchableOpacity, StyleSheet, SafeAreaView, } from 'react-native';
import { List, Divider } from 'react-native-paper';

const SettingsSection = ({ title, options }) => {
  return (
    <View style={styles.section}>
      <List.Section>
        <List.Subheader style={styles.sectionTitle}>{title}</List.Subheader>
        {options.map((option, index) => (
          <TouchableOpacity key={index} style={styles.option}>
            <List.Item title={option} />
          </TouchableOpacity>
        ))}
      </List.Section>
      <Divider />
    </View>
  );
};

const Settings = () => {
  const profileOptions = ['Edit Profile', 'Change Password'];
  const appOptions = ['Notifications', 'Language'];
  const accountOptions = ['Logout', 'Delete Account'];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <SettingsSection title="Profile" options={profileOptions} />
        <SettingsSection title="App Preferences" options={appOptions} />
        <SettingsSection title="Account Settings" options={accountOptions} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#edf2f4',
    marginBottom: 51
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  section: {
    width: '100%',
    backgroundColor: '#a3c4f3',
    marginBottom: 10,
    borderRadius: 10,
    elevation: 5,
    height: 200
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '500',
    paddingLeft: 16,
    paddingBottom: 8,
    color: '#444',
  },
  option: {
    paddingLeft: 16,
  },
});

export default Settings;
