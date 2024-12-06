import { Text, View, FlatList, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import { ProductCard } from '../components/productCard';
import { CategoryCard } from '../components/categoryCard';
import { useGetProductsQuery } from '../services/shopService';
import { useGetHomeDataQuery } from '../services/homeService';
import { useState, useCallback, useEffect } from 'react';
const Home = ({ data, styles }) => {
    const [page, setPage] = useState(1);
    const [additionalProductsList, setAdditionalProductsList] = useState([]);
    const { data: additionalProducts, error: additionalError, isLoading: loadingProducts } = useGetProductsQuery(
        { page: page, limit: 10 }
    );

    
    useEffect(() => {
        if (additionalProducts && additionalProducts.payload.products.length > 0) {
            setAdditionalProductsList(prevProducts => [
                ...prevProducts,
                ...additionalProducts.payload.products
            ]);
        }
    }, [additionalProducts]);

    const handleLoadMore = useCallback(() => {
        if (additionalProducts && additionalProducts.payload.hasNext && !loadingProducts) {
            setPage(prevPage => prevPage + 1);
        }
    }, [additionalProducts, loadingProducts]);

    return (
        <FlatList
            style={styles.container}
            ListHeaderComponent={
                <View style={styles.container}>
                    <FlatList
                        data={data.payload.categories}
                        renderItem={({ item }) => <CategoryCard item={item} styles={styles} />}
                        keyExtractor={(item) => item.category}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        nestedScrollEnabled
                    />
                </View>
            }
            data={[...data.payload.products, ...additionalProductsList]}
            renderItem={({ item }) => <ProductCard item={item} styles={styles} />}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
                loadingProducts ? (
                    <ActivityIndicator size="large" color="#0000ff" style={{ marginVertical: 20 }}/>
                ) : additionalError ? (() => { console.error(additionalError)
                 return (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>Ha ocurrido un error al cargar más productos</Text>
                    </View>)
            })() : null
            }
            nestedScrollEnabled
        />
    );
};

export const HomeScreen = () => {
    const styles = useSelector(state => state.themeReducer.styles);
    const { data, error, isLoading } = useGetHomeDataQuery();

    return isLoading ? (
        <View style={styles.container}>
            <Text>Cargando...</Text>
        </View>
    ) : error ? (
        <View style={styles.container}>
            <Text>Ha habido un error</Text>
        </View>
    ) : (
        <Home data={data} styles={styles} style={styles.container}/>
    );
};
