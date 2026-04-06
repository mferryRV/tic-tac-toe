import React from "react";
import { BoardState } from "../types";
import Spruce from "./images/Spruce";
import O from "./images/O";

const BoardDisplay = ({
  boardState,
  makeMove,
}: {
  boardState: BoardState;
  makeMove: (yIndex: number, xIndex: number) => void;
}) => {
  const gapSize =
    boardState.length > 10
      ? "gap-0.5"
      : boardState.length > 6
        ? "gap-1"
        : "gap-1.5";

  return (
    <div className="w-full flex-row items-center px-6 max-w-md">
      <div className="bg-cta p-3 rounded-md">
        <div className={`bg-bg-green flex flex-col ${gapSize}`}>
          {boardState.map((row, yIndex) => (
            <div className={`flex ${gapSize}`}>
              {row.map((column, xIndex) => (
                <div
                  onClick={() => makeMove(yIndex, xIndex)}
                  className={`bg-cta p-1 flex-1 aspect-square cursor-pointer items-center justify-center text-2xl font-bold flex ${column == -1 && "text-white"}`}
                >
                  {/* TODO: Replace with SVGs & style to match height */}
                  {column == 1 && <Spruce />}
                  {column == -1 && <O />}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BoardDisplay;
