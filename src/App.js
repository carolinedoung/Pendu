import './App.css';
import React, { useState, useEffect } from 'react';


function App() {
  const [mot, setMot] = useState("");
  const [lettresDevinees, setLettresDevinees] = useState([]);
  const [essais, setEssais] = useState(6);

  useEffect(() => {
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
        console.log(data);
      const word = data.word.toUpperCase(); // Convertir le mot en majuscule
      setMot(word);
      setLettresDevinees([word[0]]);
      });
  }, []);

  function handleClicLettre(lettre) {
    if (!lettresDevinees.includes(lettre)) {
      setLettresDevinees([...lettresDevinees, lettre]);
  
      if (!mot.includes(lettre)) {
        setEssais(essais - 1);
      }
    }
  } 

  if (essais === 0) {
    return <p>Vous avez perdu ! Le mot était {mot}.</p>;
  }

  if (mot.split('').filter(lettre => lettre !== '-').every(lettre => lettresDevinees.includes(lettre))) {
    return <p>Bravo ! Vous avez deviné le mot {mot}.</p>;
  }
  return (
    <div>
      <h1>Jeu du pendu</h1>
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
