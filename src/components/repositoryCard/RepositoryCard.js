import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const RepositoryCard = ({ repo, onToggleFavorite, isFavorite, loading, theme }) => {
  const styles = theme === 'dark' ? darkStyles : lightStyles;

  if (loading) {
    return (
      <SkeletonPlaceholder>
        <View style={styles.card}>
          <View style={styles.avatar} />
          <View style={styles.infoContainer}>
            <View style={styles.name} />
            <View style={styles.description} />
            <View style={styles.stats} />
            <View style={styles.language} />
          </View>
        </View>
      </SkeletonPlaceholder>
    );
  }

  return (
    <View style={[styles.card, isFavorite && styles.favoriteCard]}>
      <Image
        source={{ uri: repo?.owner?.avatar_url || 'https://via.placeholder.com/60' }}
        style={styles.avatar}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>
          {repo?.name || 'Unnamed Repository'}
        </Text>
        <Text style={styles.description}>
          {repo?.description || 'No description available'}
        </Text>
        <Text style={styles.stats}>
          Stars: {repo?.stargazers_count || 0} | Forks: {repo?.forks_count || 0}
        </Text>
        <Text style={styles.language}>Language: {repo?.language || 'Unknown'}</Text>
      </View>
      <TouchableOpacity
        onPress={() => onToggleFavorite(repo)}
        style={styles.favoriteIcon}
        accessibilityLabel={isFavorite ? 'Remove from favorites' : 'Add to favorites'}>
        <Ionicons
          name={isFavorite ? 'star-sharp' : 'star-outline'}
          size={24}
          color={isFavorite ? 'gold' : '#ccc'}
        />
      </TouchableOpacity>
    </View>
  );
};

const lightStyles = StyleSheet.create({
  card: {
    padding: 15,
    margin: 5,
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  favoriteCard: {
    backgroundColor: '#f4f4f4',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
    color: '#333',
    width: '90%',
  },
  favoriteText: {
    color: '#f39c12',
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  stats: {
    fontSize: 14,
    marginBottom: 5,
    color: '#333',
  },
  language: {
    fontSize: 14,
    marginBottom: 10,
    color: '#555',
  },
  favoriteIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
  },
});

const darkStyles = StyleSheet.create({
  card: {
    padding: 15,
    margin: 5,
    marginBottom: 15,
    backgroundColor: '#333',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  favoriteCard: {
    backgroundColor: '#444',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
    color: '#fff',
    width: '90%',
  },
  description: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 10,
  },
  stats: {
    fontSize: 14,
    marginBottom: 5,
    color: '#fff',
  },
  language: {
    fontSize: 14,
    marginBottom: 10,
    color: '#ccc',
  },
  favoriteIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
  },
});

export default RepositoryCard;
