import React from 'react';
import { Provider } from 'react-redux';
import AppNavigator from './src/navigation/AppNavigator';
import store from './src/redux/store';
import { DarkModeProvider } from './src/context/DarkModeContext';

const App = () => {
  return (
    <Provider store={store}>
      <DarkModeProvider>
        <AppNavigator />
      </DarkModeProvider>
    </Provider>
  );
};

export default App;
