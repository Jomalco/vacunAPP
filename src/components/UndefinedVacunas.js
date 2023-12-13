import { StyleSheet, Text, View, ScrollView, SafeAreaView, Button } from 'react-native'
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
      setTimeout(function() {
        if (vacunasIndefinidas.length == 0) {
          navigation.navigate("VacunAPP", {uid: uid})
        }
    }, 1000);
    }, [])
  );
 
  async function updateUndefinedVaccines() {
    const firestore = getFirestore();
    const docRef = doc(firestore, 'users', uid);
    const docSnap = await getDoc(docRef);
    let user = docSnap.data();
    console.log(user)
    if (docSnap.exists()) {
      for (let vacuna of user.Personas[index].VacunasPasadas) {
        if (vacuna.id === 29) {
          vacuna.status = 2;
          break;
        }
      }
      console.log(user)
      await updateDoc(docRef, user);
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