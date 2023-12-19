import { StyleSheet, Text, View, ScrollView, SafeAreaView, Button } from 'react-native'
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
      setTimeout(function() {
        if (vacunasIndefinidas.length == 0) {
          
        }
    }, 1000);
    }, [])
  );

  return (
    <View style={styles.container2}>
    <ScrollView>
      <SafeAreaView style={styles.container}>
      <View style={styles.vaccinesContainer}>
        {vacunasFuturas && vacunasFuturas.map((item, index) => {
            return(
                    <VacunaDetalle key={item.id} {...item} />    
                )
        })}
      </View>
      </SafeAreaView>
    </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'lightblue',
    paddingTop: 5 
  },
  container2: {
    flex: 1,
    backgroundColor: 'lightblue',
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