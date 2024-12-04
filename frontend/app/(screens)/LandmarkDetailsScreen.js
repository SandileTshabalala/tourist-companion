import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';

const { width } = Dimensions.get('window');

// Using the same dummy data from HomeScreen
const places = [
  {
    id: '1',
    name: 'Constitution Hill',
    category: 'Historical',
    summary: 'Former prison complex turned museum showcasing South Africa\'s journey to democracy',
    mainImage: 'https://images.unsplash.com/photo-1584646098378-0874589d76b1',
    images: [
      'https://images.unsplash.com/photo-1584646098378-0874589d76b1',
      'https://images.unsplash.com/photo-1584646098378-0874589d76b2',
      'https://images.unsplash.com/photo-1584646098378-0874589d76b3',
    ],
    rating: 4.8,
    description: 'Constitution Hill is a living museum that tells the story of South Africa\'s journey to democracy. The site is a former prison and military fort that bears testament to South Africa\'s turbulent past and, today, is home to the country\'s Constitutional Court.',
    history: 'The site has a complex history going back to 1892 and was once a notorious prison where many of South Africa\'s leading political activists were detained.',
    videoUrl: 'https://www.youtube.com/watch?v=example1',
    openingHours: '9:00 AM - 5:00 PM',
    address: '11 Kotze Street, Braamfontein',
  },
  {
    id: '2',
    name: 'Apartheid Museum',
    category: 'Museum',
    summary: 'Powerful museum illustrating apartheid and the history of South Africa',
    mainImage: 'https://images.unsplash.com/photo-1576487236230-eaa4afe9b4f7',
    images: [
      'https://images.unsplash.com/photo-1576487236230-eaa4afe9b4f7',
      'https://images.unsplash.com/photo-1576487236230-eaa4afe9b4f8',
      'https://images.unsplash.com/photo-1576487236230-eaa4afe9b4f9',
    ],
    rating: 4.9,
    description: 'The Apartheid Museum illustrates the rise and fall of apartheid through a series of 22 individual exhibition areas that take visitors on an emotional journey through South Africa\'s history.',
    history: 'Opened in 2001, this museum is considered the pre-eminent museum dealing with 20th century South Africa.',
    videoUrl: 'https://www.youtube.com/watch?v=example2',
    openingHours: '9:00 AM - 5:00 PM',
    address: 'Northern Parkway & Gold Reef Rd',
  },
  {
    id: '3',
    name: 'Gold Reef City',
    category: 'Entertainment',
    summary: 'Theme park and entertainment complex built on an old gold mine',
    mainImage: 'https://images.unsplash.com/photo-1560127452-42c6b00c5c05',
    images: [
      'https://images.unsplash.com/photo-1560127452-42c6b00c5c05',
      'https://images.unsplash.com/photo-1560127452-42c6b00c5c06',
      'https://images.unsplash.com/photo-1560127452-42c6b00c5c07',
    ],
    rating: 4.5,
    description: 'Experience the excitement of a theme park built on a real 19th-century gold mine. Features thrilling rides, historical exhibits, and entertainment venues.',
    history: 'Built on the grounds of a real gold mine that closed in 1971, Gold Reef City combines history with modern entertainment.',
    videoUrl: 'https://www.youtube.com/watch?v=example3',
    openingHours: '9:30 AM - 5:00 PM',
    address: 'Northern Parkway & Gold Reef Rd',
  },
  {
    id: '4',
    name: 'Johannesburg Botanical Gardens',
    category: 'Nature',
    summary: 'Beautiful gardens featuring diverse plant species and walking trails',
    mainImage: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae',
    images: [
      'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae',
      'https://images.unsplash.com/photo-1585320806297-9794b3e4eeaf',
      'https://images.unsplash.com/photo-1585320806297-9794b3e4eeag',
    ],
    rating: 4.6,
    description: 'A peaceful oasis featuring specialized gardens, including a herb garden, a rose garden, and a Shakespeare garden, alongside scenic walking trails.',
    history: 'Established in 1964, these gardens have grown to become one of Johannesburg\'s most beloved green spaces.',
    videoUrl: 'https://www.youtube.com/watch?v=example4',
    openingHours: '6:00 AM - 6:00 PM',
    address: 'Olifants Road, Emmarentia',
  },
  {
    id: '5',
    name: 'Sandton City',
    category: 'Shopping',
    summary: 'Premier shopping destination with luxury brands and entertainment',
    mainImage: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd',
    images: [
      'https://images.unsplash.com/photo-1581539250439-c96689b516dd',
      'https://images.unsplash.com/photo-1581539250439-c96689b516de',
      'https://images.unsplash.com/photo-1581539250439-c96689b516df',
    ],
    rating: 4.7,
    description: 'One of Africa\'s leading and most prestigious shopping destinations, featuring over 300 shops, restaurants, and entertainment venues.',
    history: 'Opened in 1973, Sandton City has grown to become a symbol of South Africa\'s economic growth.',
    videoUrl: 'https://www.youtube.com/watch?v=example5',
    openingHours: '9:00 AM - 8:00 PM',
    address: 'Rivonia Rd, Sandhurst',
  },
];

