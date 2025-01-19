import { Routes, Route, useLocation } from "react-router-dom";

import TimerSetup from "./pages/TimerSetup";
import TimerCountdown from "./pages/TimerCountdown";
import Footer from "./components/Footer";

function App() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const timeParam = queryParams.get("time");
  const isMinimalistMode = queryParams.get("mode") === "minimalist";

  return (
    <div className="flex flex-col items-center justify-between min-h-screen h-screen min-w-96">
      <div />
      <Routes>
        <Route
          path="/"
          element={timeParam ? <TimerCountdown /> : <TimerSetup />}
        />
      </Routes>
      {isMinimalistMode ? <div /> : <Footer />}
    </div>
  );
}

export default App;
