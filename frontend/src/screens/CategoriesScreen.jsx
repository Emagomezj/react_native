import { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { FlatList, View, Text } from 'react-native';
import { setCategory } from '../features/shop/shopSlice';
import { ProductCard } from '../components/productCard';
import { useFilterProductsByCategoryQuery } from '../services/shopService';

export const CategoriesScreen = ({route}) => {
    const styles = useSelector(state => state.themeReducer.styles);
    const { categories } = route.params
    const {data , error, isLoading} = useFilterProductsByCategoryQuery(categories);

    return  isLoading ? 
    <View style={styles.container}><Text>Cargando...</Text></View> : error? 
    (() => {console.error(error) 
        return (<View style={styles.container}><Text>Ha habido un error</Text></View>)}) () : <View style={styles.container}><FlatList data={data.payload.products} renderItem={({item}) => <ProductCard item={item} styles={styles} />}/></View>
}