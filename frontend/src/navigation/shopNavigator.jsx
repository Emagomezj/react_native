import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector,useDispatch } from "react-redux";
import { ProductsScreen, ProductScreen, CategoriesScreen,HomeScreen } from "../screens";

const stack = createNativeStackNavigator();

export const ShopNavigator = () => {
    const theme = useSelector(state => state.themeReducer.styles);


    return (
            <stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: theme.container.backgroundColor,
                borderBottomColor: theme.textSecondary.color,
                borderBottomWidth: 1,
                },
                headerTintColor: theme.textPrimary.color,
                headerShadowVisible: false
            }}
            >
                <stack.Screen name="Home" component={HomeScreen} />
                <stack.Screen name="Products" component={ProductsScreen}/>
                <stack.Screen name="Category" component={CategoriesScreen} />
                <stack.Screen name="ProductDetail" title='Detalles del Producto' component={ProductScreen} />
            </stack.Navigator>
    )
}

//<stack.Screen name="Home" component={HomeScreen}/>