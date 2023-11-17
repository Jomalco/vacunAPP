import * as React from 'react';
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  ActivityIndicator
} from 'react-native';

import Componenx from '../components/Componenx'
import PersonaContext from '../contexts/PersonaContext';
import CreatePerson from './CreatePerson';
import SelectPerson from './SelectPerson';

import {
  getFirestore, doc, getDoc
} from 'firebase/firestore'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const Tab = createBottomTabNavigator()

function HomeScreen({ route }) {
  const { uid } = route.params;

  const [vacunasPasadas, setVacunasPasadas] = useState([]);
  const [vacunasFuturas, setVacunasFuturas] = useState([]);
  const [vacunasIndefinidas, setVacunasIndefinidas] = useState([]);

  const tabNavigator = (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}
    >
      <Tab.Screen
        name="PageOne"
        component={Componenx}
        options={{ title: 'Vacunas Previas',
        tabBarIcon:({size, color}) => (
            <MaterialCommunityIcons name="menu-left-outline"
            size={size} color={color} />
        )
        }}
      />
      <Tab.Screen
        name="PageTwo"
        component={SelectPerson}
        initialParams={{ uid: uid }}
        options={{ title: 'Vacunación Cercana',
        tabBarIcon:({size, color}) => (
            <MaterialCommunityIcons name="details"
            size={size} color={color} />
        )
        }}
      />
      <Tab.Screen
        name="PageThree"
        component={CreatePerson}
        initialParams={{ uid: uid }}
        options={{ title: 'Vacunas Futuras',
        tabBarIcon:({size, color}) => (
            <MaterialCommunityIcons name="menu-right-outline"
            size={size} color={color} />
        )
        }}
      />
    </Tab.Navigator>
  );

  return (
    <PersonaContext.Provider value={{vacunasPasadas, vacunasFuturas, vacunasIndefinidas}}>
      {tabNavigator}
    </PersonaContext.Provider>
  );
}

export default HomeScreen;
