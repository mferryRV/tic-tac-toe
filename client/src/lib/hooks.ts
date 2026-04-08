import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { GameFilter, getGameResults, postGameResult } from "./api";

const queryKeys = {
  results: ["results"] as const,
  update: ["update"] as const,
};

export const useGameResults = (filter: GameFilter = {}) => {
  return useQuery({
    queryKey: queryKeys.results,
    queryFn: () => getGameResults(filter),
    refetchOnWindowFocus: true,
  });
};

export const usePostGameResult = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postGameResult,
    onSuccess: () => {
      // Invalidate stats and result list to refetch after latest result
      queryClient.invalidateQueries({
        queryKey: queryKeys.results,
      });
    },
  });
};
