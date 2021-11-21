import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Comics from "./Comics";
import Characters from "./Characters";
import Id from "./Id";
import Favoris from "./Favoris";
import Header from "./Header";

function App() {
  const initialtab = localStorage.getItem("favorite")
    ? JSON.parse(localStorage.getItem("favorite"))
    : [];

  //(1)
  const [tab, setTab] = useState(initialtab);
  //tab=[]
  localStorage.setItem("favorite", JSON.stringify(tab));
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Characters tab={tab} setTab={setTab} />} />
        <Route path="/comics" element={<Comics tab={tab} setTab={setTab} />} />
        <Route path="/id/:id" element={<Id />} />
        <Route
          path="/favoris"
          element={<Favoris tab={tab} setTab={setTab} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
