import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import FeedPage from "./pages/FeedPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/profile" element={<FeedPage />} />
      </Routes>
    </Router>
  );
}

export default App;
