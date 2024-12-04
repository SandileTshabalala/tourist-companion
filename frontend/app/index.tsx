import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native'
import { useRouter } from 'expo-router';
import React from 'react'

export default function Welcome() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/(screens)/HomeScreen');
  };

  return (
    <ImageBackground 
      source={require('../assets/images/welcome-bg.jpg')}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Tourist Companion</Text>
          <Text style={styles.subtitle}>Explore Smarter, Travel Deeper</Text>
          
          <View style={styles.featureContainer}>
            <Text style={styles.feature}>• Real-time landmark detection</Text>
            <Text style={styles.feature}>• Interactive guides</Text>
            <Text style={styles.feature}>• Personalized recommendations</Text>
            <Text style={styles.feature}>• Offline access</Text>
          </View>

          <TouchableOpacity 
            style={styles.button}
            onPress={handleGetStarted}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#ffffff',
    marginBottom: 40,
    textAlign: 'center',
  },
  featureContainer: {
    marginBottom: 40,
    alignSelf: 'stretch',
    paddingHorizontal: 20,
  },
  feature: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 10,
    textAlign: 'left',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});