import React, { createContext, useState } from 'react';



const PersonaContext = createContext({
    vacunasPasadas: [],
    vacunasFuturas: [],
    vacunasIndefinidas: [],
  });

const PersonaProvider = ({children}) => {
  const [vacunasPasadas, setVacunasPasadas] = useState([])
  const [vacunasFuturas, setVacunasFuturas] = useState([])
  const [vacunasIndefinidas, setVacunasIndefinidas] = useState([[
    {
        "birthdate": "30/11/2023",
        "nombre": "Neumococo Conjugada",
        "status": 3,
        "factoresDeRiesgo": [1, 4],
        "id": 24,
        "dosis": [0, 3],
        "separacionDosis": [0, 2, 8],
        "fechaVacunacion": "01/02/2024"
    },
    {
        "birthdate": "30/11/2023",
        "nombre": "Antigripal",
        "status": 3,
        "factoresDeRiesgo": [2, 6, 8],
        "id": 29,
        "dosis": [0, 2],
        "separacionDosis": [0, 1],
        "fechaVacunacion": "01/03/2024"
    }
 ]])

  return(
    <PersonaContext.Provider value={{
      vacunasPasadas, setVacunasPasadas,
      vacunasFuturas, setVacunasFuturas,
      vacunasIndefinidas, setVacunasIndefinidas
    }}>
      {children}
    </PersonaContext.Provider>
  )
}

export {PersonaContext, PersonaProvider};