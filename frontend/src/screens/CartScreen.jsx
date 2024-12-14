import { FlatList, StyleSheet, Text, View, Image,Pressable, Modal, TouchableOpacity } from 'react-native';
import React from 'react';
import { ProductCard } from '../components/productCard';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePostReceiptMutation } from '../services/receiptsService';
import { clearCart } from '../features/cart/cartSlice';
import { addItem, removeItem, decreaseItem } from '../features/cart/cartSlice';
import { useNavigation } from '@react-navigation/native';
import { URL } from '@env';

const CartScreen = () => {
    const themeStyles = useSelector(state => state.themeReducer.styles);
    const cart = useSelector(state=>state.cartReducer.value.cartItems)
    const total = useSelector(state=>state.cartReducer.value.total)
    const [triggerPost, { data, error, isLoading }] = usePostReceiptMutation()
    
    const [loginModal, setLoginModal] = useState(false);
    const [isLoadingModalVisible, setIsLoadingModalVisible] = useState(false);
    const [errorModal, setErrorModal] = useState(false);
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false)

    const cartLength = useSelector(state=>state.cartReducer.value.cartLenght)
    const session = useSelector(state => state.sessionReducer)

    const dispatch = useDispatch();
    const navigation = useNavigation()

    const handleSubmit = async () => {
        setIsLoadingModalVisible(true)
        if(!session.logged) {
            setIsLoadingModalVisible(false)
            setLoginModal(true)
            return
        }
        const user = session.user
        const response = await triggerPost({user: user.id,cart,total,createdAt: Date.now()})
        if(response.error){
            console.error(error)
            setIsLoadingModalVisible(false);
            setErrorModal(true);
            setTimeout(() => setErrorModal(false),1000)
        } else {
            setIsLoadingModalVisible(false);
            setIsSuccessModalVisible(true);
            setTimeout(() => {
                navigation.navigate('UserPage', {
                    screen: 'Ticket',
                    params: response.data.payload
                });
                setIsSuccessModalVisible(false)
            },1000)
            dispatch(clearCart())
        }
    }

    const FooterComponent = () => (
        <View style={{...themeStyles.container, ...styles.footerContainer}}>
            <Text style={{...styles.footerTotal, color: themeStyles.textPrimary.color}}>Total: $ {total} </Text>
            <Pressable style={styles.confirmButton} onPress={handleSubmit} >
                <Text style={{...styles.confirmButtonText, color: themeStyles.textPrimary.color}}>Confirmar</Text>
            </Pressable>
        </View>
    )

    const renderCartItem = ({ item }) => (
        <View style={themeStyles.container}>
            <View style={{...themeStyles.container, ...styles.cartContainer, marginBottom:0, paddingBottom:0}}>
                <View>
                    <Image
                        source={{uri:`${URL.slice(0, -1)}${item.product.thumbnail}`}}
                        style={styles.cartImage}
                        resizeMode='cover'
                    />
                </View>
                <View style={{...styles.cartDescription, color: themeStyles.textPrimary.color }}>
                    <Text style={{...styles.title, color: themeStyles.textPrimary.color}}>{item.product.title}</Text>
                    <Text style={{...styles.description, color: themeStyles.textSecondary.color}}>{item.product.description}</Text>
                    <Text style={{...styles.description, color: themeStyles.textSecondary.color}}>{item.product.stock}</Text>
                </View>
            </View>
            <View style={{...themeStyles.container, ...styles.cartContainer, marginTop: 0, paddingTop:0}}>
                    <Text style={{color: themeStyles.textPrimary.color}}>Cantidad:</Text>
                    <Pressable onPress={() => dispatch(decreaseItem(item.product.id))} >
                    <Icon name='horizontal-rule' size={24} color={themeStyles.textPrimary.color} />
                    </Pressable>
                    <Text style={{...styles.quantity, color: themeStyles.textPrimary.color}}> {item.quantity}</Text>
                    <Pressable onPress={() => dispatch(addItem({ product: item.product, quantity: 1 }))} >
                    <Icon name='add' size={24} color= {themeStyles.textPrimary.color} />
                    </Pressable>
                    <Text style={{...styles.total, marginTop:0, color: themeStyles.textPrimary.color}}>Subtotal: ${parseFloat((item.quantity*item.product.price).toFixed(2))}</Text>
                    <Pressable onPress={() => dispatch(removeItem(item.product.id))}>
                    <Icon name="delete" size={24} color="#FC7A5E" style={styles.trashIcon} />
                    </Pressable>
            </View>
        </View>
    )

    return (
        <>
        {
        cartLength>0
        ?
        <View>
        <FlatList
            data={cart}
            keyExtractor={item => item.product.id}
            renderItem={renderCartItem}
            ListHeaderComponent={<Text style={{...styles.cartScreenTitle, color: themeStyles.textPrimary.color}}>Tu carrito:</Text>}
            ListFooterComponent={<FooterComponent />}
        />
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
                  <View style={{ ...CustomStyles.modalContent, backgroundColor: themeStyles.container.backgroundColor }}>
                    <Text style={{ ...CustomStyles.modalText, color: themeStyles.success.color }}>Compra realizada con éxito </Text>
                    <TouchableOpacity
                      style={{ ...CustomStyles.modalButton, backgroundColor: themeStyles.primary }}
                      onPress={() => setIsSuccessModalVisible(false)}
                    >
                      <Text style={{ ...CustomStyles.buttonText, color: themeStyles.textPrimary.color }}>Close</Text>
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
                  <View style={{ ...CustomStyles.modalContent, backgroundColor: themeStyles.container.backgroundColor }}>
                    <Text style={{ ...CustomStyles.modalText, color: themeStyles.success.color }}>Cargando... </Text>
                    <TouchableOpacity
                      style={{ ...CustomStyles.modalButton, backgroundColor: themeStyles.primary }}
                      onPress={() => setIsLoadingModalVisible(false)}
                    >
                      <Text style={{ ...CustomStyles.buttonText, color: themeStyles.textPrimary.color }}>Close</Text>
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
                  <View style={{ ...CustomStyles.modalContent, backgroundColor: themeStyles.container.backgroundColor }}>
                    <Text style={{ ...CustomStyles.modalText, color: themeStyles.success.color }}>Ha habido un Error</Text>
                    <TouchableOpacity
                      style={{ ...CustomStyles.modalButton, backgroundColor: themeStyles.primary }}
                      onPress={() => setErrorModal(false)}
                    >
                      <Text style={{ ...CustomStyles.buttonText, color: themeStyles.textPrimary.color }}>Close</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
              <Modal
                visible={loginModal}
                transparent
                animationType="slide"
                onRequestClose={() => setLoginModal(false)}
              >
                <View style={CustomStyles.modalContainer}>
                  <View style={{ ...CustomStyles.modalContent, backgroundColor: themeStyles.container.backgroundColor }}>
                    <Text style={{ ...CustomStyles.modalText, color: themeStyles.success.color }}>Antes de realizar la compra debe registrarse o ingresar</Text>
                    <TouchableOpacity
                      style={{ ...CustomStyles.modalButton, backgroundColor: themeStyles.primary }}
                      onPress={() => {
                        setLoginModal(false);
                        navigation.navigate('Login',{})
                      }}
                    >
                      <Text style={{ ...CustomStyles.buttonText, color: themeStyles.textPrimary.color }}>Close</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>
        </View>
        :
        <View style={{...themeStyles,...styles.cartEmpty}}><Text style={{...styles.cartEmptyText, color: themeStyles.textPrimary.color}} >Aún no hay productos en el carrito</Text></View>
        }
        </>
    )
}

