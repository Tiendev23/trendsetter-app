import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomDirectionButton from '../ChevronButton'
const Backnav = ({navigation}) => {
    return (
        <View style={styles.header}>
            <CustomDirectionButton direction="back" onPress={() => navigation.goBack()} />
        </View>
    )
}

export default Backnav

const styles = StyleSheet.create({
      header: {
    backgroundColor: '#fff',
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
  }
})