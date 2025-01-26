import { Routes, Route, useLocation } from "react-router-dom";

import routes from "./routes";
import TimerSetup from "./pages/TimerSetup.page";
import TimerCountdown from "./pages/TimerCountdown.page";
import Footer from "./components/Footer.component";
import { MuteButton } from "./components/MuteButton.component";
import { MuteProvider } from "./contexts/Mute.context";

function App() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const timeParam = queryParams.get("time");

  return (
    <MuteProvider>
      <div className="flex flex-col items-center justify-between min-h-screen h-screen min-w-96">
        <div className="flex justify-end w-full p-4">
          <MuteButton />
        </div>
        <Routes>
          <Route
            path={routes.root.path}
            element={timeParam ? <TimerCountdown /> : <TimerSetup />}
          />
        </Routes>
        <Footer />
      </div>
    </MuteProvider>
  );
}

export default App;
