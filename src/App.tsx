import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { AudioProvider } from "./contexts/AudioProvider"; // นำเข้า AudioProvider

const App = () => {
  return (
    <Router>
      <AudioProvider> {/* ห่อด้วย AudioProvider */}
        <AppRoutes />
      </AudioProvider>
    </Router>
  );
};

export default App;
