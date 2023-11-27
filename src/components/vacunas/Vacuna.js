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
      backgroundColor: 'lightblue',
      width: "100%",
      height: "20%",
    },
    vacunaContainer: {
      fontWeight: "bold",
      textDecorationLines: "underline",
      borderRadius: 20,
      backgroundColor: "lightgrey",
      borderColor: "grey",
      borderWidth: 2,
      width: "95%",
      height: "10%",
      padding: 10
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