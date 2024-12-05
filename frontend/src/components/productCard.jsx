import { Text, View, Image, Pressable } from 'react-native';
import { StyleSheet } from 'react-native';
import { URL } from '@env';
import { useNavigation } from '@react-navigation/native';

const ProductCard = ({item, styles}) => {
    const navigation = useNavigation()
    return (<Pressable 
    onPress={() => navigation.navigate('ProductDetail', {id: item.id, styles})} style={styles.card}>
    <Text style={styles.textPrimary}>{item.title}</Text>
    <Image
        source={{ uri: `${URL.slice(0, -1)}${item.thumbnail}` }}
        style={styleImage.productImage}
        resizeMode="contain"
    />
    <Text style={styles.textSecondary}>{item.desciption}</Text>
    <Text style={styles.textSecondary}>${item.price}</Text>
    </Pressable>)
}

export {ProductCard}

const styleImage = StyleSheet.create({
    productImage: {
        width: 100,
        height: 100
    }
})