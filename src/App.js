import './App.css';
import React, { useState, useEffect } from 'react';
import hangman0 from './images/Hangman-0.png';
import hangman1 from './images/Hangman-1.png';
import hangman2 from './images/Hangman-2.png';
import hangman3 from './images/Hangman-3.png';
import hangman4 from './images/Hangman-4.png';
import hangman5 from './images/Hangman-5.png';
import hangman6 from './images/Hangman-6.png';

function App() {
  const imagesPendu = [
    hangman0,
    hangman1,
    hangman2,
    hangman3,
    hangman4,
    hangman5,
    hangman6,
  ];
  const [mot, setMot] = useState("");
  const [lettresDevinees, setLettresDevinees] = useState([]);
  const [essais, setEssais] = useState(6);

  useEffect(() => {
    demarrerNouveauJeu();
  }, []);

  function demarrerNouveauJeu() {
    fetch('https://node-hangman-api-production.up.railway.app/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        locale: 'fr-FR'
      })
    })
      .then(response => response.json())
      .then(data => {
        const word = data.word.toUpperCase();
        setMot(word);
        setLettresDevinees([word[0]]);
        setEssais(6);
      });
  }

  function handleClicLettre(lettre) {
    if (!lettresDevinees.includes(lettre)) {
      setLettresDevinees([...lettresDevinees, lettre]);
  
      if (!mot.includes(lettre)) {
        setEssais(essais - 1);
      }
    }
  } 

  if (essais === 0) {
    return (
      <div>
        <p>Vous avez perdu ! Le mot était {mot}.</p>
        <img src={imagesPendu[6]} alt="Pendu" />
        <button onClick={demarrerNouveauJeu}>Rejouer</button>
      </div>
    );
  }

  if (mot.split('').filter(lettre => lettre !== '-').every(lettre => lettresDevinees.includes(lettre))) {
    return (
      <div>
        <p>Bravo ! Vous avez deviné le mot {mot}.</p>
        <img src={imagesPendu[6 - essais]} alt="Pendu" />
        <button onClick={demarrerNouveauJeu}>Rejouer</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Jeu du pendu</h1>
      <img src={imagesPendu[6 - essais]} alt="Pendu" />
      <p>Mot à deviner: {mot.split('').map(lettre => lettresDevinees.includes(lettre) || lettre === '-' ? lettre : '_').join(' ')}</p>        
      <p>Lettres déjà devinées: {lettresDevinees.join(', ')}</p>
      <p>Essais restants: {essais}</p>
      <p>Cliquez sur une lettre pour la deviner:</p>
      {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(lettre =>
        <button key={lettre} onClick={() => handleClicLettre(lettre)}>
          {lettre}
        </button>
      )}
    </div>
  );
}

export default App;