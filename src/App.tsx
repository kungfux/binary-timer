import { Routes, Route, useLocation } from "react-router-dom";

import TimerSetup from "./pages/TimerSetup";
import TimerCountdown from "./pages/TimerCountdown";
import Footer from "./components/Footer";

function App() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const startParam = queryParams.get("start");

  return (
    <div className="flex flex-col items-center justify-between min-h-screen h-screen min-w-96">
      <div />
      <Routes>
        <Route path="/" element={startParam ? <TimerCountdown /> : <TimerSetup />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
