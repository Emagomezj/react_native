import React, { useEffect } from "react";
import { View, Text, Button, ActivityIndicator, FlatList } from "react-native";
import { useGetUserProductsQuery } from "../services/shopService";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const UserProducts = () => {
    const themeStyles = useSelector((state) => state.themeReducer.styles);
    const session = useSelector((state) => state.sessionReducer);
    const navigation = useNavigation();

    if (!session.logged) {
        navigation.navigate("Login", {});
    }

    
    const { data, error, isLoading, refetch } = useGetUserProductsQuery(session.user.id);

    
    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            refetch(); 
        });

        return unsubscribe; 
    }, [navigation, refetch]);

    return isLoading ? (
        <View>
            <ActivityIndicator size={"large"} />
        </View>
    ) : error ? (
        <View>
            <Text>Ha habido un error</Text>
            <Text>{JSON.stringify(error, null, 2)}</Text>
        </View>
    ) : (
        <View>
            <FlatList
            data={data.payload}
            renderItem={({item})=> <View><Text style={themeStyles.textPrimary}>{item.title}</Text></View>}
            />
            <Button
                title="Agregar"
                onPress={() => navigation.navigate("Agregar Producto", {})}
            />
        </View>
    );
};

export default UserProducts;
