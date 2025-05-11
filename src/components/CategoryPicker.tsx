import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Modal, StyleSheet } from 'react-native';
import Icon from './Icon';



interface Props {
  categories: { label: string; value: string }[];
  selectedCategory: string | null;
  onSelect: (value: string) => void;
}

const CategoryPicker: React.FC<Props> = ({ categories, selectedCategory, onSelect }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const selected = categories.find((cat) => cat.value === selectedCategory) || categories[0];

  return (
    <View style={{ flex: 0.2 }}>
      <TouchableOpacity
        style={styles.selector}
        onPress={() => setModalVisible(true)}
      >
        {selected ? (
          <Icon name={selected.value} size={24} color="#1c6888" />
        ) : (
          <Text style={{ color: '#aaa' }}>Select</Text>
        )}
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={categories}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => {
                    onSelect(item.value);
                    setModalVisible(false);
                  }}
                >
                  <Icon name={item.value} size={24} color="#1c6888" />
                  <Text style={styles.label}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelBtn}>
              <Text style={{ color: 'white' }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CategoryPicker;

const styles = StyleSheet.create({
  selector: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  selectedLabel: {
    fontSize: 16,
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#00000088',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 10,
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  cancelBtn: {
    marginTop: 20,
    backgroundColor: '#1c6888',
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
});
