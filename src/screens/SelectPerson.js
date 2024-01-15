import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator, FlatList  } from 'react-native'
import React, { useContext } from 'react'
import {
  getFirestore, doc, getDoc
} from 'firebase/firestore'
import { auth } from '../firebase/firebase';
import { useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { PersonaContext } from '../contexts/PersonaContext'

const SelectPerson = ({ route, navigation }) => {
  const [personas, setPersonas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const {
    vacunasPasadas, setVacunasPasadas,
    vacunasCercanas, setVacunasCercanas,
    vacunasFuturas, setVacunasFuturas,
    vacunasIndefinidas, setVacunasIndefinidas,
    setIndex, uid
  } = useContext(PersonaContext)

  useEffect(() => {
    getDocuments().then(array => {
      setVacunasIndefinidas([])
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

  function hasDatePassed(vaccinedate) {
    const [day, month, year] = vaccinedate.split("/");
    const date = new Date(year, month - 1, day);
    const currentDate = new Date();
    date.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);
    if (vaccinedate == "Vacuna reiniciada") {
      return true;
    }
    if (date <= currentDate) {
      return true;
    } else {
      return false;
    }
  }

  function isDateInNextSixMonths(dateStr) {
    let dateComponents = dateStr.split("/");
    let rearrangedDateStr = `${dateComponents[1]}/${dateComponents[0]}/${dateComponents[2]}`;
    let inputDate = new Date(parseInt(dateComponents[2]), parseInt(dateComponents[1]) - 1, parseInt(dateComponents[0]));
    let currentDate = new Date();
    let sixMonthsFromNow = new Date();
    sixMonthsFromNow.setMonth(currentDate.getMonth() + 6);
    return inputDate >= currentDate && inputDate <= sixMonthsFromNow;
  }

  function definirVacunasPasadas(arrayVacunas) {
    let indefVacunas = []
    let pasadasVacunas = []
    for(let vacuna of arrayVacunas)
    {
      if (hasDatePassed(vacuna.fechaVacunacion))
      {
        if (vacuna.status == 3)
        {
          indefVacunas.push(vacuna)
        }
        else
        {
          pasadasVacunas.push(vacuna)
        }
      }
    }
    setVacunasIndefinidas(indefVacunas)
    setVacunasPasadas(pasadasVacunas)
  }

  function definirVacunasFuturas(arrayVacunas) {
    let futurasVacunas = []
    let cercanasVacunas = []
    for(let vacuna of arrayVacunas)
    {
      if (!hasDatePassed(vacuna.fechaVacunacion))
      {
        if(!isDateInNextSixMonths(vacuna.fechaVacunacion))
        {
          futurasVacunas.push(vacuna)
        }
        else {
          cercanasVacunas.push(vacuna)
        }
      }
    }
    setVacunasCercanas(cercanasVacunas)
    setVacunasFuturas(futurasVacunas)
  }

  function NavigatePersona(arrayVacunas, index) {
    setIndex(index)
    setVacunasIndefinidas([])
    setVacunasCercanas([])
    setVacunasPasadas([])
    setVacunasFuturas([])
    definirVacunasPasadas(arrayVacunas)
    definirVacunasFuturas(arrayVacunas)
    if (vacunasIndefinidas.length == 0) {
      navigation.navigate("VacunAPP", {uid: uid})
    }
    else {
      navigation.navigate("UndefinedVacunas")
    }
  }
 
  const db = getFirestore();
  const docRef = doc(db, 'users', uid);
  
  const getDocuments = async () => {
   console.log("Trying");
   const docSnap = await getDoc(docRef);
   if (docSnap.exists()) {
     const data = docSnap.data();
     const array = data.Personas;
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
            onPress={() => {NavigatePersona(persona.arrayVacunas, index);}}
          >
            <Text style={styles.text}>{persona.username.toUpperCase()}</Text>
          </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={styles.buttonAgregarPersona}
            key={"agregarPersona"}
            onPress={() => navigation.navigate("CreatePerson", { uid: uid })}
          >
            <Text style={styles.text}>AGREGAR NUEVA PERSONA</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonLogOut} onPress={() => {auth.signOut(); setTimeout(() => {navigation.navigate("LoginScreen")},300);}}>
            <Text>
              CERRAR SESION
            </Text>
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
            <Text style={styles.text}>AGREGAR NUEVA PERSONA</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonLogOut} onPress={() => {auth.signOut(); setTimeout(() => {navigation.navigate("LoginScreen")},300);}}>
          <Text>
            CERRAR SESION
          </Text>
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
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(83, 191, 243, 0.8)',
    backgroundColor: 'rgba(39, 178, 245, 0.8)',
  },
  buttonAgregarPersona:{
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(39, 178, 245, 0.8)',
    fontStyle: 'bold',
    backgroundColor: 'rgba(208, 238, 253, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLogOut:{
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(222, 20, 20, 1)',
    fontStyle: 'bold',
    backgroundColor: 'rgba(243, 88, 88, 0.72)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
  }
})