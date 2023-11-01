import { Routes as Router, Route } from "react-router-dom";
import "./App.css";
import NotFound from "./pages/Error/NotFound";
import Home from "./pages/Home/Home";

function App() {
  return (
    <>
      <Router>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Router>
    </>
  );
}

export default App;
