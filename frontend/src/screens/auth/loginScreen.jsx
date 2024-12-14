import { useState } from 'react';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity, Modal, Pressable, KeyboardAvoidingView, Platform  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { usePostLoginMutation } from '../../services/authService';
import { login, logout } from '../../features/auth/sessionSlice';
import { insertSession, clearSessions, fetchSession } from '../../db';

const LoginScreen = () => {
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

  const [isLoadingModalVisible, setIsLoadingModalVisible] = useState(false);

  const [errorModal, setErrorModal] = useState(false)

  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const [postLogin, { data, error, isLoading }] = usePostLoginMutation();

  const navigation = useNavigation()
  const dispatch = useDispatch()

  const theme = useSelector(state => state.themeReducer.styles);
  const logged = useSelector(state => state.sessionReducer.logged)

  const handleLogin = async () => {
    try {
      setIsLoadingModalVisible(true)
      const response = await postLogin({ email: emailInput, password: passwordInput })
      if(response.error) {
        setIsLoadingModalVisible(false)
        setErrorModal(true)
        setTimeout(() => setErrorModal(false),1000)
      } else {
        setEmailInput('');
        setPasswordInput('');
        dispatch(login({ user: response.data.payload.user, token: response.data.payload.token }));
        insertSession({email: response.data.payload.user.email, localId: response.data.payload.user.id, token: response.data.payload.token}).then(() => {}).catch(error => console.error(error))
        setIsLoadingModalVisible(false)
      }
      if(isLoadingModalVisible) setIsLoadingModalVisible(false)
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const handleLogout = () => {
    dispatch(logout())
    clearSessions().then(() => {})
  }

  return logged ?
  
  <View style={ {...CustomStyles.container, backgroundColor: theme.container.backgroundColor }}>
    <Text style={[CustomStyles.title, { color: theme.textPrimary.color }]}>
        Panel de usuario
    </Text>
    <Pressable
        onPress={() => navigation.navigate('Compras', {})}
      >
        <Text style={{ ...CustomStyles.buttonText, color: theme.textPrimary.color }}>Mis compras</Text>
      </Pressable>
    <Pressable
        onPress={handleLogout}
      >
        <Text style={{ ...CustomStyles.buttonText, color: theme.textPrimary.color }}>logout</Text>
      </Pressable>
  </View>
  
  : <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={{flex:1}}>

    <View style={ {...CustomStyles.container, backgroundColor: theme.container.backgroundColor }}>      
      <Text style={[CustomStyles.title, { color: theme.textPrimary.color }]}>
        Login
      </Text>
      <TextInput
        style={{...CustomStyles.input, backgroundColor: theme.container.backgroundColor, color: theme.textPrimary.color }}
        onChangeText={(text) => setEmailInput(text)}
        placeholder="Email"
        placeholderTextColor={theme.textSecondary.color}
        inputMode='email'
        keyboardType='email-address'
        editable={true}
      />
      <TextInput
        style={{ ...CustomStyles.input, backgroundColor: theme.container.backgroundColor, color: theme.textPrimary.color }}
        onChangeText={(text) => setPasswordInput(text)}
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
    </View>
    <View>
      <Modal
        visible={isSuccessModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => {
          setIsSuccessModalVisible(false) 
          console.warn(errorModal)}}
      >
        <View style={CustomStyles.modalContainer}>
          <View style={{ ...CustomStyles.modalContent, backgroundColor: theme.container.backgroundColor }}>
            <Text style={{ ...CustomStyles.modalText, color: theme.success.color }}>Login Successful! Bienvenid@ </Text>
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
        visible={isLoadingModalVisible}
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
      <Modal
        visible={errorModal}
        transparent
        animationType="slide"
        onRequestClose={() => setErrorModal(false)}
      >
        <View style={CustomStyles.modalContainer}>
          <View style={{ ...CustomStyles.modalContent, backgroundColor: theme.container.backgroundColor }}>
            <Text style={{ ...CustomStyles.modalText, color: theme.success.color }}>Ha habido un Error</Text>
            <TouchableOpacity
              style={{ ...CustomStyles.modalButton, backgroundColor: theme.primary }}
              onPress={() => setErrorModal(false)}
            >
              <Text style={{ ...CustomStyles.buttonText, color: theme.textPrimary.color }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View> 
  </KeyboardAvoidingView>
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
    width: '70%',
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