import { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
  } from 'react-native';

import { ButtonGroup, Icon } from '@rneui/themed';

const styles = StyleSheet.create({
    vacunaContainer: {
      flexDirection: "row",
      borderRadius: 10,
      backgroundColor: "rgba(133, 190, 192, 0.23)",
      //borderColor: "rgba(224, 252, 253, 1)",
      borderColor: "rgba(133, 190, 192, 1)",
      borderWidth: 2,
      width: "95%",
      height: "auto",
      padding: 10,
      shadowColor: 'rgba(206, 237, 238, 0.25)',
      shadowOpacity: 0,
      elevation: 1,
      shadowRadius: 0 ,
      shadowOffset : { width: 0.5 , height: 0.5},
      marginTop: 10
    },
    vacunaFirstInnerContainer: {
      justifyContent: 'center',
      flexDirection: "column",
      flex: 3,
    },
    vacunaSecondInnerContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: "column",
      flex: 1
    },
    textOne: {
      fontWeight: "bold"
    },
    textTwo: {
      fontStyle: "italic"
    }
  });

function VacunaDetalle(props) {
  const { id, updateSelectedIndex } = props;
  const [selectedIndex, setSelectedIndex] = useState(2);

  const handleSelectedIndexChange = (newSelectedIndex) => {
    setSelectedIndex(newSelectedIndex);
    updateSelectedIndex(id, newSelectedIndex);
  };

    return (
        <>
              <View style={styles.vacunaContainer}>     
                  <View style={styles.vacunaFirstInnerContainer}>
                    <Text style={styles.textOne}>{props.nombre}</Text>
                    <Text style={styles.textTwo}>Dosis {props.dosis[0]}/{props.dosis[1]}</Text>
                    <Text style={styles.textTwo}>Día de vacunación estimado: {props.fechaVacunacion}</Text>
                  </View>
              </View>
        </>
    )
}

export default VacunaDetalle;