import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import About from "./Components/About/About";
import Navbar from "./Components/Navbar/Navbar";
import NoteState from "./context/notes/NoteState";
import Alert from "./Components/Navbar/Alert/Alert";


function App() {
  return (
    <>
    <NoteState>
      <Router>
        <Navbar />
        <Alert message="Hllo"/>
        <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
        </div>
      </Router>
      </NoteState>
    </>
  );
}

export default App;
