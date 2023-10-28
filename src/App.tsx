import Page from "../src/scenes/page";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Page />} />
      </Routes>
    </BrowserRouter>
  );
}
