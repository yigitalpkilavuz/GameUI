"use client";

import React from 'react';

interface ChipProps {
    value: number;
}

const ChipComponent: React.FC<ChipProps> = ({ value }) => {
    const getChipColor = (value: number): string => {
        switch (value) {
            case 5:
                return "bg-red-500";
            case 10:
                return "bg-blue-500";
            case 25:
                return "bg-black";
            case 50:
                return "bg-yellow-500";
            case 100:
                return "bg-purple-500";
            default:
                return "bg-gray-500";
        }
    };

    return (
        <div className={`chip ${getChipColor(value)} rounded-full w-12 h-12 flex items-center justify-center text-white`}>
            ${value}
        </div>
    );
};

export const Chip = React.memo(ChipComponent);
