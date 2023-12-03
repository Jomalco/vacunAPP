import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { PersonaContext } from '../contexts/PersonaContext'
import Vacuna from './vacunas/Vacuna'

export default function UndefinedVacunas({ navigation }) {

  const {
    vacunasPasadas, setVacunasPasadas,
    vacunasFuturas, setVacunasFuturas,
    vacunasIndefinidas, setVacunasIndefinidas
  } = useContext(PersonaContext)

  //Cuando el usuario ya no tenga vacunas indefinidas será redirigido a la pantalla principal de vacunas
  if (vacunasIndefinidas == []) navigation.navigate("HomeScreen")
  console.log(vacunasIndefinidas)
  return (
    <View style={styles.container}>
      {vacunasIndefinidas.map((item, index) => (
       <Vacuna key={index} {...item} />
     ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'lightblue',
    width: "100%",
    height: "20%",
    paddingTop: 5 
  },
})