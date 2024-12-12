import { Text, View, Pressable } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet } from "react-native";
import { updateTheme } from "../db";
import { toggleTheme } from "../features/theme/themeSlice";

const SettingsScreen = () => {
    const theme = useSelector(state => state.themeReducer.mode)
    const themeStyles = useSelector(state => state.themeReducer.styles);
    const dispatch = useDispatch()
    const toggleThemeFx = () => {
        try {
            if(theme === 'light'){
                updateTheme(1, 1).then(()=>{}).catch(err => console.error(err));
                dispatch(toggleTheme());
                return
            };
            updateTheme(1,0).then(()=>{}).catch(err => console.error(err));
            dispatch(toggleTheme());
        } catch (error) {
            console.error(error)
        }
    };

    return(
        <View style={{...styles.themeTogglerContainer, backgroundColor: themeStyles.container.backgroundColor}}>
                    <Text style={themeStyles.textPrimary}>Dark Theme: </Text>
                    {
                        theme === 'dark'
                            ?
                            <Pressable onPress={toggleThemeFx}><Icon name="toggle-on" size={48} color={"#39FF14"} /></Pressable>
                            :
                            <Pressable onPress={toggleThemeFx}><Icon name="toggle-off" size={48} color={"#EBEBEB"} /></Pressable>
                    }
                </View>
    )
}

export default SettingsScreen

const styles = StyleSheet.create({
    themeTogglerContainer: {
        flexDirection: "row",
        gap: 5,
        justifyContent: "space-around",
        alignItems: "center",
        marginVertical: 8,
    }
})