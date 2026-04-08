import React, { useState } from "react";
import { GameState } from "../lib/game";
import { useGameResults, usePostGameResult } from "../lib/hooks";
import GameConfig from "./GameConfig";
import GameContainer from "./GameContainer";
import GameHistory from "./GameHistory";
import { Header, VFlex } from "./ui";

const content = { title: "Tic Tac Toe" };

export const MainScreen = () => {
  const [gameId, setGameId] = useState<string>(crypto.randomUUID());
  const [gameState, setGameState] = useState<GameState>("ready");
  const [boardSize, setBoardSize] = useState<number>(3);

  const startNewGame = () => {
    setGameId(crypto.randomUUID());
    setGameState("ready");
  };

  const {
    data: gameResults,
    isLoading: isGameResultsLoading,
    isError: hasGameResultsError,
    refetch: refetchGameResults,
  } = useGameResults();

  return (
    <VFlex className="items-center gap-6">
      <Header title={content.title} />
      <VFlex className="items-center gap-6 w-full max-w-md px-6">
        <GameContainer
          key={gameId}
          boardSize={boardSize}
          gameState={gameState}
          setGameState={setGameState}
          startNewGame={startNewGame}
        />
        <GameConfig
          boardSize={boardSize}
          setBoardSize={setBoardSize}
          gameState={gameState}
          startNewGame={startNewGame}
        />
        <GameHistory
          isLoading={isGameResultsLoading}
          hasError={hasGameResultsError}
          games={gameResults?.results}
          stats={gameResults?.stats}
        />
      </VFlex>
    </VFlex>
  );
};

export default MainScreen;
