import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector,useDispatch } from "react-redux";
import { ProductsScreen, ProductScreen, CategoriesScreen,HomeScreen } from "../screens";

const stack = createNativeStackNavigator()

export const ShopNavigator = () => {
    return (
        <NavigationContainer>
            <stack.Navigator>
                <stack.Screen name="Home" component={HomeScreen} />
                <stack.Screen name="Products" component={ProductsScreen}/>
                <stack.Screen name="Category" component={CategoriesScreen} />
                <stack.Screen name="ProductDetail" title='Detalles del Producto' component={ProductScreen} />
            </stack.Navigator>
        </NavigationContainer>
    )
}

//<stack.Screen name="Home" component={HomeScreen}/>