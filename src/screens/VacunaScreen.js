import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

function AddMonthsToDate(date, months) {
    let newDate = new Date(date)
    newDate.setMonth(newDate.getMonth() + months)
    return newDate
    }

const VacunaScreen = () => {
  return (
    <View>
      <Text>VacunaScreen</Text>
    </View>
  )
}

export default VacunaScreen

const styles = StyleSheet.create({})