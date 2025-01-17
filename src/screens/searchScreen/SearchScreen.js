import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
import { searchRepositories } from '../../redux/actions/repositoryActions';
import RepositoryCard from '../../components/repositoryCard/RepositoryCard';
import SearchBar from '../../components/searchBar/SearchBar';
import { useDarkMode } from '../../context/DarkModeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SearchScreen = () => {
  const { isDarkMode } = useDarkMode();
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState([]);
  const dispatch = useDispatch();

  const repositories = useSelector((state) => state.repositories.repositories || []);
  const error = useSelector((state) => state.repositories.error);
  const loading = useSelector((state) => state.repositories.loading);

  const isInitialMount = useRef(true);

  const debouncedSearch = useCallback(
    debounce((text, page) => {
      if (text.trim()) {
        dispatch(searchRepositories(text, page));
      }
    }, 500),
    [dispatch]
  );

  const handleSearch = (text) => {
    setQuery(text);
    setPage(1);
    debouncedSearch(text, 1);
  };

  const handleToggleFavorite = async (repo) => {
    const updatedFavorites = favorites.includes(repo)
      ? favorites.filter((item) => item.id !== repo.id)
      : [...favorites, repo];

    setFavorites(updatedFavorites);
    await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const loadMoreRepositories = () => {
    if (!loading && query.trim()) {
      setPage(page + 1);
      dispatch(searchRepositories(query, page + 1));
    }
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      dispatch(searchRepositories('react', 1)); // Initial search on mount
    }
    return () => debouncedSearch.cancel(); // Cleanup debounced function
  }, [dispatch, debouncedSearch]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('favorites');
        if (storedFavorites) setFavorites(JSON.parse(storedFavorites));
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    };

    loadFavorites();
  }, []);

  const favoriteRepos = useMemo(() => {
    const favoriteIds = new Set(favorites.map((fav) => fav.id));
    return repositories.map((repo) => ({
      ...repo,
      isFavorite: favoriteIds.has(repo.id),
    }));
  }, [repositories, favorites]);

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#333' : '#fff' }]}>
      <SearchBar onSearch={handleSearch} value={query} isDarkMode={isDarkMode} />
      {error && <Text style={[styles.error, { color: isDarkMode ? '#fff' : 'red' }]}>{error}</Text>}
      <FlatList
        data={favoriteRepos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <RepositoryCard
            repo={item}
            isFavorite={item.isFavorite}
            onToggleFavorite={handleToggleFavorite}
            loading={loading}
            theme={isDarkMode ? 'dark' : 'light'}
          />
        )}
        ListFooterComponent={loading ? <Text style={styles.loading}>Loading...</Text> : null}
        onEndReached={loadMoreRepositories}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={
          !loading && !repositories.length && (
            <Text style={[styles.noResults, { color: isDarkMode ? '#fff' : '#000' }]}>
              No results found
            </Text>
          )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  loading: {
    textAlign: 'center',
    padding: 10,
    color: '#999',
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
  noResults: {
    textAlign: 'center',
    fontSize: 18,
    padding: 10,
  },
});

export default SearchScreen;
