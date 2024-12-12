import { StyleSheet, Text, View } from 'react-native';
import { store } from './src/app/store';
import { Provider, useDispatch } from 'react-redux';
import MainNavigator from './src/navigation/mainNavigator';
import CustomStatusBar from './src/components/statusBar';

import { createSessionsTable, createThemeTable } from './src/db';


createSessionsTable()
  .then(() => {})
  .catch((error)=>console.error("Error al crear la tabla Sessions: ", error))

createThemeTable()
  .then(() => {})
  .catch(error => console.error('Error al crear theme table: ', error)) 

export default function App() {

  return (
    <Provider store={store} >
      <MainNavigator/>
      <CustomStatusBar />
    </Provider>
  );
};
