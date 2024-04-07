import React, { useState, useEffect } from 'react';
import AffichagePendu from './Components/AffichagePendu/AffichagePendu';
import AffichageMot from './Components/AffichageMot/AffichageMot';
import AffichageEssais from './Components/AffichageEssais/AffichageEssais';
import BoutonLettre from './Components/BoutonLettre/BoutonLettre';
import LettresDevinees from './Components/LettresDevinees/LettresDevinees'; 

function App() {
  const [mot, setMot] = useState("");
  const [lettresDevinees, setLettresDevinees] = useState([]);
  const [essais, setEssais] = useState(6);
  const [gameOver, setGameOver] = useState(false);

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
        setGameOver(false);
      });
  }

  function handleClicLettre(lettre) {
    if (!lettresDevinees.includes(lettre)) {
      setLettresDevinees([...lettresDevinees, lettre]);
  
    if (!mot.normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(lettre)) {
      setEssais(essais - 1);
    }
  }
}

  function handleRejouer() {
    demarrerNouveauJeu();
  }

  useEffect(() => {
    if (essais === 0) {
      setGameOver(true);
    } else if (mot.split('').filter(lettre => lettre !== '-').every(lettre => lettresDevinees.includes(lettre))) {
      setGameOver(true);
    }
  }, [essais, lettresDevinees, mot]);

  if (gameOver) {
    if (essais === 0) {
      return (
        <div>
          <p>Vous avez perdu ! Le mot était {mot}.</p>
          <AffichagePendu essais={0} />
          <button onClick={handleRejouer}>Rejouer</button>
        </div>
      );
    } else {
      return (
        <div>
          <p>Bravo ! Vous avez deviné le mot {mot}.</p>
          <AffichagePendu essais={essais} />
          <button onClick={handleRejouer}>Rejouer</button>
        </div>
      );
    }
  }

  return (
    <div>
      <h1>Jeu du pendu</h1>
      <AffichagePendu essais={essais} />
      <AffichageMot mot={mot} lettresDevinees={lettresDevinees} />
      <LettresDevinees lettresDevinees={lettresDevinees} />
      <AffichageEssais essais={essais} />
      <div>
        {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(lettre =>
          <BoutonLettre key={lettre} lettre={lettre} handleClicLettre={handleClicLettre} />
        )}
      </div>
    </div>
  );
}

export default App;
