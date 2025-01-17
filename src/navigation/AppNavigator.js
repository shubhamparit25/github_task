import React, { Suspense } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDarkMode } from '../context/DarkModeContext'; // Import dark mode context

const SearchScreen = React.lazy(() => import('../screens/searchScreen/SearchScreen'));
const FavoritesScreen = React.lazy(() => import('../screens/favoritesScreen/FavoritesScreen'));

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode(); // Get dark mode state

  return (
    <NavigationContainer>
      <Suspense fallback={<ActivityIndicator size="large" color="#0000ff" />}>
        <Stack.Navigator initialRouteName="Search">
          <Stack.Screen
            name="Search"
            component={SearchScreen}
            options={({ navigation }) => ({
              title: 'Search Repositories',
              headerRight: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}>
                  <Ionicons
                    name="star"
                    size={25}
                    color={'gold'}
                    style={{ marginRight: 10 }}
                    onPress={() => navigation.navigate('Favorites')}
                  />
                  <Ionicons
                    name={isDarkMode ? 'moon' : 'sunny'}
                    size={25}
                    color={isDarkMode ? '#fff' : '#000'}
                    onPress={toggleDarkMode} // Toggle dark mode globally
                  />
                </View>
              ),
              headerStyle: {
                backgroundColor: isDarkMode ? '#333' : '#fff',
              },
              headerTintColor: isDarkMode ? '#fff' : '#000',
            })}
          />
          <Stack.Screen
            name="Favorites"
            component={FavoritesScreen}
            options={{
              headerRight: () => (
                <View style={{ marginRight: 20 }}>
                  {/* Add functionality if needed */}
                </View>
              ),
              headerStyle: {
                backgroundColor: isDarkMode ? '#333' : '#fff', // Dark mode background for Favorites screen
              },
              headerTintColor: isDarkMode ? '#fff' : '#000', // Text color based on dark mode
            }}
          />
        </Stack.Navigator>
      </Suspense>
    </NavigationContainer>
  );
};

export default AppNavigator;
