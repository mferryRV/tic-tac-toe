import React from "react";
import { createRoot } from "react-dom/client";
import "./assets/index";
import MainScreen from "./components/MainScreen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const root = createRoot(document.getElementById("root")!);
root.render(
  <QueryClientProvider client={queryClient}>
    <MainScreen />
  </QueryClientProvider>,
);
