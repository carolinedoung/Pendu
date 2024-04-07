import React from 'react';

function LettresDevinees({ lettresDevinees }) {
  return (
    <div>
      <p>Lettres déjà devinées: {lettresDevinees.join(', ')}</p>
    </div>
  );
}

export default LettresDevinees;
