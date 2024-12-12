import { act, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toggleTheme } from "../src/features/theme/themeSlice";
import { fetchTheme } from "../src/db";

const useThemeSync = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const initializeTheme = async () => {
            try {
                const theme = await fetchTheme();
                if (theme.length > 0) {
                    const activeTheme = theme[0];
                    if(activeTheme.DARK === 1) dispatch(toggleTheme());
                }
                return
            } catch (error) {
                console.error("Error al verificar el tema:", error);
            }
        };

        initializeTheme();
    }, []);
};

export default useThemeSync;
