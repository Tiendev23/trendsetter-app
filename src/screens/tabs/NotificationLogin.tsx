import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import React from 'react'


export default function NotificationLogin(){
    <View style={styles.container}>
          <ScrollView style={styles.scroll}>
             <View style={styles.tag}>
                <View style={styles.anh}>
                    <Image source={require('../../../assets/icons/mail.png')}/>
                </View>
                <View style={styles.bigtext}>
                    <View style={styles.text1}>
                        <Text>goaoa</Text>
                    </View>
                    <View style={styles.text2}>
                        <Text>goaoa</Text>
                    </View>
                </View>
             </View>
          </ScrollView>
        </View>
}

const styles = StyleSheet.create({
     container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  tag:{
    flexDirection:'row',
    height:'10%'
  },
  anh:{

  },
  bigtext:{

  },
  text1:{

  }, 
  text2:{

  }
})