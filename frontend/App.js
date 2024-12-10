import { StyleSheet, Text, View } from 'react-native';
import { store } from './src/app/store';
import { Provider, useDispatch } from 'react-redux';
import MainNavigator from './src/navigation/mainNavigator';
import CustomStatusBar from './src/components/statusBar';


export default function App() {

  return (
    <Provider store={store} >
      <MainNavigator/>
      <CustomStatusBar />
    </Provider>
  );
};
