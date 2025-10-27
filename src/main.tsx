import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import EPassPixel from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SetTimer from "./components/SetTimer.tsx";
import { TimerProvider } from "./context/TimerProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <TimerProvider>
        <Routes>
          <Route path="/" element={<EPassPixel />} />
          <Route path="/set-timer" element={<SetTimer />} />
        </Routes>
      </TimerProvider>
    </BrowserRouter>
  </StrictMode>
);
