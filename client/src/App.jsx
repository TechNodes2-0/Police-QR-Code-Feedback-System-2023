import { Routes as Router, Route } from "react-router-dom";
import "./App.css";
import NotFound from "./pages/Error/NotFound";

function App() {
  return (
    <>
      <Router>
        <Route path="*" element={<NotFound />} />
      </Router>
    </>
  );
}

export default App;
