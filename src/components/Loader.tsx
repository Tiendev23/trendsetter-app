import React from 'react';
import { View, ActivityIndicator, StyleSheet, Modal } from 'react-native';

type Props = {
  visible: boolean;
};

export default function Loader({ visible }: Props) {
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#4caf50" />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000055',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
});