export default CartScreen

const styles = StyleSheet.create({
    cartContainer: {
        flexDirection: 'row',
        padding: 20,
        justifyContent: "flex-start",
        margin: 16,
        alignItems: "center",
        gap: 10
    },
    cartImage: {
        width: 80,
        height: 80
    },
    cartDescription: {
        width: '80%',
        padding: 20,
    },
    title: {
        fontSize: 16,
        fontWeight: '700'
    },
    description: {
        marginBottom: 16,
    },
    total: {
        marginTop: 16,
        fontSize: 16,
        fontWeight: '700'
    },
    trashIcon: {
        alignSelf: 'flex-end',
        marginRight: 16,
    },
    footerContainer: {
        padding: 32,
        gap: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footerTotal: {
        fontSize: 16,
        fontWeight: '700'
    },
    confirmButton: {
        padding: 8,
        paddingHorizontal: 16,
        borderRadius: 16,
        marginBottom: 24,
    },
    confirmButtonText: {
        fontSize: 16,
        fontWeight: '700'
    }, 
    cartScreenTitle: {
        fontSize: 16,
        fontWeight: '700',
        textAlign: "center",
        paddingVertical: 8
    },
    cartEmpty:{
        flex:1,
        justifyContent:'center',
        alignItems: 'center'
    },
    cartEmptyText:{
        fontSize: 16
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