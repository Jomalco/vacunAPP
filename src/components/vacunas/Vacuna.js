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
      backgroundColor: '#f00505',
      width: "100%"
    }
  });

function Vacuna(props) {

    return (
        <>
            <View>
                <Text>Welcome Pag</Text>
            </View>
        </>
    )
}

export default Vacuna;