import { StyleSheet, Text, View, ScrollView, SafeAreaView, Button, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { PersonaContext } from '../contexts/PersonaContext'
import VacunaDetalle from '../components/vacunas/VacunaDetalle'
import { getFirestore, doc, getDoc } from 'firebase/firestore';

export default function VacunasFuturas({ navigation }) {
  const {
    vacunasFuturas,
    vacunasIndefinidas,
    uid
  } = useContext(PersonaContext)

  useFocusEffect(
    React.useCallback(() => {
      console.log(vacunasFuturas)
      setVacunasFuturas(vacunasFuturas)
      return () => {
        // Cleanup code here
      };
    }, [vacunasFuturas])
  );

  return (
    <View style={styles.container2}>
      {vacunasFuturas.length < 1 ? 
      <View style={{alignContent: "center", alignItems: "center", height: "100%"}}>
        <Text style={{ color: 'black' }}>No hay vacunas futuras</Text>
      </View>
      :
      <ScrollView>
        <SafeAreaView style={styles.container}>
        <View style={styles.vaccinesContainer}>
          {vacunasFuturas.map((item, index) => {
                return(
                      <TouchableOpacity onPress={() => {navigation.navigate("VacunaDetalleScreen", { item, navigation })}}>
                          <VacunaDetalle key={item.id} {...item} />    
                      </TouchableOpacity>
                  )
          })}
        </View>
        </SafeAreaView>
      </ScrollView>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 5 
  },
  container2: {
    flex: 1,
    backgroundColor: 'rgba(240, 255, 255, 1)',
  },
  vaccinesContainer: {
    alignItems: 'center',
    marginBottom: 15,
    width: "100%",
  },
  undefinedVacunasButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginTop: 15,
    marginBottom: 15
  }
})