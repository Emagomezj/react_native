import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CartScreen from "../screens/CartScreen";
import { useSelector } from "react-redux";

const stack = createNativeStackNavigator();

export const CartNavigator = () => {
    const theme = useSelector(state => state.themeReducer.styles);
    return (
        <stack.Navigator 
        screenOptions={{
            headerStyle: { backgroundColor: theme.container.backgroundColor,
            borderBottomColor: theme.textSecondary.color,
            borderBottomWidth: 1,
            },
            headerTintColor: theme.textPrimary.color,
            contentStyle: {
                backgroundColor: theme.container.backgroundColor
            },
            headerShadowVisible: false
        }}>
            <stack.Screen name="Cart" component={CartScreen} />
        </stack.Navigator>
    )
}