import { Routes, Route } from "react-router-dom";
import TimerSetup from "./pages/SetupTimer";
import TimerCountdown from "./pages/TimerCountdown";

function App() {
  return (
    <>
      <div style={{ marginBottom: "4rem" }}>
        <Routes>
          <Route path="/" element={<TimerSetup />} />
          <Route path="/timer" element={<TimerCountdown />} />
        </Routes>
        <div className="footer">
          <p>Binary Timer ❤️ kungfux &copy; {new Date().getFullYear()}</p>
        </div>
      </div>
    </>
  );
}

export default App;
