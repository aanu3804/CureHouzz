import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return { ...state, user: action.payload.user, token: action.payload.token };
        case "LOGOUT":
            return { ...state, user: null, token: null };
        default:
            return state;
    }
};

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, { user: null, token: null });

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");
        if (storedUser && storedToken) {
            dispatch({
                type: "LOGIN_SUCCESS",
                payload: { user: JSON.parse(storedUser), token: storedToken },
            });
        }
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        dispatch({ type: "LOGOUT" });
    };

    return (
        <AuthContext.Provider value={{ user: state.user, token: state.token, dispatch, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
