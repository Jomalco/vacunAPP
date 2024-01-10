{/*
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDFDocument from './PDFDocument';
import { PersonaContext } from '../../contexts/PersonaContext'
import React, { useContext } from 'react'

const App = () => {

    const {
        vacunasPasadas, setVacunasPasadas,
        vacunasFuturas, setVacunasFuturas,
        vacunasIndefinidas, setVacunasIndefinidas,
        uid, index
    } = useContext(PersonaContext)
    
    return(
        <PDFDownloadLink document={<PDFDocument vacunasPasadas={vacunasPasadas}/>} fileName="vacunas.pdf">
            {({ blob, url, loading, error }) =>
                loading ? 'Cargando documento...' : 'Descargar'
            }
        </PDFDownloadLink>
    )};

export default App;
   */}