import { StatusBar } from 'expo-status-bar';
import { useSelector } from 'react-redux';

const CustomStatusBar = () => {
    const mode = useSelector(state => state.themeReducer.mode);
    return(
        <StatusBar style={mode === "light" ? "dark" : "light"} />
    )
}

export default CustomStatusBar