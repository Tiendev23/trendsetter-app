import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, } from 'react-native';

export default function NotificationScreen({ navigation }) {

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        <Text style={styles.title}>Want More?</Text>
        <Text style={styles.subtitle}>
          Login or sign up to get notifications about your orders and products you're following.
        </Text>
        <Image source={require('../../../assets/images/chart.png')} style={styles.image} />
        <View style={styles.button}>

          <TouchableOpacity style={styles.login} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.signup} onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signupText}>Sign Up</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </View>
  );
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
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    marginVertical: 35,
    justifyContent: 'space-around'
  },
  login: {
    borderWidth: 1,
    borderColor: '#006340',
    borderRadius: 10,
    width: 180,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontWeight: '600',
    color: '#006340',
  },
  signup: {
    backgroundColor: '#006340',
    borderRadius: 10,
    width: 180,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    color: 'white',
    fontWeight: '600',
  },
  image: {
    width: 'auto',
    height: 200,
    margin: -16
  }
});
