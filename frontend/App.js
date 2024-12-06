import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { store } from './src/app/store';
import { Provider, useDispatch } from 'react-redux';
import MainNavigator from './src/navigation/mainNavigator';


export default function App() {

  return (
    <Provider store={store} >
      <MainNavigator/>
      <StatusBar style="dark" />
    </Provider>
  );
};
