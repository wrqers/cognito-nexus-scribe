
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SettingsScreen = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [syncEnabled, setSyncEnabled] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [aiSuggestions, setAiSuggestions] = useState(true);

  const toggleSetting = (setting, value) => {
    switch (setting) {
      case 'darkMode':
        setDarkMode(value);
        break;
      case 'notifications':
        setNotifications(value);
        break;
      case 'syncEnabled':
        setSyncEnabled(value);
        break;
      case 'autoSave':
        setAutoSave(value);
        break;
      case 'aiSuggestions':
        setAiSuggestions(value);
        break;
    }
  };

  const SettingItem = ({ title, description, value, onToggle }) => (
    <View style={styles.settingItem}>
      <View style={styles.settingInfo}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingDescription}>{description}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: '#444', true: '#9b87f5' }}
        thumbColor={value ? '#fff' : '#ccc'}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>
      
      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Appearance</Text>
        <View style={styles.card}>
          <SettingItem
            title="Dark Mode"
            description="Use dark theme throughout the app"
            value={darkMode}
            onToggle={(value) => toggleSetting('darkMode', value)}
          />
        </View>
        
        <Text style={styles.sectionTitle}>Notifications</Text>
        <View style={styles.card}>
          <SettingItem
            title="Enable Notifications"
            description="Receive updates and reminders"
            value={notifications}
            onToggle={(value) => toggleSetting('notifications', value)}
          />
        </View>
        
        <Text style={styles.sectionTitle}>Sync and Backup</Text>
        <View style={styles.card}>
          <SettingItem
            title="Cloud Sync"
            description="Sync your notes and graphs across devices"
            value={syncEnabled}
            onToggle={(value) => toggleSetting('syncEnabled', value)}
          />
          
          <View style={styles.divider} />
          
          <SettingItem
            title="Auto Save"
            description="Automatically save changes as you work"
            value={autoSave}
            onToggle={(value) => toggleSetting('autoSave', value)}
          />
        </View>
        
        <Text style={styles.sectionTitle}>AI Features</Text>
        <View style={styles.card}>
          <SettingItem
            title="AI Suggestions"
            description="Get intelligent suggestions while working"
            value={aiSuggestions}
            onToggle={(value) => toggleSetting('aiSuggestions', value)}
          />
        </View>
        
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.card}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Sign Out</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.button, styles.dangerButton]}>
            <Text style={styles.dangerButtonText}>Delete Account</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>NeuroPen v1.0.0</Text>
          <Text style={styles.copyrightText}>© 2025 NeuroPen</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#9b87f5',
    marginBottom: 8,
    marginTop: 16,
  },
  card: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#999',
  },
  divider: {
    height: 1,
    backgroundColor: '#333',
    marginVertical: 12,
  },
  button: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginVertical: 8,
  },
  buttonText: {
    color: '#9b87f5',
    fontWeight: '600',
    fontSize: 16,
  },
  dangerButton: {
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
  },
  dangerButtonText: {
    color: '#ff3b30',
    fontWeight: '600',
    fontSize: 16,
  },
  versionContainer: {
    marginTop: 32,
    marginBottom: 16,
    alignItems: 'center',
  },
  versionText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  copyrightText: {
    fontSize: 12,
    color: '#666',
  },
});

export default SettingsScreen;
