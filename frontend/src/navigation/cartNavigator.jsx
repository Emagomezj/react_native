import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CartScreen from "../screens/CartScreen";

const stack = createNativeStackNavigator();

export const CartNavigator = () => {
    return (
        <stack.Navigator>
            <stack.Screen name="Cart" component={CartScreen} />
        </stack.Navigator>
    )
}