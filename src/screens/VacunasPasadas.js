import { StyleSheet, Text, View, ScrollView, SafeAreaView, Button, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { PersonaContext } from '../contexts/PersonaContext'
import VacunaDetalle from '../components/vacunas/VacunaDetalle'
import { getFirestore, doc, getDoc } from 'firebase/firestore';

export default function VacunasPasadas({ navigation }) {
  const {
    vacunasPasadas, setVacunasPasadas,
    vacunasFuturas, setVacunasFuturas,
    vacunasIndefinidas, setVacunasIndefinidas,
    uid
  } = useContext(PersonaContext)

  useFocusEffect(
    React.useCallback(() => {
      setVacunasPasadas(vacunasPasadas)
      if (vacunasIndefinidas.length > 0) {
        navigation.navigate("UndefinedVacunas")
      }
      return () => {
        // Cleanup code here
      };
    }, [vacunasPasadas])
  );
 
  async function updateUndefinedVaccines() {
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

  const [selectedIndexes, setSelectedIndexes] = useState([]);

  const handleUndefinedVacunasButton = () => {

  }

  return (
    <View style={styles.container2}>
    {vacunasPasadas.length < 1 ? 
      <View style={{alignContent: "center", alignItems: "center", height: "100%"}}>
        <Text style={{ color: 'black' }}>Todavía no hay vacunas pasadas</Text>
      </View>
      :
      <ScrollView>
        <SafeAreaView style={styles.container}>
          <View style={styles.vaccinesContainer}>
            {vacunasPasadas.map((item, index) => {
                          return(
                            <TouchableOpacity key={item.id} onPress={() => {navigation.navigate("VacunaDetalleScreen", { item, navigation })}}>
                              <VacunaDetalle {...item} />
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
    height: "100%",
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