import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  cartItemCount: number;
  onPressCart: () => void;
};

export default function HeaderHome({ cartItemCount, onPressCart }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trendsetter</Text>
      <TouchableOpacity onPress={onPressCart} style={styles.cartIconContainer}>
        <Ionicons name="cart-outline" size={28} color="#000" />
        {cartItemCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{cartItemCount}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingHorizontal: 16,
    paddingBottom: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  cartIconContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -10,
    backgroundColor: 'red',
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 1,
    minWidth: 16,
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
});
