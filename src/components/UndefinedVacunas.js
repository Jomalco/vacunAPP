import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { PersonaContext } from '../contexts/PersonaContext'
import Vacuna from './vacunas/Vacuna'

export default function UndefinedVacunas({ navigation }) {

  const {
    vacunasPasadas, setVacunasPasadas,
    vacunasFuturas, setVacunasFuturas,
    vacunasIndefinidas, setVacunasIndefinidas,
    uid
  } = useContext(PersonaContext)

  useFocusEffect(
    React.useCallback(() => {
      if (vacunasIndefinidas.length == 0) {
        navigation.navigate("VacunAPP", {uid: uid})
      }
    }, [])
  );

  return (
    <View style={styles.container}>
      {vacunasIndefinidas && vacunasIndefinidas.map((item, index) => (
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