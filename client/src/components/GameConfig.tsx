import React from "react";
import { GameState } from "../types";
import { Refresh } from "./icons";
import { HFlex, VFlex } from "./ui";

const GameConfig = ({
  boardSize,
  setBoardSize,
  gameState,
  startNewGame,
}: {
  boardSize: number;
  setBoardSize: (val: number) => void;
  gameState: GameState;
  startNewGame: () => void;
}) => (
  <HFlex className="gap-4 w-full">
    <VFlex className="gap-1 w-20">
      <p className="w-full text-center">Board</p>
      <p className="text-xl self-auto text-center">
        {boardSize} x {boardSize}
      </p>
    </VFlex>
    <input
      className="flex grow accent-cta"
      type="range"
      min={3}
      max={15}
      step={1}
      value={boardSize}
      onChange={({ target: { value } }) => setBoardSize(parseInt(value))}
      disabled={gameState == "playing"}
    />
    {["X", "O", "catscan"].includes(gameState) && (
      <HFlex
        className="h-14 aspect-square bg-cta p-2 rounded-md"
        onClick={startNewGame}
      >
        <Refresh />
      </HFlex>
    )}
  </HFlex>
);
export default GameConfig;
