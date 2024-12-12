import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";
import { useSelector } from "react-redux";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome6';
import { ShopNavigator } from './shopNavigator';
import { UserNavigator } from "./userNavigation";
import { CartNavigator } from "./cartNavigator";
import { SettingsNavigator } from "./settingsNavigator";


const Tab = createBottomTabNavigator()

const TabNavigator = () => {
    const styles = useSelector(state => state.themeReducer.styles);
    return(
        <Tab.Navigator
            initialRouteName="Shop"
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: styles.tabs.background,
                    borderTopColor: styles.tabs.border,
                },
            }}
        >
            <Tab.Screen
                name="Shop"
                component={ShopNavigator}
                options={{
                    tabBarIcon: ({focused}) => (<MaterialIcon name="storefront" size={32} color={focused?styles.tabs.activeTab:styles.tabs.inactiveTab}/>)
                }}
            />
            <Tab.Screen 
                name="CartTab" 
                component={CartNavigator} 
                options={{
                    tabBarIcon: ({focused})=>(<MaterialIcon name="shopping-cart" size={32} color={focused?styles.tabs.activeTab:styles.tabs.inactiveTab} />)
                }}
            />
            <Tab.Screen
                name="UserPage"
                component={UserNavigator}
                options={{
                    tabBarIcon: ({focused}) => (<FontAwesomeIcon name="user" size={32} color={focused?styles.tabs.activeTab:styles.tabs.inactiveTab} />)
                }}
            />
            <Tab.Screen
                name="SettingsNavigator"
                component={SettingsNavigator}
                options={{
                    tabBarIcon: ({focused}) => (<FontAwesomeIcon name="gear" size={32} color={focused?styles.tabs.activeTab:styles.tabs.inactiveTab} />)
                }}
            />
        </Tab.Navigator>
    )
    
}


export default TabNavigator