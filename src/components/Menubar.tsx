import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import { AppContext } from '../contexts/AuthContext';

const Menubar = () => {
  const { selectedCategory, setSelectedCategory, listbrand } = useContext(AppContext);

  const renderItem = ({ item }) => {
    const isSelected = item.id === selectedCategory;

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.menuItem, isSelected && styles.selectedItem]}
        onPress={() => setSelectedCategory(item.id)}
      >
        <Text style={[styles.menuText, isSelected && styles.selectedText]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={listbrand}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ width: 15 }} />}

      />
    </View>
  );
};

export default Menubar;

const styles = StyleSheet.create({
  container: {
    height: 55,
    marginTop: 10,
    marginBottom: 5,
    // borderTopColor: '#ddd',
    // borderTopWidth: 1,
    // borderBottomColor: '#ddd',
    // borderBottomWidth: 1,
    paddingVertical: 5,
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#c1c1c1',
  },
  selectedItem: {
    backgroundColor: 'rgba(195, 185, 185, 0.2)',
    borderColor: 'rgba(133, 223, 6, 0.7)',

  },
  menuText: {
    fontSize: 18,
    color: '#555',
    fontWeight: '600',
    textShadowColor: 'rgba(255,255,255,0.7)', // tạo hiệu ứng sáng nhẹ cho chữ
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  selectedText: {
    color: 'white',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});
