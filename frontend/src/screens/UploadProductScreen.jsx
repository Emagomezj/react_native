import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useUploadProductMutation } from '../services/shopService';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const ProductUploadScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [brand, setBrand] = useState('');
  const [stock, setStock] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const session = useSelector(state => state.sessionReducer);
  const themeStyles = useSelector((state) => state.themeReducer.styles);
  const navigation = useNavigation()

  if(!session.logged) navigation.navigate('Login',{})

  const [uploadProduct, { isLoading }] = useUploadProductMutation();

  const pickImage = async (source) => {
    const permissionResult =
      source === 'camera'
        ? await ImagePicker.requestCameraPermissionsAsync()
        : await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permission Denied', `Permission to access the ${source} is required!`);
      return;
    }

    const result =
      source === 'camera'
        ? await ImagePicker.launchCameraAsync({ allowsEditing: true, quality: 1 })
        : await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, quality: 1 });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!title || !description || !price || !imageUri) {
      Alert.alert('Error', 'Please fill in all fields and select an image');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('brand', brand);
    formData.append('stock', stock);
    formData.append('seller', session.user.id)
    formData.append('file', {
      uri: imageUri,
      name: 'product.jpg',
      type: 'image/jpeg',
    });

    try {
      await uploadProduct(formData).unwrap();
      Alert.alert('Buenísimo!', 'Tu producto ha sido agregado con éxito');
      setTitle('');
      setDescription('');
      setPrice('');
      setImageUri(null);
    } catch (error) {
      console.error('Error uploading product:', error);
      Alert.alert('Error', error.data?.message || 'Failed to upload the product');
    }
  };

  return (
    <View style={{...styles.container, backgroundColor: themeStyles.container.backgroundColor}}>
      <Text style={{...styles.title, color: themeStyles.textPrimary.color }}>Agregar Producto</Text>

      <TextInput
        style={{...styles.input, color: themeStyles.textPrimary.color}}
        placeholder="Product Name"
        placeholderTextColor={themeStyles.textSecondary.color}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={{...styles.input, color: themeStyles.textPrimary.color}}
        placeholder="Description"
        placeholderTextColor={themeStyles.textSecondary.color}
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TextInput
        style={{...styles.input, color: themeStyles.textPrimary.color}}
        placeholder="Marca"
        placeholderTextColor={themeStyles.textSecondary.color}
        value={brand}
        onChangeText={setBrand}
      />
      <TextInput
        style={{...styles.input, color: themeStyles.textPrimary.color}}
        placeholder="Price"
        placeholderTextColor={themeStyles.textSecondary.color}
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <TextInput
        style={{...styles.input, color: themeStyles.textPrimary.color}}
        placeholder="Stock"
        placeholderTextColor={themeStyles.textSecondary.color}
        value={stock}
        onChangeText={setStock}
        keyboardType="numeric"
      />


      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.imagePreview} />
      )}

      <View style={styles.buttonContainer}>
        <Button
          title="Pick Image from Gallery"
          onPress={() => pickImage('gallery')}
        />
        <Button
          title="Take a Photo"
          onPress={() => pickImage('camera')}
        />
      </View>

      <Button
        title={isSubmitting ? 'Uploading...' : 'Submit'}
        onPress={handleSubmit}
        disabled={isSubmitting}
        color="#2196F3"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});

export default ProductUploadScreen;
