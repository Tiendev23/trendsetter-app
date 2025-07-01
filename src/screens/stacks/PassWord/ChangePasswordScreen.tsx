import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Backnav from '../../../components/Tabbar/Backnav';
import CustomInput from '../../../components/CustomInput';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { AuthContext } from '../../../contexts/AuthContext';
import { changePass } from '../../../redux/features/auth/ChangePassword';

export default function ChangePasswordScreen({ navigation }) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useAppDispatch();

  const { user } = useContext(AuthContext);
  const { status, error } = useAppSelector((state) => state.changePass);

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Lỗi', 'Mật khẩu xác nhận không khớp.');
      return;
    }

    if (!user?._id) {
      Alert.alert('Lỗi', 'Không tìm thấy thông tin người dùng.');
      return;
    }

    dispatch(changePass({ _id: user._id, body: { password: newPassword } }));
  };

  useEffect(() => {
    if (status === 'succeeded') {
      Alert.alert('Thành công', 'Mật khẩu của bạn đã được thay đổi.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    }

    if (status === 'failed') {
      Alert.alert('Lỗi', error || 'Đổi mật khẩu thất bại. Vui lòng thử lại!');
    }
  }, [status]);

  return (
    <View style={styles.container}>
      <Backnav navigation={navigation} />
      <ScrollView
        contentContainerStyle={styles.contentWrapper}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container_content}>
          <Text style={styles.txttitle}>Đặt lại mật khẩu</Text>
          <Text style={styles.txtsub}>
            Tạo mật khẩu mới. Đảm bảo mật khẩu này khác với mật khẩu trước đó để bảo mật
          </Text>
        </View>

        <View style={styles.inputGroup}>
          <View style={styles.labelRow}>
            <MaterialCommunityIcons name="lock-reset" size={20} color="#006340" />
            <Text style={styles.label}>Mật khẩu mới</Text>
          </View>
          <CustomInput
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="Nhập mật khẩu mới"
            type="password"
          />
        </View>

        <View style={styles.inputGroup}>
          <View style={styles.labelRow}>
            <MaterialCommunityIcons name="lock-check-outline" size={20} color="#006340" />
            <Text style={styles.label}>Xác nhận mật khẩu</Text>
          </View>
          <CustomInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Nhập lại mật khẩu mới"
            type="password"
          />
        </View>

        <TouchableOpacity
          style={[styles.saveButton, status === 'loading' && { opacity: 0.6 }]}
          onPress={handleChangePassword}
          disabled={status === 'loading'}
        >
          {status === 'loading' ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.saveText}>Đổi mật khẩu</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentWrapper: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#006340',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  label: {
    marginLeft: 8,
    color: '#333',
    fontSize: 15,
    fontWeight: '600',
  },

  codeButton: {
    marginTop: 8,
    alignSelf: 'flex-end',
  },
  codeButtonText: {
    color: '#006340',
    fontWeight: '600',
    fontSize: 14,
  },
  saveButton: {
    backgroundColor: '#006340',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  saveText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
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
    color: '#989898',
    lineHeight: 23
  },
});
