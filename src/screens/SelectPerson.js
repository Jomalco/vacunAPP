import { StyleSheet, Text, ScrollView, TouchableOpacity, ActivityIndicator  } from 'react-native'
import React from 'react'
import {
  getFirestore, doc, getDoc
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'

const SelectPerson = ({ route, navigation }) => {
  const [personas, setPersonas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getDocuments().then(array => {
      setPersonas(array);
      setIsLoading(false);
    });
   }, []);

  useFocusEffect(
    React.useCallback(() => {
      setTimeout(() => { 
        getDocuments().then(array => {
        setPersonas(array);
        setIsLoading(false);
        });
      }, 500)
      
    }, [])
  );
 
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

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#00ff00" />
        <Text>Cargando...</Text>
      </View>
    );
  }

  if(personas != null)
  {
    return (
      <ScrollView>
          {personas.map((persona, index) => (
          <TouchableOpacity
            style={styles.buttonPersona}
            key={index}
            onPress={() => console.log({persona})}
          >
            <Text>{persona.username.toUpperCase()}</Text>
          </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={styles.buttonAgregarPersona}
            key={"agregarPersona"}
            onPress={() => navigation.navigate("CreatePerson", { uid: uid })}
          >
            <Text>AGREGAR NUEVA PERSONA</Text>
          </TouchableOpacity>
      </ScrollView>
    )
  }
  else
  {
    return (
      <View>
        <TouchableOpacity
            style={styles.buttonAgregarPersona}
            key={"agregarPersona"}
            onPress={() => navigation.navigate("CreatePerson", { uid: uid })}
          >
            <Text>AGREGAR NUEVA PERSONA</Text>
        </TouchableOpacity>
      </View>
    )
  }
  
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
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})