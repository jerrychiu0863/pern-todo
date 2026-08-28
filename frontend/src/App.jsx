import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import EditTodo from "./pages/EditTodo";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todo/:todo_id" element={<EditTodo />} />
      </Routes>
    </Router>
  );
}

export default App;
