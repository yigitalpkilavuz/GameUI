import {AuthRequest} from 'types/requests';
import {IPlayerResponse} from 'types/responses';

const BASE_URL = process.env.GAME_API_URL;

export const auth = async (authRequest: AuthRequest): Promise<IPlayerResponse> => {
    try {
        const response = await fetch(`${BASE_URL}/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(authRequest),
        });
        console.log("RESPONSE TEST")
        console.log(response)
        if (!response.ok) {
            throw new Error('Failed auth');
        }

        return await response.json();
    } catch (error) {
        console.error('Error in auth:', error);
        throw error;
    }
};