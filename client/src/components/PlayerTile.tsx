import React from "react";
import { XorO } from "../types";
import Spruce from "./icons/Spruce";
import O from "./icons/O";

const PlayerTile = ({
  player,
  isTurn,
  isWinner,
}: {
  player: XorO;
  isTurn: boolean;
  isWinner: boolean;
}) => {
  const highlight = isTurn || isWinner ? " bg-cta" : " bg-gray";
  const winner = isWinner ? " grow-[8] justify-between" : " grow";

  return (
    <div
      className={
        "flex flex-row h-12 p-2 rounded-md gap-2 transition-[all] duration-300 ease-in-out" +
        highlight +
        winner
      }
    >
      {player == 1 ? <Spruce /> : <O />}
      {isWinner && (
        <p
          className={`self-center font-bold font-xl w-full ${player == 1 ? "text-white" : ""}`}
        >
          Winner!
        </p>
      )}
    </div>
  );
};

export default PlayerTile;
