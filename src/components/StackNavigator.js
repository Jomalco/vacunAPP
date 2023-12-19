import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Componenx from './Componenx'
import Welcome from './Welcome'
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
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="CreatePerson" component={CreatePerson} />
          <Stack.Screen name="SelectPerson" component={SelectPerson} />
          <Stack.Screen name="UndefinedVacunas" component={UndefinedVacunas} />
          <Stack.Screen name="VacunAPP" component={HomeScreen} />
          <Stack.Screen name="VacunaDetalleScreen" component={VacunaDetalleScreen} />
        </Stack.Navigator>
      </PersonaProvider>
  );
}

export default MyStack