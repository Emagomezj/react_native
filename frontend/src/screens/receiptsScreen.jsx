import { FlatList, StyleSheet, Text, View, Image,Pressable, Modal, TouchableOpacity } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useGetUserReceiptsQuery } from '../services/receiptsService';
import { formatDate } from '../utils/functions';

const ReceiptsScreen = () => {
    const themeStyles = useSelector(state => state.themeReducer.styles);
    const session = useSelector(state => state.sessionReducer);

    const [receipts, setReceipts] = useState(undefined);
    const [isLoadingModalVisible, setIsLoadingModalVisible] = useState(false)

    const navigation = useNavigation();

    if(!session.logged) (() => navigation.navigate('Login',{}) )
    
    //console.warn(session.user.id)

    const {data, error, isLoading} = useGetUserReceiptsQuery({uid: session.user.id})

    //if(!isLoading && data?.payload) console.warn(data);

    const renderItem = ({item}) => (
        <TouchableOpacity onPress={() => navigation.navigate('Ticket', {item})}>
            <View style={{...customStyles.cartContainer, backgroundColor: themeStyles.container.backgroundColor}}>
                <View style={{backgroundColor: themeStyles.container.backgroundColor}}>
                    <Text style={{...customStyles.title,color: themeStyles.textPrimary.color}}>
                        {item.id}
                    </Text>
                    <Text style={{...customStyles.subtitle,color: themeStyles.textSecondary.color}}>
                        {formatDate(item.createdAt)}
                    </Text>
                </View>
                <View style={{...customStyles.cartContainer, backgroundColor: themeStyles.container.backgroundColor}}>
                    <Text style={{...customStyles.title,color: themeStyles.textPrimary.color}}>
                        Total: {item.total}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
    return isLoading ? <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}><ActivityIndicator size={"large"} /></View>
    :
    error? (() => {
        console.error(error)
        return <View><Text>Error: {JSON.stringify(error,null,2)}</Text></View>
    })()
    :
    <View> 
    <FlatList
        data={data.payload}
        keyExtractor={item => item.id}
        renderItem={renderItem}
    />
    </View>
}

export default ReceiptsScreen

const customStyles = StyleSheet.create({
    cartContainer: {
        padding: 20,
        justifyContent: "flex-start",
        margin: 16,
        alignItems: "center",
        gap: 10
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
    title: {
        fontSize: 16,
        fontWeight: '700'
    },
    subtitle: {
        fontSize: 16,
        fontWeight: 'normal'
    }
})