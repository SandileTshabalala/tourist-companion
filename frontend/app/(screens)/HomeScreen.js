import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  TextInput,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

// Dummy data for places
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
    tags: ['history', 'museum', 'prison', 'democracy', 'court'],
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
    tags: ['history', 'museum', 'apartheid', 'education'],
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
    tags: ['entertainment', 'theme park', 'rides', 'family', 'gold mine'],
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
    tags: ['nature', 'gardens', 'walking', 'outdoors', 'peaceful'],
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
    tags: ['shopping', 'luxury', 'mall', 'restaurants', 'entertainment'],
  },
];

const categories = [
  { id: 'all', name: 'All Places', icon: 'globe-outline' },
  { id: 'Historical', name: 'Historical', icon: 'business-outline' },
  { id: 'Museum', name: 'Museums', icon: 'library-outline' },
  { id: 'Entertainment', name: 'Entertainment', icon: 'game-controller-outline' },
  { id: 'Nature', name: 'Nature', icon: 'leaf-outline' },
  { id: 'Shopping', name: 'Shopping', icon: 'cart-outline' },
];

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const filteredPlaces = places.filter(place => {
    const matchesCategory = selectedCategory === 'all' || place.category === selectedCategory;
    const matchesSearch = searchQuery.trim() === '' || 
      place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const renderPlaceCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push({
        pathname: '/(screens)/LandmarkDetailsScreen',
        params: { id: item.id }
      })}
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: item.mainImage }}
        style={styles.cardImage}
        defaultSource={require('../../assets/images/placeholder.jpg')}
      />
      <View style={styles.cardOverlay}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardCategory}>{item.category}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.rating}>{item.rating}</Text>
          </View>
        </View>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardSummary} numberOfLines={2}>
          {item.summary}
        </Text>
        <View style={styles.cardFooter}>
          <View style={styles.footerItem}>
            <Ionicons name="time-outline" size={16} color="#666" />
            <Text style={styles.footerText}>{item.openingHours}</Text>
          </View>
          <View style={styles.footerItem}>
            <Ionicons name="location-outline" size={16} color="#666" />
            <Text style={styles.footerText} numberOfLines={1}>{item.address}</Text>
          </View>
        </View>
        <View style={styles.tagsContainer}>
          {item.tags.slice(0, 3).map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>#{tag}</Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );

  const ListEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="search" size={50} color="#ccc" />
      <Text style={styles.emptyText}>No places found</Text>
      <Text style={styles.emptySubtext}>Try adjusting your search or category</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Discover Johannesburg</Text>
        <Text style={styles.subtitle}>Explore the city's best attractions</Text>
        
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search places, categories, or tags..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity 
              onPress={() => setSearchQuery('')}
              style={styles.clearButton}
            >
              <Ionicons name="close-circle" size={20} color="#666" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        {categories.map(category => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              selectedCategory === category.id && styles.categoryButtonActive
            ]}
            onPress={() => setSelectedCategory(category.id)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={category.icon}
              size={20}
              color={selectedCategory === category.id ? '#fff' : '#007AFF'}
            />
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category.id && styles.categoryTextActive
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={filteredPlaces}
        renderItem={renderPlaceCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={ListEmptyComponent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
    marginBottom: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 45,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    paddingVertical: 8,
  },
  clearButton: {
    padding: 5,
  },
  categoriesContainer: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  categoriesContent: {
    paddingHorizontal: 15,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  categoryButtonActive: {
    backgroundColor: '#007AFF',
  },
  categoryText: {
    marginLeft: 5,
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '500',
  },
  categoryTextActive: {
    color: '#fff',
  },
  listContainer: {
    padding: 15,
    paddingBottom: 30,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  cardImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#f0f0f0',
  },
  cardOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 15,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardCategory: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  rating: {
    color: '#fff',
    marginLeft: 5,
    fontSize: 14,
    fontWeight: '600',
  },
  cardContent: {
    padding: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  cardSummary: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 10,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  footerText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 5,
    flex: 1,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  tag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 5,
  },
  tagText: {
    fontSize: 12,
    color: '#666',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 10,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
  },
});
