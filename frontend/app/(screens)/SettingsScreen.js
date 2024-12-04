import React, { useState } from 'react';
import { StyleSheet, View, Text, Switch, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [offlineMode, setOfflineMode] = useState(false);
  const [language, setLanguage] = useState('English');

  const toggleNotifications = async () => {
    try {
      await AsyncStorage.setItem('notifications', (!notifications).toString());
      setNotifications(!notifications);
    } catch (error) {
      console.error('Error saving notification setting:', error);
    }
  };

  const toggleOfflineMode = async () => {
    try {
      await AsyncStorage.setItem('offlineMode', (!offlineMode).toString());
      setOfflineMode(!offlineMode);
    } catch (error) {
      console.error('Error saving offline mode setting:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        
        <View style={styles.setting}>
          <Text style={styles.settingText}>Push Notifications</Text>
          <Switch
            value={notifications}
            onValueChange={toggleNotifications}
          />
        </View>

        <View style={styles.setting}>
          <Text style={styles.settingText}>Offline Mode</Text>
          <Switch
            value={offlineMode}
            onValueChange={toggleOfflineMode}
          />
        </View>

        <TouchableOpacity style={styles.languageButton}>
          <Text style={styles.languageButtonText}>Change Language</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.version}>Version 1.0.0</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Privacy Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Terms of Service</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingText: {
    fontSize: 16,
  },
  languageButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  languageButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  version: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  button: {
    paddingVertical: 10,
  },
  buttonText: {
    color: '#007AFF',
    fontSize: 16,
  },
});
