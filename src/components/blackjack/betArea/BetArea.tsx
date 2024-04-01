"use client";

import React from 'react';
import { Chip } from "../chip/Chip";

interface BetAreaProps {
    betAmount: number;
}

const BetAreaComponent: React.FC<BetAreaProps> = ({ betAmount }) => {
    return (
        <div className="bet-area bg-opacity-20 bg-white rounded-full w-16 h-16 flex justify-center items-center mt-2 border border-dashed border-gray-400">
            {betAmount > 0 ? (
                <Chip value={betAmount} />
            ) : (
                <div className="text-xs text-center opacity-50">Bet</div>
            )}
        </div>
    );
};

export const BetArea = React.memo(BetAreaComponent);
