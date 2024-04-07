import React from 'react';

function BoutonLettre({ lettre, handleClicLettre }) {
  return (
    <button onClick={() => handleClicLettre(lettre)}>
      {lettre}
    </button>
  );
}
export default BoutonLettre;