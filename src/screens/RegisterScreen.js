import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import DateField from 'react-native-datefield';

import { auth } from '../firebase'

const RegisterScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [value, onChange] = useState(new Date());

  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        console.log(user.uid)
        navigation.replace("VacunAPP")
      }
    })

    return unsubscribe
  }, [])

  const handleSignUp = () => {
    if(password == password2)
    {
      createUserWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Registered with:', user.email);
      })
      .catch(error => alert(error.message));
    }
    else
    {
      alert("Las contraseñas no cohinciden, por favor vuelva a intentar")
    }
    
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      <View style={styles.inputContainer}>
        <View style={styles.registerSection}>
          <Text>Correo Electrónico</Text>
          <TextInput
            placeholder="Ingrese su correo electrónico"
            value={email}
            onChangeText={text => setEmail(text)}
            style={styles.input}
          />
        </View>
        <View style={styles.registerSection}>
          <Text>Contraseña</Text>
          <TextInput
            placeholder="Ingrese su contraseña"
            value={password}
            onChangeText={text => setPassword(text)}
            style={styles.input}
            secureTextEntry
          />
          <TextInput
            placeholder="Repita su contraseña"
            value={password2}
            onChangeText={text => setPassword2(text)}
            style={styles.input}
            secureTextEntry
          />
        </View>  
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Crear Cuenta</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%'
  },
  registerSection: {
    marginTop: 15,
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
})