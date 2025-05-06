import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import New from "./pages/New";
import NotePage from "./pages/NotePage";
import Browse from "./pages/Browse";
import About from "./pages/About";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/new" element={<New />} />
      <Route path="/note/:noteId" element={<NotePage />}></Route>
      <Route path="/search" element={<Browse />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}