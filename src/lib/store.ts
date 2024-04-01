import { configureStore } from '@reduxjs/toolkit'
import blackjackReducer from './slices/blackjackSlice';

export const makeStore = () => {
    return configureStore({
        reducer: {
            blackjack: blackjackReducer,
        }
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

