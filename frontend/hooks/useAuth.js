import { act, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "../src/features/auth/sessionSlice";
import { fetchSession } from "../src/db";

const useAuthSync = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const initializeSession = async () => {
            try {
                const session = await fetchSession();
                if (session.length > 0) {
                    const activeSession = session[0];
                    dispatch(login({ user: {id: activeSession.localId, name: activeSession.name, email: activeSession.email}, token: activeSession.token }));
                }
                return
            } catch (error) {
                console.error("Error al verificar sesiones:", error);
            }
        };

        initializeSession();
    }, []);
};

export default useAuthSync;
