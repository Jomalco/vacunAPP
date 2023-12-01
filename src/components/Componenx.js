import React, { useState, useEffect, useContext} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { auth } from '../firebase';
import Vacuna from '../components/vacunas/Vacuna'
import { PersonaContext } from '../contexts/PersonaContext';
import { FlatList } from 'react-native-web';
import { SafeAreaView } from 'react-native-safe-area-context';

const styles = StyleSheet.create({
 container: {
 flex: 7,
 justifyContent: 'center',
 alignItems: 'center',
 backgroundColor: '#f5f5f5',
 width: "100%"
 }
});

export default function Componenx({navigation}) {
 const [user, setUser] = useState(null);

 const {
  vacunasPasadas, setVacunasPasadas,
  vacunasFuturas, setVacunasFuturas,
  vacunasIndefinidas, setVacunasIndefinidas
} = useContext(PersonaContext)

 useEffect(() => {
 const unsubscribe = auth.onAuthStateChanged(user => {
   setUser(user);
 });

 // Cleanup subscription on unmount
 return () => unsubscribe();
 }, []);

 return (
 <View style={styles.container}>
   <Text>Hi </Text>
   <TouchableOpacity onPress={() => {auth.signOut(); setTimeout(() => {navigation.navigate("LoginScreen")},300);}}>
    <Text>
      Log Out
    </Text>
   </TouchableOpacity>
    <Text>{vacunasIndefinidas}</Text>
   <Vacuna/>
 </View>
 );
}
