export interface DealRequest {
    UserId: number;
    GameId: number;
    Seats: BlackjackSeat[];
}

export interface BlackjackSeat {
    Position: number;
    Bet: number;
}

export interface ActionRequest {
    UserId: number;
    RoundId: number;
    Position: number;
    Action: BlackjackAction;
}

export enum BlackjackAction {
    RoundStart,
    Hit,
    Stand,
    Split,
    RoundEnd,
}

export interface AuthRequest {
    FunMode : boolean;
}