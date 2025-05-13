
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const DashboardScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>NeuroPen</Text>
          <Text style={styles.subtitle}>Your Augmented Intelligence Workspace</Text>
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Knowledge Graphs</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Notes</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Documents</Text>
          </View>
        </View>
        
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        
        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('KnowledgeGraph')}
          >
            <Text style={styles.actionText}>New Knowledge Graph</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('Notes')}
          >
            <Text style={styles.actionText}>Create Note</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('Reader')}
          >
            <Text style={styles.actionText}>Upload Document</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        
        <View style={styles.activityContainer}>
          <View style={styles.activityItem}>
            <Text style={styles.activityTitle}>Quantum Physics Notes</Text>
            <Text style={styles.activityTime}>Updated 2 hours ago</Text>
          </View>
          
          <View style={styles.activityItem}>
            <Text style={styles.activityTitle}>AI Research Graph</Text>
            <Text style={styles.activityTime}>Created yesterday</Text>
          </View>
          
          <View style={styles.activityItem}>
            <Text style={styles.activityTitle}>Machine Learning Paper</Text>
            <Text style={styles.activityTime}>Read 3 days ago</Text>
          </View>
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
  scrollContent: {
    padding: 20,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 16,
    color: '#9b87f5',
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 16,
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  statLabel: {
    fontSize: 12,
    color: '#9b87f5',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
    marginTop: 8,
  },
  actionsContainer: {
    marginBottom: 24,
  },
  actionButton: {
    backgroundColor: '#9b87f5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  actionText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  activityContainer: {
    marginBottom: 24,
  },
  activityItem: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  activityTime: {
    fontSize: 12,
    color: '#9b87f5',
    marginTop: 4,
  },
});

export default DashboardScreen;
