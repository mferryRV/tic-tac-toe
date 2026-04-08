import React, { useState } from "react";
import { GameResult, GameStats } from "../lib/api";
import { HFlex, VFlex } from "./ui";
import { CaretDown, CaretUp, O, Spruce } from "./icons";

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
      <p className="font-bold self-center">Catscan</p>
    )}
    <p className="self-center">
      {boardSize}x{boardSize} board ({completedAt.substring(0, 10)})
    </p>
  </HFlex>
);

const GameHistory = ({
  games,
  stats,
  isLoading,
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
          {stats && (
            <HFlex className="justify-between pb-2">
              {["X", "O"].map((player) => (
                <HFlex key={player} className="h-12 gap-2">
                  {player == "X" ? <Spruce /> : <O />}
                  <p>
                    {stats?.[player]} win{stats?.[player] > 1 && "s"} (
                    {stats &&
                      Math.round((100 * stats?.[player]) / stats?.total)}
                    %)
                  </p>
                </HFlex>
              ))}
            </HFlex>
          )}
          {games &&
            games.map((result) => (
              <GameHistoryItem key={result.id} result={result} />
            ))}
        </VFlex>
      )}
    </VFlex>
  );
};

export default GameHistory;
