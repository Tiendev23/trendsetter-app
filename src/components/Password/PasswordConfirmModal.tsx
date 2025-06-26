import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { login } from '../../redux/features/auth/loginSlice';
import CustomInput from '../CustomInput';
import { AuthContext } from '../../contexts/AuthContext';

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
  const dispatch = useAppDispatch();
  const { data, status, error } = useAppSelector((state) => state.auth);
  const [submitted, setSubmitted] = useState(false);

  const { user } = useContext(AuthContext); // ✅ Lấy email từ user context
  const email = user?.email;

  const handleConfirm = () => {
    if (!password.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập mật khẩu');
      return;
    }

    if (!email) {
      Alert.alert('Lỗi', 'Không tìm thấy email của người dùng!');
      return;
    }

    dispatch(login({ emailOrUsername: email, password: password }));

    setSubmitted(true);
  };

  useEffect(() => {
    if (!submitted) return;

    if (status === 'succeeded') {
      setPassword('');
      setSubmitted(false);
      onClose();
      onSuccess();
    } else if (status === 'failed') {
      Alert.alert('Sai mật khẩu', 'Vui lòng thử lại!');
      setPassword('')

      setSubmitted(false);
    }
  }, [status]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Nhập mật khẩu hiện tại</Text>
          <CustomInput
            placeholder="Mật khẩu"
            value={password}
            onChangeText={setPassword}
            type="password"
          />
          {status === 'loading' ? (
            <ActivityIndicator color="#006340" />
          ) : (
            <View>
              <TouchableOpacity
                onPress={() => {
                  onClose();
                  onForgotPassword();
                }}
              >
                <Text style={styles.forgotText}>Quên mật khẩu?</Text>
              </TouchableOpacity>
              <View style={styles.modalActions}>
                <TouchableOpacity onPress={handleConfirm}>
                  <Text style={styles.confirmButton}>Xác nhận</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onClose}>
                  <Text style={styles.confirmButton}>Hủy</Text>
                </TouchableOpacity>

              </View>
            </View>

          )}
        </View>
      </View>
    </Modal>
  );
};

export default PasswordConfirmModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    position: 'static'

  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 40,

  },
  confirmButton: {
    backgroundColor: '#006340',
    color: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    fontWeight: '600',
  },
  forgotText: {
    color: '#006340',
    fontSize: 13,
    position: 'absolute',
    right: 0,
    top: 6
  },
});
