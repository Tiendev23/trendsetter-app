import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView, } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import CustomDirectionButton from '../../../components/buttons/ChevronButton';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');


  const isValidEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <CustomDirectionButton direction="back" onPress={() => navigation.goBack()} />
      </View>
      <ScrollView>

        <View style={styles.inputGroup}>
          <View style={styles.container_content}>
            <Text style={styles.txttitle}>Quên mật khẩu</Text>
            <Text style={styles.txtsub}>nhập email của bạn để khôi phục mật khẩu</Text>
          </View>
          <View style={styles.labelRow}>
            <Feather name="mail" size={18} color="black" />
            <Text style={styles.label}>Email</Text>
          </View>

          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Nhập email"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TouchableOpacity
            style={[styles.saveButton, !email && styles.disabledButton]}
            disabled={!email}
            onPress={() => {
              if (!isValidEmail(email)) {
                Alert.alert('Lỗi', 'Email không hợp lệ.');
                return;
              }
              navigation.navigate("VerifyOtp", { email });
            }}
          >
            <Text style={styles.saveText}>Tiếp theo</Text>
          </TouchableOpacity>
        </View>


      </ScrollView>
    </View>

  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  container_content: {
    marginTop: 10,
    marginBottom: 33,

  },
  txttitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 14,
  },
  txtsub: {
    fontSize: 16,
    color: '#989898'
  },
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
  }
  ,
  inputGroup: {
    margin: 20,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  label: {
    marginLeft: 8,
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    fontSize: 18,
    height: 57,
    width: 376
  },
  saveButton: {
    backgroundColor: '#006340',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 25,
  },
  disabledButton: {
    opacity: 0.4
  },
  saveText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  otpcontainer: {
    flexDirection: 'row',
    gap: 10, // hoặc marginRight trong từng ô nếu không dùng gap
    justifyContent: 'center',
    marginVertical: 24,
  },
  inputotp: {
    width: 48,
    height: 58,
    borderWidth: 1.5,
    borderColor: '#ccc',
    borderRadius: 12,
    textAlign: 'center',
    fontSize: 20,
    backgroundColor: '#fff',
  },

});
