import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <h1>Hello</h1>
    </BrowserRouter>
  );
}

export default App;