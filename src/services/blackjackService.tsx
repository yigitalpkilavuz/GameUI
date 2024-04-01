import {ActionRequest, DealRequest} from 'types/requests';
import { IBlackjackResponse } from 'types/responses';

const BASE_URL = process.env.GAME_API_URL;

export const deal = async (dealRequest: DealRequest): Promise<IBlackjackResponse> => {
    try {
        const response = await fetch(`${BASE_URL}/blackjack/deal`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dealRequest),
        });

        if (!response.ok) {
            throw new Error('Failed to deal cards');
        }

        return await response.json();
    } catch (error) {
        console.error('Error in dealCardsService:', error);
        throw error;
    }
};

export const action = async (actionRequest: ActionRequest): Promise<IBlackjackResponse> => {
    try {
        const response = await fetch(`${BASE_URL}/blackjack/action`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(actionRequest),
        });

        if (!response.ok) {
            throw new Error('Failed to perform action');
        }

        return await response.json();
    } catch (error) {
        console.error('Error in blackjackActionService:', error);
        throw error;
    }
};