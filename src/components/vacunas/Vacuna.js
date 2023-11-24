import React from 'react'
import {
    StyleSheet,
    Text,
    View
  } from 'react-native';

import AppButton from '../../microComponents/AppButton'

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'blue',
      width: "100%",
      height: "20%",
    },
    vacunaContainer: {
      borderRadius: "40%",
      backgroundColor: "green",
      borderColor: "black",
      borderWidth: 2
    }
  });

function Vacuna(props) {

    return (
        <>
            <View style={styles.container}>
              <View style={styles.vacunaContainer}>
                <Text>Titulo de la Vacuna</Text>
              </View>
            </View>
        </>
    )
}

export default Vacuna;