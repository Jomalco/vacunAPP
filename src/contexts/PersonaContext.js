import React, { createContext, useState } from 'react';



const PersonaContext = createContext({
    vacunasPasadas: [],
    vacunasCercanas: [],
    vacunasFuturas: [],
    vacunasIndefinidas: [],
    uid: '',
    index: 100
  });

const PersonaProvider = ({children}) => {
  const [vacunasPasadas, setVacunasPasadas] = useState([])
  const [vacunasCercanas, setVacunasCercanas] = useState([])
  const [vacunasFuturas, setVacunasFuturas] = useState([])
  const [vacunasIndefinidas, setVacunasIndefinidas] = useState([])
  const [uid, setUid] = useState('')
  const [index, setIndex] = useState(100)

  return(
    <PersonaContext.Provider value={{
      vacunasPasadas, setVacunasPasadas,
      vacunasCercanas, setVacunasCercanas,
      vacunasFuturas, setVacunasFuturas,
      vacunasIndefinidas, setVacunasIndefinidas,
      uid, setUid,
      index, setIndex
    }}>
      {children}
    </PersonaContext.Provider>
  )
}

export {PersonaContext, PersonaProvider};