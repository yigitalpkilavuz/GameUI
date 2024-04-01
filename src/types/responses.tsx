export interface IBlackjackResponse {
    roundId: number;
    roundState: IRoundState;
}

export interface IRoundState {
    isActive: boolean;
    dealerHand: IHand;
    playerHands: IHand[];
}

export interface IHand {
    position: number;
    cards: ICard[];
    bet: number;
    payout: number;
    outcome: HandOutcome;
    isSplit:boolean;
    isBlackjack: boolean;
    isBust: boolean;
    canTakeAction: boolean;
    totalPoints: number;
}

export interface ICard {
    points: number;
    cardExpression: string;
}

export enum HandOutcome {
    Active,
    Won,
    Lost,
    Push
}


export interface IPlayerResponse {
    username: string;
    balance: number;
}


