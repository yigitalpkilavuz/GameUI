"use client";

import React, {useEffect} from "react";
import {
    setLoading,
    setPlayer,
    setSelectedChip,
    updateBet,
    startGame,
    stopGame,
    setGameState,
    updateBalance
} from "lib/slices/blackjackSlice";

import {Seat} from "components/blackjack/seat/Seat";
import {ControlArea} from "components/blackjack/controlArea/ControlArea";
import {useAppDispatch, useAppSelector} from "lib/hooks";
import {ActionRequest, AuthRequest, BlackjackAction, DealRequest} from "../../../types/requests";
import {InfoPanel} from "../../../components/shared/infoPanel/InfoPanel";
import {LoadingScreen} from "../../../components/blackjack/loadingScreen/LoadingScreen";


const BlackjackGamePage: React.FC = () => {

        const dispatch = useAppDispatch();
        const {
            isLoading,
            player,
            selectedChip,
            bets,
            gameState,
            gameStarted,
            activeSeat
        } = useAppSelector((state) => state.blackjack);

        const totalSeats = 3

        const onLaunch = async () => {
            return await auth();
        };

        const auth = async () => {
            console.log("auth")
            const authRequest : AuthRequest = {FunMode: true};
            console.log(authRequest)
            try {
                const response = await fetch('/api/authenticate', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(authRequest),
                });
                console.log("RESPONSE")
                console.log(response);
                if (!response.ok) {
                    throw new Error('Failed auth');
                }

                return await response.json();
            } catch (error) {
                console.error('Failed auth', error);
                alert('Failed to start the game. Please try again.');
            }
        };

        const handleDeal = async () => {
            const userId = 1;
            const gameId = 1;

            const seats = Object.entries(bets).map(([position, bet]) => ({
                Position: parseInt(position),
                Bet: bet,
            }));

            const dealRequest : DealRequest = {UserId: userId, GameId: gameId, Seats: seats};

            try {
                const response = await fetch('/api/game/blackjack/deal', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(dealRequest),
                });

                if (!response.ok) {
                    throw new Error('Failed to deal cards');
                }

                const newGameState = await response.json();
                dispatch(startGame());
                dispatch(setGameState(newGameState));
            } catch (error) {
                console.error('Failed to deal cards:', error);
                alert('Failed to start the game. Please try again.');
            }
        };

        const handleHit = async () => {
            const actionRequest: ActionRequest = {
                UserId: 1,
                RoundId: gameState!.roundId,
                Position: activeSeat!,
                Action: BlackjackAction.Hit,
            };

            try {
                const response = await fetch('/api/game/blackjack/action', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(actionRequest),
                });

                if (!response.ok) {
                    throw new Error('Failed Action');
                }

                const newGameState = await response.json();
                console.log(newGameState)
                dispatch(startGame());
                dispatch(setGameState(newGameState));
            } catch (error) {
                console.error('Failed action', error);
                alert('Failed action. Please try again.');
            }
        };
        const handleStand = async () => {
            const actionRequest: ActionRequest = {
                UserId: 1,
                RoundId: gameState!.roundId,
                Position: activeSeat!,
                Action: BlackjackAction.Stand,
            };

            try {
                const response = await fetch('/api/game/blackjack/action', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(actionRequest),
                });

                if (!response.ok) {
                    throw new Error('Failed Action');
                }

                const newGameState = await response.json();
                console.log(newGameState)
                dispatch(startGame());
                dispatch(setGameState(newGameState));
            } catch (error) {
                console.error('Failed action', error);
                alert('Failed action. Please try again.');
            }
        };

        const handleSplit = async () => {
            const actionRequest: ActionRequest = {
                UserId: 1,
                RoundId: gameState!.roundId,
                Position: activeSeat!,
                Action: BlackjackAction.Split
            };

            try {
                const response = await fetch('/api/game/blackjack/action', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(actionRequest),
                });

                if (!response.ok) {
                    throw new Error('Failed Action');
                }

                const newGameState = await response.json();
                console.log(newGameState)
                dispatch(startGame());
                dispatch(setGameState(newGameState));
            } catch (error) {
                console.error('Failed action', error);
                alert('Failed action. Please try again.');
            }
        };

        const handleDoubleDown = () => {
            console.log("Double Down action");
        };

        const handlePlaceBet
            = (position: number, amount: number) => {
            if (selectedChip === null) return;
            dispatch(updateBet({position, amount}));
        };

        if (isLoading) {
            return <button onClick={onLaunch}> CLICK ME </button>
        }

        return (
            <div className="h-screen flex flex-col bg-green-500">
                <div id="dealer-area"
                     className="container mx-auto px-4 basis-3/12 flex justify-center items-center my-6">
                    <Seat
                        key={0}
                        hands={gameState?.roundState?.dealerHand ? [gameState.roundState.dealerHand] : []}
                        position={0}
                        betAmount={0}
                        isDealer={true}
                        onPlaceBet={handlePlaceBet}
                        selectedChip={null}
                        gameStarted={gameStarted}
                    />
                </div>

                <div id="text-area"
                     className="container mx-auto px-4 basis-3/12 flex items-center justify-center">
                    <p className="mt-4">Good luck and may the odds be in your favor!</p>
                </div>
                <div id="player-area" className="container mx-auto px-4 basis-3/12 flex items-center justify-around">
                    {[...Array(totalSeats)].map((_, index) => {
                        const positionHands = gameState?.roundState?.playerHands.filter(hand => hand.position === index + 1);
                        return (
                            <Seat
                                key={index + 1}
                                hands={positionHands ?? []}
                                position={index + 1}
                                betAmount={bets[index + 1] || 0}
                                isDealer={false}
                                onPlaceBet={handlePlaceBet}
                                selectedChip={selectedChip}
                                gameStarted={gameStarted}
                            />
                        );
                    })}
                </div>
                <div id="bottom-control-area"
                     className="container mx-auto px-4 basis-2/12 flex items-center justify-center">
                    <ControlArea
                        gameStarted={gameStarted}
                        onDeal={handleDeal}
                        onStand={handleStand}
                        onHit={handleHit}
                        onSplit={handleSplit}
                        onDoubleDown={handleDoubleDown}
                        setSelectedChip={(chip) => dispatch(setSelectedChip(typeof chip === 'function' ? chip(selectedChip) : chip))}
                    />
                </div>
                <InfoPanel
                    balance={player?.balance ?? 0}
                    totalBet={Object.values(bets).reduce((acc, value) => acc + value, 0)}
                />
            </div>
        );
    }
;

export default BlackjackGamePage;