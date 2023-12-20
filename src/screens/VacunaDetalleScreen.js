import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import { PersonaContext } from '../contexts/PersonaContext'
import React, { useContext, useState } from 'react'

const VacunaDetalleScreen = (paramprops) => {
    const {
        index
      } = useContext(PersonaContext)

    let props = paramprops.route.params.item
    console.log(props)
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>{props.nombre}</Text>
            <Text style={styles.textTwo}>Día de vacunación estimado: {props.fechaVacunacion}</Text>
            <Text style={styles.textTwo}>Dosis {props.dosis[0]+1}/{props.dosis[1]}</Text>
            <View style={{flexDirection: "row", marginTop: 10, alignContent: "center", alignItems: "center"}}>
                <TouchableOpacity style={styles.dosisButton}>
                    <Text>
                        -
                    </Text>
                </TouchableOpacity>
                    <Text>Cambiar dosis</Text>
                <TouchableOpacity style={styles.dosisButton}>
                    <Text>
                        +
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
      );
    };
    
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        alignContent: "center",
        alignItems: "center",
        paddingTop: 20,
    },
    text: {
        fontSize: 35,
        fontWeight: '500',
    },
    textTwo: {
        fontSize: 15,
        fontStyle: "italic",
        paddingTop: 5
    },
    dosisButton: {
        width: 40,
        height: 40,
        borderRadius: 25,
        backgroundColor: "lightgrey",
        borderColor: "grey",
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5
    }
});

export default VacunaDetalleScreen