import { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state - load from localStorage or use empty cart
const getInitialState = () => {
    try {
        const savedCart = localStorage.getItem('avenge-cart');
        if (savedCart) {
            return JSON.parse(savedCart);
        }
    } catch (error) {
        console.error('Error loading cart from localStorage:', error);
    }
    return {
        items: [],
        totalItems: 0,
        totalPrice: 0
    };
};

// Action types
const ACTIONS = {
    ADD_TO_CART: 'ADD_TO_CART',
    REMOVE_FROM_CART: 'REMOVE_FROM_CART',
    UPDATE_QUANTITY: 'UPDATE_QUANTITY',
    CLEAR_CART: 'CLEAR_CART'
};

// Calculate totals helper
const calculateTotals = (items) => {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    return { totalItems, totalPrice };
};

// Reducer function
const cartReducer = (state, action) => {
    let newItems;

    switch (action.type) {
        case ACTIONS.ADD_TO_CART: {
            const existingIndex = state.items.findIndex(item => item.id === action.payload.id);

            if (existingIndex >= 0) {
                // Item exists, increase quantity
                newItems = state.items.map((item, index) =>
                    index === existingIndex
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // New item
                newItems = [...state.items, { ...action.payload, quantity: 1 }];
            }

            return {
                ...state,
                items: newItems,
                ...calculateTotals(newItems)
            };
        }

        case ACTIONS.REMOVE_FROM_CART: {
            newItems = state.items.filter(item => item.id !== action.payload);
            return {
                ...state,
                items: newItems,
                ...calculateTotals(newItems)
            };
        }

        case ACTIONS.UPDATE_QUANTITY: {
            if (action.payload.quantity <= 0) {
                newItems = state.items.filter(item => item.id !== action.payload.id);
            } else {
                newItems = state.items.map(item =>
                    item.id === action.payload.id
                        ? { ...item, quantity: action.payload.quantity }
                        : item
                );
            }
            return {
                ...state,
                items: newItems,
                ...calculateTotals(newItems)
            };
        }

        case ACTIONS.CLEAR_CART: {
            return {
                items: [],
                totalItems: 0,
                totalPrice: 0
            };
        }

        default:
            return state;
    }
};

// Create context
const CartContext = createContext(null);

// Provider component
export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, null, getInitialState);

    // Persist to localStorage whenever state changes
    useEffect(() => {
        try {
            localStorage.setItem('avenge-cart', JSON.stringify(state));
        } catch (error) {
            console.error('Error saving cart to localStorage:', error);
        }
    }, [state]);

    // Action creators
    const addToCart = (product) => {
        dispatch({ type: ACTIONS.ADD_TO_CART, payload: product });
    };

    const removeFromCart = (productId) => {
        dispatch({ type: ACTIONS.REMOVE_FROM_CART, payload: productId });
    };

    const updateQuantity = (productId, quantity) => {
        dispatch({ type: ACTIONS.UPDATE_QUANTITY, payload: { id: productId, quantity } });
    };

    const clearCart = () => {
        dispatch({ type: ACTIONS.CLEAR_CART });
    };

    const value = {
        cart: state,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook for using cart context
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export default CartContext;
