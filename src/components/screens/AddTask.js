import React, { useContext, useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import {
  Button,
  Modal,
  Portal,
  Text,
  TextInput,
  Title,
} from "react-native-paper";
import { Context as ProjectContext } from "../../providers/ProjectContext";
import { Context as AuthContext } from "../../providers/AuthContext";

function AddTask({ navigation }) {
  const { state, addTask } = useContext(ProjectContext);
  const { state: authState } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");


  const deleteTask = async () => {
    const dbRef = firebase.db.collection("projects").doc(timestamp);
    await dbRef.delete();
  };

  const tDelete = () => {
    Alert.alert(
      "Taskily App",
      "Are you sure you want to permanently this task?",
      [
        {
          text: "Ok",
          onPress: () => {
            deleteTask(), navigation.navigate("AddTask");
          },
        },
        {
          text: "Cancel",
          onPress: () => {
            navigation.navigate("AddTask");
          },
        },
      ]
    );
  };

  // TODO: Agregar la tarea al proyecto
  const handleAddTask = () => {
    addTask(
      state.currentProject.id,
      authState.user.id,
      name,
      description,
      Date.now()
    );
    setShowModal(false);
  };

  const addTaskModal = () => (
    <Portal>
      <Modal visible={showModal} contentContainerStyle={styles.modal}>
        <TextInput
          placeholder="Task name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          placeholder="Task description"
          value={description}
          onChangeText={setDescription}
        />
        <Button onPress={handleAddTask}>Save</Button>
      </Modal>
    </Portal>
  );

  return (
    <View style={styles.container}>
      <Title>{state.currentProject.title}</Title>
      <Button onPress={() => setShowModal(true)}>Add task</Button>
      <Button onPress={() => tDelete()}>Delete task</Button>
      {showModal && addTaskModal()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modal: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
});

export default AddTask;
