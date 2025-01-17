import { StyleSheet } from 'react-native';

export const lightStyles = StyleSheet.create({
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

export const darkStyles = StyleSheet.create({
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
