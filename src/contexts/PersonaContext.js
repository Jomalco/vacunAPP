import React, { createContext } from 'react';



const PersonaContext = createContext({
    vacunasPasadas: [],
    vacunasFuturas: [],
    vacunasIndefinidas: [],
  });

export default PersonaContext;