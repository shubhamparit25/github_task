import React, { useState } from 'react';
import { TextInput, View } from 'react-native';
import styles from './SearchBarStyles';

const SearchBar = ({ onSearch, isDarkMode }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (text) => {
    setQuery(text);
    onSearch(text);
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#444' : '#f1f1f1' }]}>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: isDarkMode ? '#333' : '#fff',
            color: isDarkMode ? '#fff' : '#000',
          },
        ]}
        placeholder="Search repositories..."
        value={query}
        onChangeText={handleSearch}
        placeholderTextColor={isDarkMode ? '#aaa' : '#888'}
      />
    </View>
  );
};

export default SearchBar;
