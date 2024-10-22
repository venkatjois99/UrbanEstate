import { configureStore } from '@reduxjs/toolkit';

// Define the store
const myAppStore = configureStore({
    reducer: {
        user:,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: false
        })
});

export default myAppStore;