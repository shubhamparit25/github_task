import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { View, FlatList, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
import { searchRepositories } from '../../redux/actions/repositoryActions';
import RepositoryCard from '../../components/repositoryCard/RepositoryCard';
import SearchBar from '../../components/searchBar/SearchBar';
import { useDarkMode } from '../../context/DarkModeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './SearchScreenStyles';

const removeDuplicates = (array) => {
  const uniqueIds = new Set();
  return array.filter((item) => {
    if (uniqueIds.has(item.id)) {
      return false;
    }
    uniqueIds.add(item.id);
    return true;
  });
};

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
    const isFavorite = favorites.some((item) => item.id === repo.id);

    const updatedFavorites = isFavorite
      ? favorites.filter((item) => item.id !== repo.id)
      : removeDuplicates([...favorites, repo]);

    setFavorites(updatedFavorites);

    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
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
      dispatch(searchRepositories('react', 1));
    }
    return () => debouncedSearch.cancel();
  }, [dispatch, debouncedSearch]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('favorites');
        if (storedFavorites) {
          const uniqueFavorites = removeDuplicates(JSON.parse(storedFavorites));
          setFavorites(uniqueFavorites);
        }
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
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#fff' }]}>
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

export default SearchScreen;
