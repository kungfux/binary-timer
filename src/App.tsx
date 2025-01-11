import { Routes, Route } from "react-router-dom";

import TimerSetup from "./pages/TimerSetup";
import TimerCountdown from "./pages/TimerCountdown";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen h-screen min-w-96">
      <div />
      <Routes>
        <Route path="/" element={<TimerSetup />} />
        <Route path="/timer" element={<TimerCountdown />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
