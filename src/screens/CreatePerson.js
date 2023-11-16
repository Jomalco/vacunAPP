import { StyleSheet, Text, View, SafeAreaView, Button } from 'react-native';
import { useState } from 'react';
import {
  getFirestore, collection, getDocs, doc,
  updateDoc, arrayUnion
} from 'firebase/firestore';
import { CheckBox, Input } from '@rneui/themed';
import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import AppButton from '../microComponents/AppButton';
//import firebase from 'firebase'

const CreatePerson = ({ route, navigation }) => {

  const { uid } = route.params;
  console.log(uid)
  const db = getFirestore()
  const docRef = doc(db, 'users', uid)

  const addDocument = () => {
    updateDoc(docRef, {
      Personas: arrayUnion({
        username: inputValue,
        birthdate: formatDate(date),
        FactoresDeRiesgo: createRiskFactorArray(),
        })
    })
    .then(() => {
      setCheck1(false);
      setCheck2(false);
      setCheck3(false);
      setCheck4(false);
      setCheck5(false);
      setCheck6(false);
      setCheck7(false);
      setCheck8(false);
      setDate(new Date())
      inputName.current.clear()
      console.log("documentAdded")
    })
    .catch((error) => {
      console.log('Error updating document:', error);
    });
  }


  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (text) => {
    setInputValue(text);
  };

  function formatDate(date) {
    var day = ("0" + date.getDate()).slice(-2);
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var year = date.getFullYear();
    return day + "/" + month + "/" + year;
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShow('true');
  };

  const createRiskFactorArray = () => {
    var riskFactorArray = [];
    if (check1) riskFactorArray.push(1);
    if (check2) riskFactorArray.push(2);
    if (check3) riskFactorArray.push(3);
    if (check4) riskFactorArray.push(4);
    if (check5) riskFactorArray.push(5);
    if (check6) riskFactorArray.push(6);
    if (check7) riskFactorArray.push(7);
    if (check8) riskFactorArray.push(8);
    return riskFactorArray;
  }

  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [check4, setCheck4] = useState(false);
  const [check5, setCheck5] = useState(false);
  const [check6, setCheck6] = useState(false);
  const [check7, setCheck7] = useState(false);
  const [check8, setCheck8] = useState(false);

  const inputName = React.createRef();


  return (
    <View>
      <SafeAreaView>
        <Text style={styles.titleText}> Crear nuevo registro vacunatorio: </Text>
        <Input
          ref={inputName}
          label="Agregar nombre"
          onChangeText={handleInputChange}
        />
        <Button onPress={showDatepicker} title="Seleccionar Fecha de Nacimiento" />
        <Text>Fecha seleccionada: {date.toDateString()}</Text>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            display="default"
            mode="date"
            onChange={onChange}
          />
        )}
      </SafeAreaView>
      <SafeAreaView
        style={styles.factoresDeRiesgo}
      >
        <CheckBox
          center
          title="Factor de Riesgo 1"
          checked={check1}
          onPress={() => setCheck1(!check1)}
        />
        <CheckBox
        center
        title="Factor de Riesgo 2"
        checked={check2}
        onPress={() => setCheck2(!check2)}
        />
        <CheckBox
          center
          title="Factor de Riesgo 3"
          checked={check3}
          onPress={() => setCheck3(!check3)}
        />
        <CheckBox
          center
          title="Factor de Riesgo 4"
          checked={check4}
          onPress={() => setCheck4(!check4)}
        />
        <CheckBox
          center
          title="Factor de Riesgo 5"
          checked={check5}
          onPress={() => setCheck5(!check5)}
        />
        <CheckBox
          center
          title="Factor de Riesgo 6"
          checked={check6}
          onPress={() => setCheck6(!check6)}
        />
        <CheckBox
          center
          title="Factor de Riesgo 7"
          checked={check7}
          onPress={() => setCheck7(!check7)}
        />
        <CheckBox
          center
          title="Factor de Riesgo 8"
          checked={check8}
          onPress={() => setCheck8(!check8)}
        />
      </SafeAreaView>
      <AppButton title="Agregar persona" onPress={() => {addDocument(); navigation.navigate("SelectPerson", { uid: uid })}}/>  
    </View>
  )
}

export default CreatePerson;

const styles = StyleSheet.create({
  container: {
    flex: 7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    width: "100%"
  },
  titleText: {
    fontSize: 30,
    marginVertical: 10,
    textAlign: 'center'
  },
  factoresDeRiesgo: {
    marginTop: 20
  },
  fechaNacimiento: {
    width: "50%"
  }
})