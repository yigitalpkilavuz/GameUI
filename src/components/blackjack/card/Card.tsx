import React from 'react';
import { ICard } from '../../../types/responses';

interface CardProps {
    card: ICard;
}

const cardSuitSymbols = {
    H: '♥',
    D: '♦',
    C: '♣',
    S: '♠',
};

const cardSuitColors = {
    H: 'text-red-500',
    D: 'text-red-500',
    C: 'text-black',
    S: 'text-black',
};

const CardComponent: React.FC<CardProps> = ({ card }) => {
    // Handle "Hidden" card expressions directly from the backend
    if (card.cardExpression === "Hidden") {
        return (
            <div className="flex flex-col items-center justify-center w-16 h-24 m-1 rounded-lg shadow-lg bg-gray-500">
                <div className="flex items-center justify-center w-full h-full text-xl font-bold">?</div>
            </div>
        );
    }

    // Proceed as normal for visible cards
    const rank = card.cardExpression.slice(0, -1);
    const suit = card.cardExpression.slice(-1);
    const suitSymbol = cardSuitSymbols[suit as keyof typeof cardSuitSymbols];
    const suitColor = cardSuitColors[suit as keyof typeof cardSuitColors];

    return (
        <div className={`flex flex-col items-center justify-center w-16 h-24 m-1 rounded-lg shadow-lg bg-white ${suitColor}`}>
            <div className="text-lg font-bold">{rank}</div>
            <div className="text-2xl">{suitSymbol}</div>
        </div>
    );
};

export const Card = React.memo(CardComponent);
