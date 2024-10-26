import { createContext, useContext, useReducer } from "react";

const FAKE_USER = {
    name: "Jack",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
};

const AuthContext = createContext();

function reducer(state, action) {
    switch (action.type) {
        case "login":
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
            };

        case "logout":
            return {
                ...state,
                user: null,
                isAuthenticated: false,
            };

        default:
            throw new Error("Unknown Error");
    }
}

const initialState = {
    user: null,
    isAuthenticated: false,
};

function AuthProvider({ children }) {
    const [{ user, isAuthenticated }, dispatch] = useReducer(
        reducer,
        initialState
    );

    function handleLogin(email, passowrd) {
        if (email === FAKE_USER.email && passowrd === FAKE_USER.password)
            dispatch({ type: "login", payload: FAKE_USER });
    }

    function handleLogout() {
        dispatch({ type: "logout" });
    }

    return (
        <AuthContext.Provider
            value={{
                user: user,
                isAuthenticated: isAuthenticated,
                handleLogin: handleLogin,
                handleLogout: handleLogout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined)
        throw new Error("AuthContext was used outside the AuthProvider");
    return context;
}

export { AuthProvider, useAuth };
