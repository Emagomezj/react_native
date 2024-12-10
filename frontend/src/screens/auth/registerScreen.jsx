import React, { useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
  const theme = useSelector(state => state.themeReducer.styles);

  const navigation = useNavigation()

  return (
    <View style={[CustomStyles.container, { backgroundColor: theme.background }]}>
      <Text style={[CustomStyles.title, { color: theme.textPrimary }]}>Registro</Text>
      <TextInput
        style={[CustomStyles.input, { borderColor: theme.textSecondary, backgroundColor: theme.backgroundSecondary }]}
        placeholder="Nombre"
        placeholderTextColor={theme.textSecondary}
      />
      <TextInput
        style={[CustomStyles.input, { borderColor: theme.textSecondary, backgroundColor: theme.backgroundSecondary }]}
        placeholder="Apellido"
        placeholderTextColor={theme.textSecondary}
      />
      <TextInput
        style={[CustomStyles.input, { borderColor: theme.textSecondary, backgroundColor: theme.backgroundSecondary }]}
        placeholder="Correo"
        placeholderTextColor={theme.textSecondary}
      />
      <TextInput
        style={[CustomStyles.input, { borderColor: theme.textSecondary, backgroundColor: theme.backgroundSecondary }]}
        placeholder="Contraseña"
        placeholderTextColor={theme.textSecondary}
        secureTextEntry
      />
      <TouchableOpacity
        style={[CustomStyles.button, { backgroundColor: theme.primary }]}
        onPress={() => {}}
      >
        <Text style={[CustomStyles.buttonText, { color: theme.backgroundSecondary }]}>Registrarse</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[CustomStyles.button, { backgroundColor: theme.primary }]}
        onPress={() => navigation.navigate('Login',{})}
      >
        <Text style={[CustomStyles.buttonText, { color: theme.backgroundSecondary }, {marginTop: 20}]}>Entrar</Text>
      </TouchableOpacity>
    </View>
    
  );
};

export default RegisterScreen;


const CustomStyles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      marginBottom: 20,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: 'bold',
      },
    input: {
      width: '80%',
      padding: 10,
      borderRadius: 5,
      marginBottom: 15,
    },
  });