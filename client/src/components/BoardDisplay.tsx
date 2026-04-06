import React from "react";
import { BoardState, displayXorO } from "../types";

const BoardDisplay = ({
  boardState,
  makeMove,
}: {
  boardState: BoardState;
  makeMove: (yIndex: number, xIndex: number) => void;
}) => (
  <div className="flex flex-col gap-1 bg-cta">
    {boardState.map((row, yIndex) => (
      <div className="flex gap-1">
        {row.map((column, xIndex) => (
          <div
            onClick={() => makeMove(yIndex, xIndex)}
            className="border-2 border-gray-900 w-10 h-10 cursor-pointer items-center justify-center text-2xl font-bold flex"
          >
            {column == 0 ? "" : displayXorO(column)}
          </div>
        ))}
      </div>
    ))}
  </div>
);

export default BoardDisplay;
