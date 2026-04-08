import React from "react";
import { GameState } from "../types";
import Refresh from "./icons/Refresh";
import HFlex from "./ui/HFlex";
import VFlex from "./ui/VFlex";

const BoardConfig = ({
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
      <div
        className="flex h-14 aspect-square bg-cta p-2 rounded-md"
        onClick={startNewGame}
      >
        <Refresh />
      </div>
    )}
  </HFlex>
);
export default BoardConfig;