export default function LandmarkDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  const landmark = places.find(place => place.id === id);

  const handleBack = () => {
    router.back();
  };

  const handleImagePress = () => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex + 1) % landmark.images.length
    );
  };

  const toggleSpeech = async () => {
    if (isSpeaking) {
      await Speech.stop();
      setIsSpeaking(false);
    } else {
      const textToSpeak = activeTab === 'description' 
        ? landmark.description 
        : landmark.history;
      setIsSpeaking(true);
      await Speech.speak(textToSpeak, {
        onDone: () => setIsSpeaking(false),
        onError: () => setIsSpeaking(false),
      });
    }
  };

  useEffect(() => {
    return () => {
      Speech.stop();
    };
  }, []);

  if (!landmark) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity onPress={handleImagePress}>
        <Image
          source={{ uri: landmark.images[currentImageIndex] }}
          style={styles.image}
          defaultSource={require('../../assets/images/placeholder.jpg')}
        />
        <View style={styles.imageCounter}>
          <Text style={styles.imageCounterText}>
            {currentImageIndex + 1}/{landmark.images.length}
          </Text>
        </View>
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={styles.category}>{landmark.category}</Text>
            <Text style={styles.title}>{landmark.name}</Text>
          </View>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={20} color="#FFD700" />
            <Text style={styles.rating}>{landmark.rating}</Text>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Ionicons name="time-outline" size={20} color="#666" />
            <Text style={styles.infoText}>{landmark.openingHours}</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="location-outline" size={20} color="#666" />
            <Text style={styles.infoText}>{landmark.address}</Text>
          </View>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'description' && styles.activeTab]}
            onPress={() => setActiveTab('description')}
          >
            <Text style={[styles.tabText, activeTab === 'description' && styles.activeTabText]}>
              Description
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'history' && styles.activeTab]}
            onPress={() => setActiveTab('history')}
          >
            <Text style={[styles.tabText, activeTab === 'history' && styles.activeTabText]}>
              History
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.textContent}>
          <Text style={styles.description}>
            {activeTab === 'description' ? landmark.description : landmark.history}
          </Text>
        </View>

        <TouchableOpacity 
          style={[styles.audioButton, isSpeaking && styles.audioButtonActive]}
          onPress={toggleSpeech}
        >
          <Ionicons 
            name={isSpeaking ? "pause" : "play"} 
            size={24} 
            color="#fff" 
          />
          <Text style={styles.audioButtonText}>
            {isSpeaking ? 'Pause Audio Guide' : 'Play Audio Guide'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 8,
  },
  image: {
    width: width,
    height: width * 0.8,
    backgroundColor: '#f0f0f0',
  },
  imageCounter: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  imageCounterText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  category: {
    fontSize: 16,
    color: '#007AFF',
    marginBottom: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  rating: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  infoContainer: {
    backgroundColor: '#f8f8f8',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#666',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#eee',
  },
  activeTab: {
    borderBottomColor: '#007AFF',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  textContent: {
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
  },
  audioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 25,
    marginBottom: 20,
  },
  audioButtonActive: {
    backgroundColor: '#ff3b30',
  },
  audioButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
});
