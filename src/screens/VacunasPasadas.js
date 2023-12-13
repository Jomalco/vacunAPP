import { StyleSheet, Text, View, ScrollView, SafeAreaView, Button } from 'react-native'
import React, { useContext, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { PersonaContext } from '../contexts/PersonaContext'
import Vacuna from '../components/vacunas/Vacuna'
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

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
      <View style={styles.vaccinesContainer}>
        {vacunasPasadas && vacunasPasadas.map((item, index) => (
          <Vacuna key={item.id} {...item} updateSelectedIndex={updateSelectedIndex} />
        ))}
      </View>
      <Button
            style={styles.undefinedVacunasButton}
            title="Confirmar estado de vacunas"
            loading={false}
            loadingProps={{ size: 'small', color: 'white' }}
            buttonStyle={{
              backgroundColor: 'rgba(111, 202, 186, 1)',
              borderRadius: 25,
              marginTop: 10
            }}
            titleStyle={{ fontWeight: 'bold', fontSize: 23 }}
            containerStyle={{
              marginHorizontal: 50,
              height: 50,
              width: "80vw",
              borderRadius: 25,
              marginVertical: 20
            }}
            onPress={() => {updateUndefinedVaccines()}}
          />
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'lightblue',
    paddingTop: 5 
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