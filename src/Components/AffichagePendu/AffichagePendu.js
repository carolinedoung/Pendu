import React from 'react';
import hangman0 from './images/Hangman-0.png';
import hangman1 from './images/Hangman-1.png';
import hangman2 from './images/Hangman-2.png';
import hangman3 from './images/Hangman-3.png';
import hangman4 from './images/Hangman-4.png';
import hangman5 from './images/Hangman-5.png';
import hangman6 from './images/Hangman-6.png';

function AffichagePendu({ essais }) {
  const imagesPendu = [
    hangman0,
    hangman1,
    hangman2,
    hangman3,
    hangman4,
    hangman5,
    hangman6,
  ];

  return (
    <img src={imagesPendu[6 - essais]} alt="Pendu" />
  );
}

export default AffichagePendu;