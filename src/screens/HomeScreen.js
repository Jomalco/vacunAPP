import * as React from 'react';
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  ActivityIndicator
} from 'react-native';

import Componenx from '../components/Componenx'
import CreatePerson from './CreatePerson';
import SelectPerson from './SelectPerson';
import VacunasPasadas from './VacunasPasadas';
import VacunasCercanas from './VacunasCercanas'
import VacunasFuturas from './VacunasFuturas';
import { Icon } from '@rneui/themed';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'


const Tab = createBottomTabNavigator()

function HomeScreen({ route }) {
  const { uid } = route.params;

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}
    >
      <Tab.Screen
        name="PageOne"
        component={VacunasPasadas}
        options={{ title: 'Vacunas Previas',
        tabBarIcon:({size, color}) => (
          <Text style={{fontSize:30}}> {"<"} </Text>
        ),
        tabBarLabelStyle: { fontSize: 15, paddingBottom: 5 }
        }}
      />
      <Tab.Screen
        name="PageTwo"
        component={VacunasCercanas}
        initialParams={{ uid: uid }}
        options={{ title: 'Vacunación Cercana',
        tabBarIcon:({size, color}) => (
          <Text style={{fontSize:20}}> o </Text>
        ),
        tabBarLabelStyle: { fontSize: 15, paddingBottom: 5 }
        }}
      />
      <Tab.Screen
        name="PageThree"
        component={VacunasFuturas}
        initialParams={{ uid: uid }}
        options={{ title: 'Vacunas Futuras',
        tabBarIcon:({size, color}) => (
          <Text style={{fontSize:30}}> {">"} </Text>
        ),
        tabBarLabelStyle: { fontSize: 15, paddingBottom: 5 }
        }}
      />
    </Tab.Navigator>
  );
}
export default HomeScreen;
