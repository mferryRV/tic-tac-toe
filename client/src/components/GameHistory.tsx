import React, { useState } from "react";
import { GameResult, GameStats } from "../lib/api";
import { HFlex, VFlex } from "./ui";
import { CaretDown, CaretUp, O, Refresh, Spruce, Warning } from "./icons";
import { displayTime } from "../lib/utils";

const GameHistoryItem = ({
  result: { id, result, boardSize, completedAt },
}: {
  result: GameResult;
}) => (
  <HFlex key={id} className="h-12 w-full justify-between p-2 border-t-2">
    {result == "X" ? (
      <Spruce className="w-12" />
    ) : result == "O" ? (
      <O className="w-12" />
    ) : (
      <p className="font-bold self-center w-12">Catscan</p>
    )}
    <p className="self-center">
      {boardSize}x{boardSize}
    </p>
    <p className="self-center">({displayTime(completedAt)})</p>
  </HFlex>
);

const GameHistory = ({
  games,
  stats,
  isLoading,
  hasError,
}: {
  games?: GameResult[];
  stats?: GameStats;
  isLoading: boolean;
  hasError: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <VFlex
      onClick={() => setIsOpen(!isOpen)}
      className="p-2 w-full bg-cta rounded-md gap-2 transition-[all] duration-300 ease-in-out"
    >
      <HFlex className="justify-between p-2">
        <p className="font-bold self-center">History</p>
        {isOpen ? <CaretUp className="h-8" /> : <CaretDown className="h-8" />}
      </HFlex>
      {isOpen && (
        <VFlex className="p-2 w-full rounded-md">
          {isLoading && (
            <HFlex className="justify-center p-4">
              <div className="h-8 w-8 animate-spin">
                <Refresh />
              </div>
            </HFlex>
          )}
          {hasError && (
            <VFlex className="items-center gap-2 p-4">
              <Warning className="h-8 w-8" />
              <p className="font-bold">Unable to get history</p>
            </VFlex>
          )}
          {!isLoading && !hasError && stats && (
            <HFlex className="justify-between pb-2">
              {["X", "O"].map((player) => (
                <HFlex key={player} className="h-12 gap-2">
                  {player == "X" ? <Spruce /> : <O />}
                  <p>
                    {stats?.[player]} win{stats?.[player] !== 1 && "s"} (
                    {(stats &&
                      Math.round((100 * stats?.[player]) / stats?.total)) ||
                      0}
                    %)
                  </p>
                </HFlex>
              ))}
            </HFlex>
          )}
          {!hasError &&
            games &&
            games.map((result) => (
              <GameHistoryItem key={result.id} result={result} />
            ))}
        </VFlex>
      )}
    </VFlex>
  );
};

export default GameHistory;
