import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen } from "../screens/auth/loginScreen";
import RegisterScreen from "../screens/auth/registerScreen";

const stack = createNativeStackNavigator();

export const UserNavigator = () => {
    return(
        <stack.Navigator>
            <stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <stack.Screen name="Registrarse" component={RegisterScreen} options={{ headerShown: false }} />
        </stack.Navigator>
    )
}