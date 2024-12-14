import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import { LoginScreen } from "../screens/auth/loginScreen";
import RegisterScreen from "../screens/auth/registerScreen";
import ReceiptScreen from "../screens/receiptScreen";
import ReceiptsScreen from "../screens/receiptsScreen";

const stack = createNativeStackNavigator();

export const UserNavigator = () => {
    const theme = useSelector(state => state.themeReducer.styles);
    return(
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
        }}
        >
            <stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <stack.Screen name="Registrarse" component={RegisterScreen} options={{ headerShown: false }} />
            <stack.Screen name="Ticket" component={ReceiptScreen} />
            <stack.Screen name="Compras" component={ReceiptsScreen} />
        </stack.Navigator>
    )
}