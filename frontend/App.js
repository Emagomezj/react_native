import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { store } from './src/app/store';
import { Provider, useDispatch } from 'react-redux';
import { ShopNavigator } from './src/navigation/shopNavigatior';


export default function App() {

  return (
    <Provider store={store} >
      <ShopNavigator/>
    </Provider>
  );
};
