import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type Props = {
  title: string;
  onPress: () => void;
};

export default function CustomButton({ title, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#006340',
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginVertical: 10,
    width: '90%'
  },
  text: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});
