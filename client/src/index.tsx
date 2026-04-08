import React from "react";
import { createRoot } from "react-dom/client";
import "./assets/index";
import MainScreen from "./components/MainScreen";

const root = createRoot(document.getElementById("root")!);
root.render(<MainScreen />);
