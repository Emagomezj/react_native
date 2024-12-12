import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./tabNavigator";
import useAuthSync from "../../hooks/useAuth";
import useThemeSync from "../../hooks/useTheme";


const MainNavigator = () => {
    useAuthSync()
    useThemeSync()
    return(
        <NavigationContainer>
            <TabNavigator/>
        </NavigationContainer>
    )
}

export default MainNavigator