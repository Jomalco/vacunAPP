import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Text, TouchableOpacity } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import CreatePerson from '../screens/CreatePerson';
import SelectPerson from '../screens/SelectPerson';
import {PersonaContext, PersonaProvider} from '../contexts/PersonaContext';
import UndefinedVacunas from './UndefinedVacunas';
import VacunaDetalleScreen from '../screens/VacunaDetalleScreen';

const Stack = createNativeStackNavigator();

function MyStack() {
    return (
      <PersonaProvider>
        <Stack.Navigator
            initialRouteName="LoginScreen"
        >
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: '' }}/>
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ title: 'Registrarse' }}/>
          <Stack.Screen name="CreatePerson" component={CreatePerson} options={{ title: 'Crear Persona' }}/>
          <Stack.Screen name="SelectPerson" component={SelectPerson} options={{ title: 'Seleccionar Persona' }}/>
          <Stack.Screen name="UndefinedVacunas" 
            component={UndefinedVacunas} 
            options={({ navigation }) => ({  
              title: '   Vacunas sin definir',
              headerLeft: () => (
                <TouchableOpacity style={{ alignContent: "center", alignItems: "center"}} onPress={() => navigation.navigate("SelectPerson")}>
                  <Text style={{alignSelf: "center", fontSize: 30}}> {"←"} </Text>
                </TouchableOpacity>
              )
            })}/>
          <Stack.Screen
            name="VacunAPP"
            component={HomeScreen}
            options={({ navigation }) => ({
              title: '',
              headerRight: () => (
                <Button title="Descargar PDF" onPress={() => {}} />
              ),
              headerLeft: () => (
                <TouchableOpacity style={{ alignContent: "center", alignItems: "center"}} onPress={() => navigation.navigate("SelectPerson")}>
                  <Text style={{alignSelf: "center", fontSize: 30}}> {"←"} </Text>
                </TouchableOpacity>
              )
            })}
          />
          <Stack.Screen name="VacunaDetalleScreen" component={VacunaDetalleScreen} options={{ title: '' }}/>
        </Stack.Navigator>
      </PersonaProvider>
  );
}

export default MyStack