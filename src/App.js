import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Comics from "./Comics";
import Characters from "./Characters";
import Id from "./Id";
import Favoris from "./Favoris";
import Header from "./Header";

function App() {
  //a chaque fois que je rafraichis ca remet à  avec
  //quand j'actualise
  //je stocke dans une nouvelle variable
  //les données sauvegardées
  const initialtab = localStorage.getItem("favorite")
    ? JSON.parse(localStorage.getItem("favorite"))
    : [];
  //si ds localstorage y'a rien, -> dans initialvalue=[]
  //  const saved = localStorage.getItem("prenom");
  //  const initialValue = JSON.parse(saved) || tab []; -> y'a qq chose ->json parse saved, mis ds une variable initialvalue

  // fichier excel que tu enregistres et que tu nommes prénom et dans lequel tu ajoutes des valeurs (ce fichier a été enregistré) -> tu ferme ce fichier excel,
  //excel et blocnote
  //getitem=ouvrir le fichier prenom.xls et copier les données dans le bloc note
  //quand tu fais save, ouvrir le fichier xls à nouveau et que tu fais parse, saveitem

  //a chaque reinition de la page, c'est ca qui se passe
  //(1)
  const [tab, setTab] = useState(initialtab); //(1) la ce tableau tu l'as stocké dans une variable, tu l'envoies en tant qu'argument tu l'envoi à la page favoris en argument, faut le mettre dans un local storage
  //tab=[]
  localStorage.setItem("favorite", JSON.stringify(tab)); //->quand tu fais un setitem, ca enregistre qq chose dans
  //localstorage, si tu lances ta page et que tu fais setitem(vide) ca efface ce que t'avais avant
  //à chaque page, tu réinitalises une page vide (comme excel) comme si tu prenais
  // passer valeur qui existe déjà à
  //localstorage=tab=[] qui est en string

  return (
    <Router>
      <Header />
      <Routes>
        {/* //definis fonction comics et execute interieur de element <Comics/> (fenetre en haut), à l'interieur il a une fonction Comics qu'il va executer  */}
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
