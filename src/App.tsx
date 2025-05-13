
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar, useColorScheme } from 'react-native';
import { ThemeProvider } from './providers/ThemeProvider';

// Import screens
import DashboardScreen from './screens/DashboardScreen';
import KnowledgeGraphScreen from './screens/KnowledgeGraphScreen';
import NotesScreen from './screens/NotesScreen';
import ReaderScreen from './screens/ReaderScreen';
import SettingsScreen from './screens/SettingsScreen';

// Import icons
import { Book, Home, Network, FileText, Settings } from 'lucide-react-native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Create stack navigators for screens that need their own navigation stack
const KnowledgeGraphStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="KnowledgeGraphMain" 
      component={KnowledgeGraphScreen} 
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const NotesStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="NotesMain" 
      component={NotesScreen} 
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const ReaderStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="ReaderMain" 
      component={ReaderScreen} 
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const App = () => {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <NavigationContainer>
          <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size }) => {
                switch (route.name) {
                  case 'Dashboard':
                    return <Home color={color} size={size} />;
                  case 'KnowledgeGraph':
                    return <Network color={color} size={size} />;
                  case 'Notes':
                    return <FileText color={color} size={size} />;
                  case 'Reader':
                    return <Book color={color} size={size} />;
                  case 'Settings':
                    return <Settings color={color} size={size} />;
                  default:
                    return null;
                }
              },
              tabBarActiveTintColor: '#9b87f5',
              tabBarInactiveTintColor: 'gray',
              headerShown: false,
            })}
          >
            <Tab.Screen name="Dashboard" component={DashboardScreen} />
            <Tab.Screen name="KnowledgeGraph" component={KnowledgeGraphStack} />
            <Tab.Screen name="Notes" component={NotesStack} />
            <Tab.Screen name="Reader" component={ReaderStack} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
