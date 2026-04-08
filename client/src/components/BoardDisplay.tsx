import React from "react";
import { BoardState } from "../types";
import { O, Spruce } from "./icons";
import { HFlex, VFlex } from "./ui";

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
    <HFlex className="w-full items-center">
      <div className="w-full bg-cta p-3 rounded-md">
        <VFlex className={`bg-dark ${gapSize}`}>
          {boardState.map((row, yIndex) => (
            <HFlex className={gapSize}>
              {row.map((column, xIndex) => (
                <div
                  onClick={() => makeMove(yIndex, xIndex)}
                  className={`bg-cta p-1 flex-1 aspect-square cursor-pointer items-center justify-center text-2xl font-bold flex ${column == -1 && "text-white"}`}
                >
                  {column == 1 && <Spruce />}
                  {column == -1 && <O />}
                </div>
              ))}
            </HFlex>
          ))}
        </VFlex>
      </div>
    </HFlex>
  );
};

export default BoardDisplay;
