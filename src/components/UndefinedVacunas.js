import { StyleSheet, Text, View, ScrollView, SafeAreaView, Button, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { PersonaContext } from '../contexts/PersonaContext'
import Vacuna from './vacunas/Vacuna'
import { getFirestore, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

export default function UndefinedVacunas({ navigation }) {
  const {
    vacunasPasadas, setVacunasPasadas,
    vacunasFuturas, setVacunasFuturas,
    vacunasIndefinidas, setVacunasIndefinidas,
    uid, index
  } = useContext(PersonaContext)

  useFocusEffect(
    React.useCallback(() => {
      if (vacunasIndefinidas.length == 0) {
        navigation.navigate("VacunAPP", {uid: uid})
      }
      return () => {
        // Cleanup code here
      };
    }, [vacunasIndefinidas])
  );
 
  async function updateUndefinedVaccines() {
    const firestore = getFirestore();
    const docRef = doc(firestore, 'users', uid);
    const docSnap = await getDoc(docRef);
    let user = docSnap.data();
    if (docSnap.exists()) {
      if (Object.keys(selectedIndexes).length == vacunasIndefinidas.length) { //Todos los estados de las vacunas deben ser confirmados
        for (let vacuna of user.Personas[index].arrayVacunas) {
          console.log(vacuna.nombre)
          if (selectedIndexes.hasOwnProperty(vacuna.id) && selectedIndexes[vacuna.id] === 1) {
            vacuna.status = 2;
            vacuna.dosis[0] = 1
          } else if (selectedIndexes.hasOwnProperty(vacuna.id) && selectedIndexes[vacuna.id] === 0) {
            vacuna.status = 1;
            vacuna.dosis[0] = vacuna.dosis[1]
          }
        }
        await updateDoc(docRef, user)
        setVacunasPasadas(vacunasIndefinidas)
        setVacunasIndefinidas([])
        setTimeout(() => {
          navigation.navigate(("VacunAPP"), {uid: uid})
        }, 1000);
      }
      else {
        alert("El estado de todas las vacunas deben ser confirmados al mismo tiempo")
      }
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
    <View style={styles.container2}>
    <ScrollView>
      <SafeAreaView style={styles.container}>
      <View style={styles.vaccinesContainer}>
        {vacunasIndefinidas && vacunasIndefinidas.map((item, index) => (
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
      <TouchableOpacity style={styles.undefinedVacunasButton2} onPress={() => {navigation.navigate("SelectPerson", {uid: uid})}}>
            <Text>
              Volver atrás
            </Text>
      </TouchableOpacity>   
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
  },
  undefinedVacunasButton2: {
    backgroundColor: '#F38383',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginTop: 15,
    marginBottom: 15
  }
})