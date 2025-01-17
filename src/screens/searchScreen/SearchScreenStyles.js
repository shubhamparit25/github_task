import {StyleSheet} from 'react-native';

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

export default styles
