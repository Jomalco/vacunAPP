import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native'
import React from 'react'
import {
  getFirestore, doc, getDoc
} from 'firebase/firestore'
import { useEffect, useState } from 'react'

const SelectPerson = ({ route }) => {
  const [personas, setPersonas] = useState([]);

  useEffect(() => {
   // Replace this with your actual fetch logic
   getDocuments().then(array => {
     setPersonas(array);
   });
  }, []);

  const { uid } = route.params;
  const db = getFirestore();
  const docRef = doc(db, 'users', uid);
  
  const getDocuments = async () => {
   console.log("Trying");
   const docSnap = await getDoc(docRef);
   if (docSnap.exists()) {
     const data = docSnap.data();
     const array = data.Personas;
     console.log(array);
     return array;
   } else {
     console.log("No such document!");
     return null;
   }
  }
  
  let documentArray = getDocuments;

  return (
    <View>
        {personas.map((persona, index) => (
        <TouchableOpacity
          style={styles.buttonPersona}
          key={index}
          onPress={() => console.log({persona})}
        >
          <Text>{persona.birthdate}</Text>
        </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={styles.buttonAgregarPersona}
          key={"agregarPersona"}
          onPress={() => console.log("Agregar Persona")}
        >
          <Text>+</Text>
        </TouchableOpacity>
    </View>
  )
}

export default SelectPerson

const styles = StyleSheet.create({
  buttonPersona:{
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'green',
    backgroundColor: 'lightblue',
  },
  buttonAgregarPersona:{
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'green',
    fontStyle: 'bold',
    backgroundColor: 'lightgreen',
    justifyContent: 'center',
    alignItems: 'center',
  }
})