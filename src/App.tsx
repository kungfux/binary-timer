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
    </div>
  );
}

export default App;
