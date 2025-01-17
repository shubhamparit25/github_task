import React, { useEffect, useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import { useDarkMode } from '../../context/DarkModeContext';
import RepositoryCard from '../../components/repositoryCard/RepositoryCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './FavoritesScreenStyles';

const FavoritesScreen = () => {
  const { isDarkMode } = useDarkMode();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('favorites');
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
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
