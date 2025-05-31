import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import { AppContext } from '../contexts/AuthContext';

const Menubar = () => {
  const { selectedCategory, setSelectedCategory, listbrand } = useContext(AppContext);

  const renderItem = ({ item }) => {
    const isSelected = item.id === selectedCategory;

    return (
      <TouchableOpacity
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
      />
    </View>
  );
};

export default Menubar;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingLeft: 10,
  },
  menuItem: {
    backgroundColor: '#e0f7fa',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
  },
  selectedItem: {
    backgroundColor: '#00796b',
  },
  menuText: {
    fontSize: 16,
    color: '#00796b',
  },
  selectedText: {
    color: '#fff',
  },
});
