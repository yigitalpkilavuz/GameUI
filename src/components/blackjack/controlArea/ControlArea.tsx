"use client";

import React from "react";
import { Chip } from "../chip/Chip"; // Make sure to adjust the import path as needed

interface ControlAreaProps {
    gameStarted: boolean;
    onDeal: () => void;
    onStand: () => void;
    onHit: () => void;
    onSplit: () => void;
    onDoubleDown: () => void;
    setSelectedChip: React.Dispatch<React.SetStateAction<number | null>>;
}

const ControlAreaComponent: React.FC<ControlAreaProps> = ({
                                                                 onDeal,
                                                                 onStand,
                                                                 onHit,
                                                                 onSplit,
                                                                 onDoubleDown,
                                                                 setSelectedChip,
                                                                 gameStarted,
                                                             }) => {
    const chipValues = [5, 10, 25, 50, 100];

    const handleChipClick = (value: number) => {
        setSelectedChip(value);
    };

    return (
        <div className="fixed left-0 w-full bg-green-500 text-white p-4 flex flex-col items-center space-y-4">
            <div className="flex space-x-4">
                {chipValues.map((value, index) => (
                    <div key={index} onClick={() => handleChipClick(value)}>
                        <Chip value={value} />
                    </div>
                ))}
            </div>
            {!gameStarted ? (
                <button onClick={onDeal} className="btn btn-primary mt-4">Deal</button>
            ) : (
                <div className="flex space-x-4 mt-4">
                    <button onClick={onHit} className="btn btn-success">Hit</button>
                    <button onClick={onStand} className="btn btn-success">Stand</button>
                    <button onClick={onSplit} className="btn btn-warning">Split</button>
                    <button onClick={onDoubleDown} className="btn btn-danger">Double Down</button>
                </div>
            )}
        </div>
    );
};
export const ControlArea = React.memo(ControlAreaComponent);
