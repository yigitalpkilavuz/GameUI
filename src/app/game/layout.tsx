import React from 'react';
import Link from 'next/link';

const GameLayout: React.FC<{ children: React.ReactNode }> = ({children}) => {
    return (
        <div className="flex flex-col h-screen">
            <div className="flex justify-between items-center p-4 bg-green-700 text-white">
                <div>Game Logo</div>
                <div>
                    <Link href="/" className="text-white hover:underline">
                        Home
                    </Link>
                </div>
            </div>
            {children}
        </div>
    );
};

export default GameLayout;
