import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Modal, KeyboardAvoidingView,Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { useCreateUserMutation } from '../../services/authService';

const RegisterScreen = () => {
  const theme = useSelector(state => state.themeReducer.styles);

  const navigation = useNavigation()

  const [nameInput, setNameInput] = useState('');
  const [surnameInput, setSurnameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [validatePasswordInput, setValidatePasswordInput] = useState('');

  const [isLoadingModalVisible, setIsLoadingModalVisible] = useState(false)
  const [errorModal, setErrorModal] = useState(false)
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false)

  const [createUser, {data, error, isLoading}] = useCreateUserMutation();

  const handleRegister = async () => {
    try {
      setIsLoadingModalVisible(true);
      const pattern = /^[a-zA-z0-9._+-]+@[a-zA-Z]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/
      if(passwordInput != validatePasswordInput || !pattern.test(emailInput) || !nameInput || !surnameInput || !passwordInput){
        setIsLoadingModalVisible(false);
        setErrorModal(true);
      } else {
        const response = await createUser({email: emailInput, name: nameInput, surname: surnameInput, password: passwordInput});
        if(response?.error){
          setIsLoadingModalVisible(false);
          setErrorModal(true);
        }else{
          setIsLoadingModalVisible(false);
          setIsSuccessModalVisible(true)
        }
      }
      
    } catch (error) {
      
    }
  }

  return (
    <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex:1}}>
    <View style={[CustomStyles.container, { backgroundColor: theme.background }]}>
      <Text style={[CustomStyles.title, { color: theme.textPrimary }]}>Registro</Text>
      <TextInput
        style={[CustomStyles.input, { borderColor: theme.textSecondary, backgroundColor: theme.backgroundSecondary }]}
        placeholder="Nombre"
        onChangeText={(text) => setNameInput(text)}
        placeholderTextColor={theme.textSecondary}
      />
      <TextInput
        style={[CustomStyles.input, { borderColor: theme.textSecondary, backgroundColor: theme.backgroundSecondary }]}
        placeholder="Apellido"
        onChangeText={(text) => setSurnameInput(text)}
        placeholderTextColor={theme.textSecondary}
      />
      <TextInput
        style={[CustomStyles.input, { borderColor: theme.textSecondary, backgroundColor: theme.backgroundSecondary }]}
        placeholder="Correo"
        onChangeText={(text) => setEmailInput(text)}
        placeholderTextColor={theme.textSecondary}
      />
      <TextInput
        style={[CustomStyles.input, { borderColor: theme.textSecondary, backgroundColor: theme.backgroundSecondary }]}
        placeholder="Contraseña"
        onChangeText={(text) => setPasswordInput(text)}
        placeholderTextColor={theme.textSecondary}
        secureTextEntry
      />
      <TextInput
        style={[CustomStyles.input, { borderColor: theme.textSecondary, backgroundColor: theme.backgroundSecondary }]}
        placeholder="Confirmar-Repetir Contraseña"
        onChangeText={(text) => setValidatePasswordInput(text)}
        placeholderTextColor={theme.textSecondary}
        secureTextEntry
      />
      <TouchableOpacity
        style={[CustomStyles.button, { backgroundColor: theme.primary }]}
        onPress={handleRegister}
      >
        <Text style={[CustomStyles.buttonText, { color: theme.backgroundSecondary }]}>Registrarse</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[CustomStyles.button, { backgroundColor: theme.primary }]}
        onPress={() => navigation.navigate('Login',{})}
      >
        <Text style={[CustomStyles.buttonText, { color: theme.backgroundSecondary }, {marginTop: 20}]}>Ir a Login</Text>
      </TouchableOpacity>
      </View>
      <View>
            <Modal
              visible={isLoadingModalVisible}
              transparent
              animationType="slide"
              onRequestClose={() => setIsLoadingModalVisible(false)}
            >
              <View style={CustomStyles.modalContainer}>
                <View style={{ ...CustomStyles.modalContent, backgroundColor: theme.container.backgroundColor }}>
                  <Text style={{ ...CustomStyles.modalText, color: theme.success.color }}>Cargando... </Text>
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
                  <Text style={{ ...CustomStyles.modalText, color: theme.error.color }}>Ha habido un Error</Text>
                  <TouchableOpacity
                    style={{ ...CustomStyles.modalButton, backgroundColor: theme.primary }}
                    onPress={() => setErrorModal(false)}
                  >
                    <Text style={{ ...CustomStyles.buttonText, color: theme.textPrimary.color }}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
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
                  <Text style={{ ...CustomStyles.modalText, color: theme.success.color }}>Usuario creado con éxito! </Text>
                  <TouchableOpacity
                    style={{ ...CustomStyles.modalButton, backgroundColor: theme.primary }}
                    onPress={() => {
                      setNameInput('');
                      setSurnameInput('');
                      setEmailInput('');
                      setPasswordInput('');
                      setValidatePasswordInput('');
                      setIsSuccessModalVisible(false);
                      navigation.navigate('UserPage',{});
                    }}
                  >
                    <Text style={{ ...CustomStyles.buttonText, color: theme.textPrimary.color }}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
    </View>
    </KeyboardAvoidingView>
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