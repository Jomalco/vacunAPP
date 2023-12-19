import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'

const VacunaDetalleScreen = (props) => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>{props.nombre}</Text>
            <Text style={styles.textTwo}>Día de vacunación estimado: {props.fechaVacunacion}</Text>
        </SafeAreaView>
      );
    };
    
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        fontSize: 25,
        fontWeight: '500',
    },
    textTwo: {
      fontStyle: "italic"
    }
});

export default VacunaDetalleScreen