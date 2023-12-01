import { useState } from 'react';
import {
    StyleSheet,
    Text,
    View
  } from 'react-native';

import { ButtonGroup, Icon } from '@rneui/themed';

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

function Vacuna(props) {

  const [selectedIndex, setSelectedIndex] = useState(2);

    return (
        <>
            <View style={styles.container}>
              <View style={styles.vacunaContainer}>
                <View style={styles.vacunaFirstInnerContainer}>
                  <Text style={styles.textOne}>Título de la Vacuna</Text>
                  <Text style={styles.textTwo}>Dosis 1/3</Text>
                  <Text style={styles.textTwo}>Día de vacunación estimado: dd/mm/yyyy</Text>
                </View>
                <View style={styles.vacunaSecondInnerContainer}>
                  <ButtonGroup
                    buttonStyle={{ padding: 0 }}
                    selectedButtonStyle={{ backgroundColor: '#e2e2e2' }}
                    buttons={[
                      <Icon name="check" />,
                      <Icon name="close" />,
                    ]}
                    selectedIndex={selectedIndex}
                    onPress={setSelectedIndex}
                  />
                </View>
              </View>
            </View>
        </>
    )
}

export default Vacuna;