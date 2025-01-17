import React, { useEffect, useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import { useDarkMode } from '../../context/DarkModeContext';
import RepositoryCard from '../../components/repositoryCard/RepositoryCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './FavoritesScreenStyles';

const FavoritesScreen = () => {
  const { isDarkMode } = useDarkMode();
  const [favorites, setFavorites] = useState([]);

  const removeDuplicates = (data) => {
    const uniqueItems = new Map();
    data.forEach((item) => {
      uniqueItems.set(item.id, item);
    });
    return Array.from(uniqueItems.values());
  };

  const handleToggleFavorite = async (repo) => {
    const isFavorite = favorites.some((item) => item.id === repo.id);

    const updatedFavorites = isFavorite
      ? favorites.filter((item) => item.id !== repo.id)
      : [...favorites, repo];

    setFavorites(updatedFavorites);

    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  };

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('favorites');
        if (storedFavorites) {
          const parsedFavorites = JSON.parse(storedFavorites);
          const uniqueFavorites = removeDuplicates(parsedFavorites);
          setFavorites(uniqueFavorites);
        }
      } catch (error) {
        console.error('Error loading favorites from AsyncStorage:', error);
      }
    };

    loadFavorites();
  }, []);

  return (
    <View style={isDarkMode ? styles.darkContainer : styles.container}>
      {favorites.length === 0 ? (
        <Text style={isDarkMode ? styles.darkText : styles.text}>No favorites added</Text>
      ) : (
        <FlatList
          data={favorites}
          renderItem={({ item }) => (
            <RepositoryCard
              repo={item}
              isFavorite={true} // All items in this list are favorites
              onToggleFavorite={handleToggleFavorite} // Pass the handler
              theme={isDarkMode ? 'dark' : 'light'}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

export default FavoritesScreen;
