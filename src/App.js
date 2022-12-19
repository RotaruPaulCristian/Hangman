import React, { useState, useEffect } from "react";
import "./index.css";
import Header from "./components/Header";
import Figure from "./components/Figure";
import WrongLetters from "./components/WrongLetters";
import Word from "./components/Word";
import PopUp from "./components/PopUp";
import Notification from "./components/Notification";
import { showNotification as show } from "./helpers/helpers";

const words = [
  "electroglotospectrografie",
  "neologism",
  "spectru",
  "radiografie",
  "neindemanatic",
  "jargon",
  "sintaxa",
  "sintagma",
  "incapabil",
  "necooperant",
  "falanga",
  "metacarp",
  "ciclic",
  "fotosinteza",
  "clorofila",
  "neinfricat",
  "licarire",
  "trapezoid",
  "pisiform",
  "aureola",
  "bolerou",
  "nostalgie",
  "elocvent",
  "regenerator",
  "crizantema",
  "ombrogen",
  "hemocrom",
  "romanizare",
  "dermatovenerologie",
  "anticonceptionale",
  "memorandum",
  "pozomoc",
  "pneumatic",
  "homodiegetic",
  "carburator",
];
let selectedWord = words[Math.floor(Math.random() * words.length)];

const App = () => {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const handleKeydown = (event) => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();

        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters((correctLetters) => [...correctLetters, letter]);
          } else {
            show(setShowNotification);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters((wrongLetters) => [...wrongLetters, letter]);
          } else {
            show(setShowNotification);
          }
        }
      }
    };
    window.addEventListener("keydown", handleKeydown);

    return () => window.removeEventListener("keydown", handleKeydown);
  }, [correctLetters, wrongLetters, playable]);

  const playAgain = () => {
    setPlayable(true);

    // empty arrays
    setCorrectLetters([]);
    setWrongLetters([]);

    const random = Math.floor(Math.random() * words.length);
    selectedWord = words[random];
  };

  return (
    <>
      <Header />
      <div className="game-container">
        <Figure wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      </div>
      <PopUp
        correctLetters={correctLetters}
        wrongLetters={wrongLetters}
        selectedWord={selectedWord}
        setPlayable={setPlayable}
        playAgain={playAgain}
      />
      <Notification showNotification={showNotification} />
    </>
  );
};

export default App;
