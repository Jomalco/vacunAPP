import React, { createContext, useState } from 'react';



const PersonaContext = createContext({
    vacunasPasadas: [],
    vacunasFuturas: [],
    vacunasIndefinidas: [],
    uid: ''
  });

const PersonaProvider = ({children}) => {
  const [vacunasPasadas, setVacunasPasadas] = useState([])
  const [vacunasFuturas, setVacunasFuturas] = useState([])
  const [vacunasIndefinidas, setVacunasIndefinidas] = useState([])
  const [uid, setUid] = useState('')

  return(
    <PersonaContext.Provider value={{
      vacunasPasadas, setVacunasPasadas,
      vacunasFuturas, setVacunasFuturas,
      vacunasIndefinidas, setVacunasIndefinidas,
      uid, setUid 
    }}>
      {children}
    </PersonaContext.Provider>
  )
}

export {PersonaContext, PersonaProvider};