import {useSelector, useDispatch} from 'react-redux';
import { useGetProductsQuery } from '../services/shopService';
import { FlatList, View } from 'react-native';
import { Text } from 'react-native';
import { ProductCard } from '../components/productCard';



export const ProductsScreen = () => {
    const styles = useSelector(state => state.themeReducer.styles)
    const {data : products, error, isLoading} = useGetProductsQuery() 
    return isLoading ? 
    <View style={styles.container}><Text>Cargando...</Text></View> : error? 
    (() => {console.log(error) 
        return (<View style={styles.container}><Text>Ha habido un error</Text></View>)}) () : 
        <View style={styles.container}><FlatList data={products.payload} renderItem={({ item }) => <ProductCard item={item} styles={styles}/>} /></View>
}
