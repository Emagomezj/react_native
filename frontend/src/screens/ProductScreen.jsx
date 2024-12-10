import {useSelector, useDispatch} from 'react-redux';
import { useGetProductByIdQuery } from '../services/shopService';
import { FlatList, View, Image } from 'react-native';
import { Text } from 'react-native';
import { StyleSheet } from 'react-native';
import Button from '../components/button';
import { addItem } from '../features/cart/cartSlice';
import { URL } from '@env';



export const ProductScreen = ({route}) => {
    const {id, styles} = route.params
    const {data : product, error, isLoading} = useGetProductByIdQuery(id) 
    const dispatch = useDispatch()
    
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
        <Button title={'Agregar al carrito'} onPress={() => dispatch(addItem({ product: product.payload, quantity: 1 }))} />
        </View>


}


const styleImage = StyleSheet.create({
    productImage: {
        width: 300,
        height: 300
    }
})