import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

type Props = {
  visible: boolean;
  onDismiss: () => void;
  onImageSelected: (uri: string) => void;
};

export default function ImagePickerModal({ visible, onDismiss, onImageSelected }: Props) {
  const pickFromLibrary = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) {
      alert('Bạn cần cấp quyền truy cập ảnh');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled) {
      onImageSelected(result.assets[0].uri);
      onDismiss();
    }
  };

  const takePhoto = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (!granted) {
      alert('Bạn cần cấp quyền camera');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      quality: 1,
    });
    if (!result.canceled) {
      onImageSelected(result.assets[0].uri);
      onDismiss();
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onDismiss}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.modalView}>
          <Text style={styles.title}>Chọn ảnh</Text>
          <TouchableOpacity style={styles.option} onPress={pickFromLibrary}>
            <Text style={styles.optionText}>Chọn từ thư viện</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={takePhoto}>
            <Text style={styles.optionText}>Chụp ảnh</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.option, styles.cancel]} onPress={onDismiss}>
            <Text style={[styles.optionText, { color: 'red' }]}>Hủy</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00000066',
    justifyContent: 'flex-end',
  },
  modalView: {
    backgroundColor: '#fff',
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    textAlign: 'center',
  },
  option: {
    paddingVertical: 15,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  optionText: {
    fontSize: 18,
    textAlign: 'center',
  },
  cancel: {
    borderBottomWidth: 0,
    marginTop: 10,
  },
});
