import { Text, View, Image } from 'react-native';
import { Pressable } from 'react-native';
import { StyleSheet } from 'react-native';
import { URL } from '@env';
import { useNavigation } from '@react-navigation/native';

const CategoryCard = ({item, styles}) => {
    const navigation = useNavigation()
    return (
    <Pressable
      onPress={() => navigation.navigate('Category', { categories: [item.category] })}
      style={{...styles.card, backgroundColor: '#FFE599'}}
    >
    <Text style={{...styles.textPrimary, color: "#FFFFF"}}>{item.category}</Text>
    <Image
        source={{ uri: `${URL.slice(0, -1)}${item.thumbnail}` }}
        style={styleImage.productImage}
        resizeMode="contain"
    />
    </Pressable>)
}

export {CategoryCard}

const styleImage = StyleSheet.create({
    productImage: {
        width: 100,
        height: 100
    }
})