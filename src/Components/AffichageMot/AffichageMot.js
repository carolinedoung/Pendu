function AffichageMot({ mot, lettresDevinees }) {
  const motNormalise = mot.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const lettresDevineesNormalisees = lettresDevinees.map(lettre => lettre.normalize("NFD").replace(/[\u0300-\u036f]/g, ""));

  return (
    <p>
      Mot à deviner :{" "}
      {mot
        .split("")
        .map((lettre, index) =>
          lettre === "-" ? "-" : lettresDevineesNormalisees.includes(motNormalise[index]) ? lettre : "_"
        )
        .join(" ")}
    </p>
  );
}

export default AffichageMot;



// import React from 'react';

// function AffichageMot({ mot, lettresDevinees }) {
//   return (
//     <p>Mot à deviner: {mot.split('').map(lettre => lettresDevinees.includes(lettre) || lettre === '-' ? lettre : '_').join(' ')}</p>
//   );
// }

// export default AffichageMot;