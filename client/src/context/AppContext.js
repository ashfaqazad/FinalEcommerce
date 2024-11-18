// src/context/AppContext.js
import React, { createContext, useReducer, useContext } from 'react';

const AppContext = createContext();

const initialState = {
    basket: [],
    user: null,  // User will be null initially until login
};

const appReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_BASKET':
            return {
                ...state,
                basket: [...state.basket, action.payload],
            };
        case 'REMOVE_FROM_BASKET':
            return {
                ...state,
                basket: state.basket.filter(item => item.id !== action.payload),
            };
        case 'SET_USER':
            return {
                ...state,
                user: action.payload,
            };
        case 'LOGOUT':
            return {
                ...state,
                user: null,
                basket: [],
            };
        default:
            return state;
    }
};

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};

// Custom hook to use app context
export const useAppContext = () => {
    return useContext(AppContext);
};
