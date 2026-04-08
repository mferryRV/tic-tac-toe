import React, { useState } from "react";
import GameContainer from "./GameContainer";
import { GameState } from "../types";
import GameConfig from "./GameConfig";
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
      </VFlex>
    </VFlex>
  );
};

export default MainScreen;
