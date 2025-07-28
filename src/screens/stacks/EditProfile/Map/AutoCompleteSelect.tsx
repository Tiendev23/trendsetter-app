import React, { useMemo, useState } from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

interface DataItem {
  name: string;
  code: number;
}

interface AutoCompleteSelectProps {
  label: string;
  data: DataItem[];
  onSelect: (item: DataItem | null) => void;
  selectedValue?: string;
  placeholder: string;
  disabled?: boolean;
  loading?: boolean;
}

const AutoCompleteSelect: React.FC<AutoCompleteSelectProps> = ({
  label,
  data,
  onSelect,
  selectedValue,
  placeholder,
  disabled = false,
  loading = false,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isListVisible, setListVisible] = useState(false);

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    return data.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, data]);

  if (selectedValue) {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <TouchableOpacity
          style={styles.selectedValueBox}
          onPress={() => onSelect(null)}
        >
          <Text style={styles.selectedValueText}>{selectedValue}</Text>
          <Text style={styles.clearText}>X</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, disabled && styles.disabledInput]}
        placeholder={disabled ? 'Vui lòng chọn cấp trên' : placeholder}
        value={searchTerm}
        onChangeText={setSearchTerm}
        selectionColor="#000"
        onFocus={() => setListVisible(true)}
        editable={!disabled}
      />
      {loading && <ActivityIndicator style={{ marginTop: 10 }} color="#888" />}

      {isListVisible && !disabled && (
        <FlatList
          style={styles.list}
          data={filteredData}
          keyExtractor={(item) => item.code.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                onSelect(item);
                setSearchTerm('');
                setListVisible(false);
              }}
            >
              <Text style={styles.itemText}>{item.name}</Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Không tìm thấy kết quả</Text>
          }
          nestedScrollEnabled
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#000',
  },
  disabledInput: {
    backgroundColor: '#f2f2f2',
    color: '#aaa',
  },
  list: {
    maxHeight: 200,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    backgroundColor: '#fff',
    marginTop: 4,
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemText: {
    fontSize: 16,
    color: '#000',
  },
  emptyText: {
    padding: 15,
    textAlign: 'center',
    color: '#aaa',
  },
  selectedValueBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#f5f5f5',
  },
  selectedValueText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  clearText: {
    fontSize: 16,
    color: '#888',
    marginLeft: 10,
  },
});

export default AutoCompleteSelect;
