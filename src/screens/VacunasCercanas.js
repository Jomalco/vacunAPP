import { StyleSheet, Text, View, ScrollView, SafeAreaView, Button } from 'react-native'
import React, { useContext, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { PersonaContext } from '../contexts/PersonaContext'
import VacunaDetalle from '../components/vacunas/VacunaDetalle'
import { getFirestore, doc, getDoc } from 'firebase/firestore';

export default function VacunasFuturas({ navigation }) {
  const {
    vacunasPasadas, setVacunasPasadas,
    vacunasFuturas, setVacunasFuturas,
    vacunasIndefinidas, setVacunasIndefinidas,
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

  const updateSelectedIndex = (id, selectedIndex) => {
    setSelectedIndexes(prev => ({ ...prev, [id]: selectedIndex }));
  };

  const handleUndefinedVacunasButton = () => {

  }

  function isDateInNextSixMonths(dateStr) {
    let dateComponents = dateStr.split("/");
    let rearrangedDateStr = `${dateComponents[1]}/${dateComponents[0]}/${dateComponents[2]}`;
    let inputDate = new Date(rearrangedDateStr);
    let currentDate = new Date();
    let sixMonthsFromNow = new Date();
    sixMonthsFromNow.setMonth(currentDate.getMonth() + 6);

    return inputDate >= currentDate && inputDate <= sixMonthsFromNow;
}

  return (
    <View style={styles.container2}>
    <ScrollView>
      <SafeAreaView style={styles.container}>
      <View style={styles.vaccinesContainer}>
      {
        vacunasFuturas.length > 0 ? 
          vacunasFuturas.map((item, index) => {
            if(isDateInNextSixMonths(item.fechaVacunacion)){
                return(
                    <VacunaDetalle key={item.id} {...item} updateSelectedIndex={updateSelectedIndex} />    
                )
            }
          }) 
        : 
        <Text style={{ color: 'black', alignContent: 'center', alignItems: 'center' }}>No hay vacunas en los próximos 6 meses</Text>
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