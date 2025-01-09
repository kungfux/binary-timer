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
        <div
          style={{
            position: "fixed",
            bottom: "0",
            left: "0",
            width: "100vw",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "white",
            padding: ".5rem",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            zIndex: -1,
          }}
        >
          <p>Binary Timer ❤️ kungfux &copy; {new Date().getFullYear()}</p>
        </div>
      </div>
    </>
  );
}

export default App;
