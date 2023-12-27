import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import { PersonaContext } from '../contexts/PersonaContext'
import React, { useContext, useState } from 'react'
import { Input } from '@rneui/themed';
import { getFirestore, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

const VacunaDetalleScreen = ({route, navigation}) => {
    let props = route.params.item;
    console.log(props)

    const [dosix, setDosix] = useState(props.dosis[0])

    const [inputValue, setInputValue] = useState('');
    const inputName = React.createRef();
    const handleInputChange = (text) => {
        setInputValue(text);
      };

    const {
        vacunasPasadas, setVacunasPasadas,
        vacunasCercanas, setVacunasCercanas,
        vacunasFuturas, setVacunasFuturas,
        index, uid
      } = useContext(PersonaContext)

    function changeDosis (m) {
    // m == 0 -> resta dosis
    // m == 1 -> suma dosis
        if (m == 0) {
            if(props.dosis[0] > 1) {
                props.dosis[0] = props.dosis[0] - 1
                setDosix(dosix-1)
            }
        } else if (m == 1) {
            if(props.dosis[0] < props.dosis[1]) {
                props.dosis[0] = props.dosis[0] + 1
                setDosix(dosix+1)
            }    
        }
    }
        
    function defineStatusText (status) {
        if (status == 1) {
            return "Vacuna aplicada"
        } else if (status == 2) {
            return "Vacuna no aplicada"
        } else if (status == 3) {
            return "Vacuna status 3"
        }
    } 

    function currentDay() {
        const today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1; 
        let yyyy = today.getFullYear();
        
        if (dd < 10) {
            dd = '0' + dd;
        } 
        if (mm < 10) {
            mm = '0' + mm;
        } 
        
        const formattedToday = dd + '/' + mm + '/' + yyyy;
        
        return formattedToday
        
    }

    async function applyChanges(m) {
        const firestore = getFirestore();
        const userRef = doc(firestore, 'users', uid);
        const medicRef = doc(firestore, 'medicos', inputValue)
        const docSnap = await getDoc(userRef);
        const docSnap2 = await getDoc(medicRef);
        let user = docSnap.data();
        let medic = docSnap2.data();

        //m == 1 -> aplicar cambios
        //m == 2 -> reiniciar vacuna
        
            if(m==1) {
                if (docSnap.exists()) {
                    if (medic == undefined) {
                        alert("El médico ingresado no existe")
                    }       
                    else if (dosix == props.dosis[1]) {
                        for (let vacuna of user.Personas[index].arrayVacunas) {
                            if (vacuna.id == props.id) {
                                console.log(vacuna)
                                vacuna.dosis[0] = vacuna.dosis[1];
                                vacuna.fechaVacunacion = currentDay();
                                vacuna.status = 1;
                                vacuna.MD = medic.matricula
                                setVacunasPasadas(vacunasPasadas.filter(vac => vac.id != props.id))
                                setVacunasCercanas(vacunasCercanas.filter(vac => vac.id != props.id))   
                                setVacunasFuturas(vacunasFuturas.filter(vac => vac.id != props.id))
                                setVacunasPasadas([...vacunasPasadas, vacuna])
                                navigation.navigate(("VacunAPP"), {uid: uid})
                            } 
                        } 
                    }
                    else {
                            for (let vacuna of user.Personas[index].arrayVacunas) {
                                if (vacuna.id == props.id) {
                                    vacuna.dosis[0] = dosix
                                } 
                            }
                    }
                    await updateDoc(userRef, user)
                    alert("Los cambios fueron aplicados correctamente")    
                }
                else {
                    console.log("No such document!");
                }
            }
            else if (m==2) {
                if (docSnap.exists()) {
                    for (let vacuna of user.Personas[index].arrayVacunas) {
                        if (vacuna.id == props.id) {
                            vacuna.dosis[0] = 1;
                            vacuna.fechaVacunacion = "Vacuna reiniciada";
                            vacuna.status = 2;
                        } 
                    }
                    await updateDoc(userRef, user)
                    alert("La vacuna fue reiniciada correctamente")    
                }
                else {
                    console.log("No such document!");
                }
            }
    }
     

   
    return (
        <SafeAreaView style={styles.container}>
            {props.dosis[0] == props.dosis[1] && props.status == 1
                ? 
                <View style={{flex:1, alignContent: "center", alignItems: "center"}}>
                <Text style={styles.text}>{props.nombre}</Text>
                <Text style={styles.textTwo}>{defineStatusText(props.status)}</Text>
                <Text style={styles.textTwo}>Día donde fue aplicada la vacuna: {props.fechaVacunacion}</Text>
                <Text style={styles.textTwo}>Dosis {dosix}/{props.dosis[1]}</Text>
                <View style={styles.dosisCompletadaContainer}>
                    <TouchableOpacity
                    style={{
                        marginHorizontal: 50,
                        height: 50,
                        width: "40vw",
                        borderRadius: 25,
                        marginVertical: 10,
                        backgroundColor: 'rgba(200, 157, 238, 0.71)',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingHorizontal: 20
                    }}
                    onPress={() => {applyChanges(2)}}
                    >
                        <Text style={{ fontWeight: 'bold', fontSize: 23, color: 'white' }}>Reiniciar vacuna</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.containerApply}>
                    <Input
                    ref={inputName}
                    label="Código de confirmación del médico"
                    placeholder="Ingresar código aqui"
                    onChangeText={handleInputChange}
                    />
                </View>
                </View>
                : 
                <View>
                <View style={{flex:1, alignContent: "center", alignItems: "center"}}>
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
                </View>
            
            
            <View style={styles.containerApply}>
                <Input
                ref={inputName}
                label="Código de confirmación del médico"
                placeholder="Ingresar código aqui"
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
                    paddingHorizontal: 20
                }}
                onPress={() => {applyChanges(1)}}
                >
                    <Text style={{ fontWeight: 'bold', fontSize: 23, color: 'white' }}>Aplicar cambios</Text>
                </TouchableOpacity>
            </View>
            </View>
            }
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
        flex: 1,
        width: "90%",
        marginTop: 50,
    },
    dosisCompletadaContainer: {
        flex: 1,
        alignContent: "center",
        alignItems: "center",
    }
});

export default VacunaDetalleScreen