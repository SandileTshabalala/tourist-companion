import React from 'react';
import { Stack } from 'expo-router';

export default function App() {
  return (
    <Stack>
      <Stack.Screen 
        name="HomeScreen" 
        options={{ 
          title: 'Tourist Companion',
          headerShown: true 
        }} 
      />
      <Stack.Screen 
        name="LandmarkDetailsScreen" 
        options={{ 
          title: 'Landmark Details',
          headerShown: true 
        }} 
      />
      <Stack.Screen 
        name="SettingsScreen" 
        options={{ 
          title: 'Settings',
          headerShown: true 
        }} 
      />
    </Stack>
  );
}
