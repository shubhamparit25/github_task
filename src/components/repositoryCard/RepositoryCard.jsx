import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { lightStyles, darkStyles } from './RepositoryCardStyles';

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

export default RepositoryCard;
