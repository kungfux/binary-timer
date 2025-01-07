import { Routes, Route } from "react-router-dom";
import TimerSetup from "./pages/SetupTimer";
import TimerCountdown from "./pages/TimerCountdown";
import "./App.css";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<TimerSetup />} />
        <Route path="/timer" element={<TimerCountdown />} />
      </Routes>
      <div
        style={{
          position: "fixed",
          bottom: "0",
          left: "0",
          width: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          color: "white",
          padding: "1rem",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          gap: "1rem",
        }}
      >
        <p>&copy; {new Date().getFullYear()} Binary Timer</p>|
        <p>Created with ❤️ by kungfux010</p>
      </div>
    </div>
  );
}

export default App;
