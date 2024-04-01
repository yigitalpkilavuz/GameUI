"use client";

import React from 'react';
import { Card } from 'components/blackjack/card/Card';
import { IHand, HandOutcome } from 'types/responses';
import { BetArea } from "../betArea/BetArea";

interface SeatProps {
    hands: IHand[];
    position: number;
    betAmount: number;
    isDealer?: boolean;
    onPlaceBet: (position: number, amount: number) => void;
    selectedChip: number | null;
    gameStarted: boolean;
}

const SeatComponent: React.FC<SeatProps> = ({
                                                hands,
                                                position,
                                                betAmount,
                                                isDealer,
                                                onPlaceBet,
                                                selectedChip,
                                                gameStarted,
                                            }) => {
    const handleSeatClick = () => {
        if (!isDealer && selectedChip && !gameStarted) {
            onPlaceBet(position, selectedChip);
        }
    };

    const renderHand = (hand: IHand, index: number) => {
        return (
            <div key={index} className={`hand ${index > 0 ? 'mt-4' : ''}`}>
                <div className="flex flex-wrap justify-center items-center">
                    {hand.cards.map((card, idx) => (
                        <Card key={`${card.cardExpression}-${idx}`} card={card} />
                    ))}
                </div>
                <div className="text-sm text-white mt-2">Total: {hand.totalPoints}</div>
                <div className="text-sm text-white">{getStatusMessage(hand)}</div>
            </div>
        );
    };

    const getStatusMessage = (hand: IHand) => {
        if (hand.isBlackjack) return 'Blackjack!';
        if (hand.isBust) return 'Bust!';
        switch (hand.outcome) {
            case HandOutcome.Won: return 'Won';
            case HandOutcome.Lost: return 'Lost';
            case HandOutcome.Push: return 'Push';
            default: return '';
        }
    };

    return (
        <div className={`seat flex flex-col items-center p-4 bg-gray-700 rounded-lg shadow-lg ${isDealer ? 'mt-4' : ''} min-w-[180px] min-h-[100px]`} onClick={handleSeatClick}>
            {hands.length > 0 ? hands.map(renderHand) : (
                <div className="w-16 h-24 border-2 border-dashed border-gray-400 rounded my-2"></div>
            )}
            {!isDealer && <BetArea betAmount={betAmount} />}
        </div>
    );
};

export const Seat = React.memo(SeatComponent);
