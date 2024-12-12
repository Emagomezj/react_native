import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector,useDispatch } from "react-redux";
import SettingsScreen from "../screens/SettingsScreen";

const stack = createNativeStackNavigator();

export const SettingsNavigator = () => {
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
            }}
            >
                <stack.Screen name="Settings" component={SettingsScreen} />
            </stack.Navigator>
    )
}