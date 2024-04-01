"use client"
import React from 'react';

interface InfoPanelProps {
    balance: number;
    totalBet: number;
}

const InfoPanelComponent: React.FC<InfoPanelProps> = ({
                                                          balance,
                                                          totalBet
                                                      }) => {
    return (
        <div className="info-panel bg-green-800 text-white p-4 flex justify-between items-center">
            <div className="flex flex-col">
                <p>Total Bet: ${totalBet}</p>
                <p>Balance: ${balance}</p>
            </div>
            <div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Settings
                </button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4">
                    History
                </button>
            </div>
        </div>
    );
};

export const InfoPanel = React.memo(InfoPanelComponent);
