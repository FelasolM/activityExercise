import React, { useState } from "react";
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from "react-native";

export default function CrudApp() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAdd = () => {
    if (input.trim() === "") return;
    if (editingIndex !== null) {
      const updatedItems = [...items];
      updatedItems[editingIndex] = input;
      setItems(updatedItems);
      setEditingIndex(null);
    } else {
      setItems([...items, input]);
    }
    setInput("");
  };

  const handleEdit = (index) => {
    setInput(items[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CRUD</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Enter item"
        />
        <Button title={editingIndex !== null ? "Update" : "Add"} onPress={handleAdd} />
      </View>
      <FlatList
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.item}>
            <Text>{item}</Text>
            <View style={styles.buttons}>
              <TouchableOpacity onPress={() => handleEdit(index)} style={styles.editButton}>
                <Text>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(index)} style={styles.deleteButton}>
                <Text>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
  },
  buttons: {
    flexDirection: "row",
  },
  editButton: {
    marginRight: 10,
    padding: 5,
    backgroundColor: "lightblue",
    borderRadius: 5,
  },
  deleteButton: {
    padding: 5,
    backgroundColor: "red",
    borderRadius: 5,
  },
});
