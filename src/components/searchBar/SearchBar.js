import React, { useState } from 'react';
import { TextInput, StyleSheet, View } from 'react-native';

const SearchBar = ({ onSearch, isDarkMode }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (text) => {
    setQuery(text);  // Update local state with the input
    onSearch(text);   // Trigger the debounced search
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#444' : '#f1f1f1' }]}>
      <TextInput
        style={[styles.input, { backgroundColor: isDarkMode ? '#333' : '#fff' }]}
        placeholder="Search repositories..."
        value={query}
        onChangeText={handleSearch}
        placeholderTextColor={isDarkMode ? '#aaa' : '#888'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 5,
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
});

export default SearchBar;
