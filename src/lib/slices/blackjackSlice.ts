import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IBlackjackResponse, IPlayerResponse} from '../../types/responses';

interface BlackjackState {
    isLoading: boolean,
    player: IPlayerResponse | null;
    selectedChip: number | null;
    bets: { [key: number]: number };
    gameState: IBlackjackResponse | null;
    gameStarted: boolean;
    activeSeat: number | null;
}

const initialState: BlackjackState = {
    isLoading : true,
    player: null,
    selectedChip: null,
    bets: {},
    gameState: null,
    gameStarted: false,
    activeSeat: null
};

export const blackjackSlice = createSlice({
    name: 'blackjack',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setPlayer: (state, action: PayloadAction<IPlayerResponse | null>) => {
            state.player = action.payload;
        },
        setSelectedChip: (state, action: PayloadAction<number | null>) => {
            state.selectedChip = action.payload;
        },
        updateBet: (state, action) => {
            const {position, amount} = action.payload;
            const currentBet = state.bets[position] || 0;
            state.bets = {...state.bets, [position]: currentBet + amount};
        },
        startGame: (state) => {
            state.gameStarted = true;
        },
        stopGame: (state) => {
            state.gameState = null;
            state.gameStarted = false;
            state.bets = {};
        },
        setGameState: (state, action: PayloadAction<IBlackjackResponse | null>) => {
            if (action.payload !== null) {
                state.gameState = action.payload;
                state.activeSeat = action.payload.roundState.playerHands.find(hand => hand.canTakeAction)?.position ?? null;
                state.gameStarted = action.payload.roundState.isActive;
            }
        },
        updateBalance: (state, action: PayloadAction<number>) => {
            if (state.player)
                state.player.balance = action.payload;
        },
    },
});

export const {
    setLoading,
    setPlayer,
    setSelectedChip,
    updateBet,
    startGame,
    stopGame,
    setGameState,
    updateBalance
} = blackjackSlice.actions;

export default blackjackSlice.reducer;
