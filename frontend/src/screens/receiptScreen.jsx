import { FlatList, StyleSheet, Text, View, Image,Pressable, Modal, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { URL } from '@env';

const ReceiptScreen = () => {

    const themeStyles = useSelector(state => state.themeReducer.styles);
    const session = useSelector(state => state.sessionReducer);
    
    const route = useRoute();
    const navigation = useNavigation();

    if(!session.logged) (() => navigation.navigate('Login',{}) )()

    const receipt = route.params?.id ? route.params : route.params.item;

    const date = new Date(receipt.createdAt);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);

    const formattedDate = `${day}/${month}/${year}`;

    const FooterComponent = () => (
            <View style={{...themeStyles.container, ...styles.footerContainer}}>
                <Text style={{...styles.footerTotal, color: themeStyles.textPrimary.color}}>Total: $ {receipt.total} </Text>
                <Pressable style={styles.confirmButton} onPress={() => navigation.navigate('Login',{})} >
                    <Text style={{...styles.confirmButtonText, color: themeStyles.textPrimary.color}}>Volver</Text>
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
                <View style={{...styles.cartDescription, color:themeStyles.textPrimary.color }}>
                    <Text style={{...styles.title, color: themeStyles.textPrimary.color}}>{item.product.title}</Text>
                        <Text style={{...styles.description, color: themeStyles.textSecondary.color}}>{item.product.description}</Text>
                </View>
            </View>
            <View style={{...themeStyles.container, ...styles.cartContainer, marginTop: 0, paddingTop:0}}>
                <Text style={{color: themeStyles.textPrimary.color}}>Cantidad:</Text>
                <Text style={{...styles.quantity, color: themeStyles.textPrimary.color}}> {item.quantity}</Text>
            </View>
        </View>
    )


    
    return(
        <View>
        <FlatList
            data={receipt.cart}
            keyExtractor={item => item.product.id}
            renderItem={renderCartItem}
            ListHeaderComponent={<View style={themeStyles.container}><Text style={{...styles.cartScreenTitle, color: themeStyles.textPrimary.color}}>Ticket de compra {receipt.id}</Text> 
            <Text style={{...styles.cartScreenTitle, color: themeStyles.textPrimary.color}}>Realizada el: {formattedDate}</Text></View>}
            ListFooterComponent={<FooterComponent />}
                />
        </View>
    )
};

export default ReceiptScreen

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
    }, cartScreenTitle: {
        fontSize: 16,
        fontWeight: '700',
        textAlign: "center",
        paddingVertical: 8
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