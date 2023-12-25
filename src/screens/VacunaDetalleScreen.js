import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import { PersonaContext } from '../contexts/PersonaContext'
import React, { useContext, useState } from 'react'
import { Input } from '@rneui/themed';
import { getFirestore, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

const VacunaDetalleScreen = (paramprops) => {
    let props = paramprops.route.params.item

    const [dosix, setDosix] = useState(props.dosis[0])

    const [inputValue, setInputValue] = useState('');
    const inputName = React.createRef();
    const handleInputChange = (text) => {
        setInputValue(text);
      };

    const {
        index, uid
      } = useContext(PersonaContext)

    async function applyChanges() {
        console.log(inputValue)
        const firestore = getFirestore();
        const userRef = doc(firestore, 'users', uid);
        const medicRef = doc(firestore, 'medicos', inputValue)
        const docSnap = await getDoc(userRef);
        const docSnap2 = await getDoc(medicRef);
        let user = docSnap.data();
        let medic = docSnap2.data();
        console.log(medic)
        if (docSnap.exists()) {
            if (medic == undefined) {
                alert("El médico ingresado no existe")
            }       
            else {
                for (let vacuna of user.Personas[index].arrayVacunas) {
                  if (vacuna.id == props.id) {
                    vacuna.dosis[0] = dosix;
                  } 
                }
                console.log(user.Personas[index].arrayVacunas)
                await updateDoc(userRef, user)
                alert("Los cambios fueron aplicados correctamente")
            }
        } else {
         console.log("No such document!");
        }
        
      }

    function defineStatusText (status) {
        if (status == 1) {
            return "Vacuna no aplicada"
        } else if (status == 2) {
            return "Vacuna no aplicada"
        } else if (status == 3) {
            return "Vacuna status 3"
        }
    }      

    function aplicarVacuna() {
        
    }

    function changeDosis (n) {
        // n == 0 -> restar dosis
        // n == 1 -> sumar dosis
        if (n == 0) {
            if(props.dosis[0] > 1) {
                props.dosis[0] = props.dosis[0] - 1
                setDosix(dosix-1)
            }
        } else if (n == 1) {
            if(props.dosis[0] < props.dosis[1]) {
                props.dosis[0] = props.dosis[0] + 1
                setDosix(dosix+1)
            }    
        }
        console.log(props)
    }
    
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>{props.nombre}</Text>
            <Text style={styles.textTwo}>{defineStatusText(props.status)}</Text>
            <Text style={styles.textTwo}>Día de vacunación estimado: {props.fechaVacunacion}</Text>
            <Text style={styles.textTwo}>Dosis {dosix}/{props.dosis[1]}</Text>
            <View style={{flexDirection: "row", marginTop: 10, alignContent: "center", alignItems: "center"}}>
                <TouchableOpacity style={styles.dosisButton} onPress={() => {changeDosis(0)}}>
                    <Text>
                        -
                    </Text>
                </TouchableOpacity>
                    <Text>Cambiar dosis</Text>
                <TouchableOpacity style={styles.dosisButton} onPress={() => {changeDosis(1)}}>
                    <Text>
                        +
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.containerApply}>
                <Input
                ref={inputName}
                label="Agregar nombre"
                onChangeText={handleInputChange}
                />
                <TouchableOpacity
                style={{
                    marginHorizontal: 50,
                    height: 50,
                    width: "80vw",
                    borderRadius: 25,
                    marginVertical: 50,
                    backgroundColor: 'rgba(200, 157, 238, 0.71)',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                onPress={() => {applyChanges()}}
                >
                    <Text style={{ fontWeight: 'bold', fontSize: 23, color: 'white' }}>Aplicar cambios</Text>
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
    },
    containerApply: {
        marginTop: 50,
    }
});

export default VacunaDetalleScreen