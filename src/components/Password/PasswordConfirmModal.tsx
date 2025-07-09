import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { login } from '../../redux/features/auth/loginSlice';
import CustomInput from '../CustomInput'; 
import { AuthContext } from '../../contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
  onForgotPassword: () => void;
}

const PasswordConfirmModal: React.FC<Props> = ({
  visible,
  onClose,
  onSuccess,
  onForgotPassword,
}) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();
  const { status, error: authError } = useAppSelector((state) => state.auth);
  const { user } = useContext(AuthContext);

  const email = user.email;
  const isLoading = status === 'loading';

  // Reset state khi modal được mở
  useEffect(() => {
    if (visible) {
      setPassword('');
      setError('');
    }
  }, [visible]);

  useEffect(() => {
    if (status === 'succeeded' && password) { 
      onSuccess();
    } else if (status === 'failed' && authError) {
      setError('Mật khẩu không đúng. Vui lòng thử lại.');
    }
  }, [status, authError]);

  const handleConfirm = () => {
    setError('');

    if (!password.trim()) {
      setError('Vui lòng nhập mật khẩu của bạn.');
      return;
    }
    if (!email) {
      Alert.alert('Lỗi nghiêm trọng', 'Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.');
      return;
    }
    dispatch(login({ emailOrUsername: email, password }));
  };
  

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.backdrop}
      >
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close-circle" size={28} color="#CACACA" />
          </TouchableOpacity>

          <View style={styles.iconContainer}>
            <Ionicons name="shield-checkmark-outline" size={40} color="#00796B" />
          </View>

          <Text style={styles.modalTitle}>Xác nhận danh tính</Text>
          <Text style={styles.modalSubtitle}>
            Để bảo vệ tài khoản, vui lòng nhập mật khẩu hiện tại của bạn để tiếp tục.
          </Text>

          <CustomInput
            placeholder="Mật khẩu của bạn"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (error) setError('');
            }}
            type="password"
           
          />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.secondaryButton} onPress={onClose} disabled={isLoading}>
              <Text style={styles.secondaryButtonText}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.primaryButton} onPress={handleConfirm} disabled={isLoading}>
              {isLoading ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <Text style={styles.primaryButtonText}>Xác nhận</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default PasswordConfirmModal;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxWidth: 350,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#E0F2F1', 
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A202C',
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 15,
    color: '#718096',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  errorText: {
    color: '#E53E3E',
    fontSize: 14,
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'center',
  },
  forgotText: {
    color: '#00796B',
    fontSize: 14,
    fontWeight: '600',
    marginVertical: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 40,
    gap: 10,
  },
  secondaryButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#F1F1F1',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#333',
    fontWeight: '600',
    fontSize: 16,
  },
  primaryButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#006340',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});