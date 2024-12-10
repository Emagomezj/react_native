import { useState } from 'react';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity, Modal, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { usePostLoginMutation } from '../../services/authService';
import { login, logout } from '../../features/auth/sessionSlice';

const LoginScreen = () => {
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

  const [isLoadingModalVisible, setIsLoadingModalVisible] = useState(false)

  const [postLogin, { data, error, isLoading }] = usePostLoginMutation()

  const navigation = useNavigation()
  const dispatch = useDispatch()

  const theme = useSelector(state => state.themeReducer.styles);
  const user = useSelector(state => state.sessionReducer.user)
  const logged = useSelector(state => state.sessionReducer.logged)

  const handleLogin = async () => {
    try {
      const response = await postLogin({ email: "ppio@ab.com", password: "contraseña123" })
      dispatch(login({ user: response.data.payload.user, token: response.data.payload.token }));
      if(logged) setIsSuccessModalVisible(true);
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const handleLogout = () => {
    dispatch(logout())
  }

  return logged ?
  
  <View style={ {...CustomStyles.container, backgroundColor: theme.container.backgroundColor }}>
    <Text style={[CustomStyles.title, { color: theme.textPrimary.color }]}>
        Panel de usuario
    </Text>
    <Pressable
        onPress={handleLogout}
      >
        <Text style={{ ...CustomStyles.buttonText, color: theme.textPrimary.color }}>logout</Text>
      </Pressable>
  </View>
  
  :
    <View style={ {...CustomStyles.container, backgroundColor: theme.container.backgroundColor }}>      
      <Text style={[CustomStyles.title, { color: theme.textPrimary.color }]}>
        Login
      </Text>
      <TextInput
        style={{...CustomStyles.input, backgroundColor: theme.container.backgroundColor, color: theme.textPrimary.color }}
        placeholder="Email"
        placeholderTextColor={theme.textSecondary.color}
      />
      <TextInput
        style={{ ...CustomStyles.input, backgroundColor: theme.container.backgroundColor, color: theme.textPrimary.color }}
        placeholder="Password"
        placeholderTextColor={theme.textSecondary.color}
        secureTextEntry
      />
      <TouchableOpacity
        style={{ ...CustomStyles.button, backgroundColor: theme.primary }}
        onPress={handleLogin}
      >
        <Text style={{ ...CustomStyles.buttonText, color: theme.textPrimary.color }}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ ...CustomStyles.button, backgroundColor: theme.primary }}
        onPress={() => navigation.navigate('Registrarse',{})}
      >
        <Text style={{ ...CustomStyles.buttonText, color: theme.textSecondary.color }}>Registrarse</Text>
      </TouchableOpacity>

      <Modal
        visible={isSuccessModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsSuccessModalVisible(false)}
      >
        <View style={CustomStyles.modalContainer}>
          <View style={{ ...CustomStyles.modalContent, backgroundColor: theme.container.backgroundColor }}>
            <Text style={{ ...CustomStyles.modalText, color: theme.success.color }}>Login Successful! Bienvenid@ {user} </Text>
            <TouchableOpacity
              style={{ ...CustomStyles.modalButton, backgroundColor: theme.primary }}
              onPress={() => setIsSuccessModalVisible(false)}
            >
              <Text style={{ ...CustomStyles.buttonText, color: theme.textPrimary.color }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        visible={isLoading && !logged}
        transparent
        animationType="slide"
        onRequestClose={() => setIsLoadingModalVisible(false)}
      >
        <View style={CustomStyles.modalContainer}>
          <View style={{ ...CustomStyles.modalContent, backgroundColor: theme.container.backgroundColor }}>
            <Text style={{ ...CustomStyles.modalText, color: theme.success.color }}>Cargando... </Text>
            <TouchableOpacity
              style={{ ...CustomStyles.modalButton, backgroundColor: theme.primary }}
              onPress={() => setIsLoadingModalVisible(false)}
            >
              <Text style={{ ...CustomStyles.buttonText, color: theme.textPrimary.color }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View> 
};

export {LoginScreen}

const CustomStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
});