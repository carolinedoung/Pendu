import React from 'react';

function AffichageMot({ mot, lettresDevinees }) {
  return (
    <p>Mot à deviner: {mot.split('').map(lettre => lettresDevinees.includes(lettre) || lettre === '-' ? lettre : '_').join(' ')}</p>
  );
}

export default AffichageMot;