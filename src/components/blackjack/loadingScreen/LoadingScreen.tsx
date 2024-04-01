"use client";

import React, {useEffect} from 'react';

interface LoadingScreenProps {
    onLaunch: () => Promise<void>;
}
const LoadingScreenComponent: React.FC<LoadingScreenProps> = ({ onLaunch }) => {

    useEffect(() => {
        onLaunch();
    }, [onLaunch]);
    const getLoadingMessage = (): string => {
        return "Loading your game...";
    };

    return (
        <div className="fixed inset-0 bg-gray-800 flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-300"></div>
            <div className="mt-8 text-white text-lg">
                {getLoadingMessage()}
            </div>
        </div>
    );
};

export const LoadingScreen = React.memo(LoadingScreenComponent);
