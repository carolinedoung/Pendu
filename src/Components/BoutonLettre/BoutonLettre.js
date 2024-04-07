import React from 'react';
import './BoutonLettre.css';

function BoutonLettre({ lettre, handleClicLettre }) {
  return (
    <button className="btn-lettre" onClick={() => handleClicLettre(lettre)}>
      {lettre}
    </button>
  );
}
export default BoutonLettre;