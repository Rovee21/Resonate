import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./pages/FeedPage";
import WelcomePage from "./pages/WelcomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
