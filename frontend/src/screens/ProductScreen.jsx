import {useSelector, useDispatch} from 'react-redux';
import { useGetProductByIdQuery } from '../services/shopService';
import { FlatList, View, Image, Modal, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Text } from 'react-native';
import { StyleSheet } from 'react-native';
import Button from '../components/button';
import { addItem } from '../features/cart/cartSlice';
import { URL } from '@env';



export const ProductScreen = ({route}) => {
    const {id, styles} = route.params
    const {data : product, error, isLoading} = useGetProductByIdQuery(id) 
    const dispatch = useDispatch()
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
    const theme = useSelector(state => state.themeReducer.styles);
    
    return isLoading ? 
    <View style={styles.container}><Text>Cargando...</Text></View> : error? 
    (() => {console.log(error) 
        return (<View style={styles.container}><Text>Ha habido un error</Text></View>)}) () : 
        <View style={styles.container}><Text style={styles.textPrimary}>{product.payload.title}</Text>
        <Image
            source={{ uri: `${URL.slice(0, -1)}${product.payload.thumbnail}` }}
            style={styleImage.productImage}
            resizeMode="contain"
        />
        <Text style={styles.textSecondary}>{product.payload.desciption}</Text>
        <Text style={styles.textSecondary}>${product.payload.price}</Text>
        <Button title={'Agregar al carrito'} onPress={() => {
            dispatch(addItem({ product: product.payload, quantity: 1 }))
            setIsSuccessModalVisible(true)
            }} />
        <Modal
        visible={isSuccessModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsSuccessModalVisible(false)}
      >
        <View style={CustomStyles.modalContainer}>
          <View style={{ ...CustomStyles.modalContent, backgroundColor: theme.container.backgroundColor }}>
            <Text style={{ ...CustomStyles.modalText, color: theme.textPrimary.color }}>Producto agregado con éxito </Text>
            <TouchableOpacity
              style={{ ...CustomStyles.modalButton, backgroundColor: theme.primary }}
              onPress={() => setIsSuccessModalVisible(false)}
            >
              <Text style={{ ...CustomStyles.buttonText, color: theme.textPrimary.color }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>    
        </View>


}


const styleImage = StyleSheet.create({
    productImage: {
        width: 300,
        height: 300
    }
})
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