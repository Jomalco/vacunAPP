import { StyleSheet, Text, View, ScrollView, SafeAreaView, Button, TouchableOpacity} from 'react-native'
import React, { useContext, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { PersonaContext } from '../contexts/PersonaContext'
import VacunaDetalle from '../components/vacunas/VacunaDetalle'
import { getFirestore, doc, getDoc } from 'firebase/firestore';

export default function VacunasFuturas({ navigation }) {
  const {
    setVacunasCercanas, vacunasCercanas,
    vacunasIndefinidas,
    uid
  } = useContext(PersonaContext)

  useFocusEffect(
    React.useCallback(() => {
      console.log(vacunasCercanas)
      setVacunasCercanas(vacunasCercanas)
      return () => {
        // Cleanup code here
      };
    }, [vacunasCercanas])
  );
 
  async function checkIfAnyVaccineDateHasPassed() {
    const firestore = getFirestore();
    const docRef = doc(firestore, 'users', uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
     const user = docSnap.data();
     console.log("Personas data:", user.Personas);
    } else {
     console.log("No such document!");
    }
  }


  return (
    <View style={styles.container2}>
    <ScrollView>
      <SafeAreaView style={styles.container}>
      <View style={styles.vaccinesContainer}>
      {
        vacunasCercanas.length < 1 ? 
        <View>
          <Text style={{ color: 'black' }}>No hay vacunas en los próximos 6 meses</Text>
        </View>
        :
        vacunasCercanas.map((item, index) => {
              return(
                <TouchableOpacity onPress={() => {navigation.navigate("VacunaDetalleScreen", { item, navigation })}}>
                  <VacunaDetalle key={item.id} {...item} />    
                </TouchableOpacity>
              )
        })  
      }
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