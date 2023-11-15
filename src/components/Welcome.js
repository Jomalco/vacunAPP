import React from 'react'
import {
    StyleSheet,
    Text,
    View
  } from 'react-native';

import AppButton from '../microComponents/AppButton'

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f00505',
      width: "100%"
    }
  });

function Welcome({navigation}) {
    return (
        <>
            <View>
                <Text>Welcome Page</Text>
                <AppButton title="Go to HomeScreen" onPress={() => navigation.navigate('VacunAPP')}/>
            </View>
        </>
    )
}

export default Welcome;