import { useState } from 'react';
import {
    StyleSheet,
    Text,
    View
  } from 'react-native';

import { ButtonGroup, Icon } from '@rneui/themed';

const styles = StyleSheet.create({
    vacunaContainer: {
      flexDirection: "row",
      borderRadius: 20,
      backgroundColor: "lightgrey",
      borderColor: "grey",
      borderWidth: 2,
      width: "95%",
      height: "auto",
      padding: 10,
      shadowColor: 'grey',
      shadowOpacity: 1,
      elevation: 1,
      shadowRadius: 10 ,
      shadowOffset : { width: 1, height: 2},
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
      fontWeight: "bold",
      
    },
    textTwo: {
      fontStyle: "italic"
    }
  });

function Vacuna(props) {
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
                <View style={styles.vacunaSecondInnerContainer}>
                  <ButtonGroup
                    buttonStyle={{ padding: 0 }}
                    selectedButtonStyle={{ backgroundColor: '#a5bcc2' }}
                    buttons={[
                      <Text>SI</Text>,
                      <Text>NO</Text>,
                    ]}
                    selectedIndex={selectedIndex}
                    onPress={handleSelectedIndexChange}
                  />
                </View>
              </View>
        </>
    )
}

export default Vacuna;