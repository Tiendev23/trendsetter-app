import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CreditCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.cardNumber}>•••• •••• •••• 2345</Text>
      <View style={styles.cardInfo}>
        <View>
          <Text style={styles.label}>Card Holder name</Text>
          <Text style={styles.info}>Grace Sylvia John</Text>
        </View>
        <View>
          <Text style={styles.label}>Expiry Date</Text>
          <Text style={styles.info}>02/30</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 180,
    borderRadius: 16,
    backgroundColor: '#d94c95',
    padding: 20,
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  cardNumber: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '600',
  },
  cardInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    color: '#ddd',
    fontSize: 12,
  },
  info: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});
