import React, { useReducer, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

const initialState = { notes: [] };

function noteReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return {
        notes: [
          ...state.notes,
          { id: Date.now(), title: action.payload.title, content: action.payload.content },
        ],
      };
    case "UPDATE":
      return {
        notes: state.notes.map((note) =>
          note.id === action.payload.id
            ? { ...note, title: action.payload.title, content: action.payload.content }
            : note
        ),
      };
    case "DELETE":
      return { notes: state.notes.filter((note) => note.id !== action.payload) };
    default:
      return state;
  }
}

export default function NoteApp() {
  const router = useRouter();
  const [state, dispatch] = useReducer(noteReducer, initialState);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleAddNote = () => {
    if (title.trim() === "" || content.trim() === "") return;

    dispatch({ type: "ADD", payload: { title, content } });

    setTitle("");
    setContent("");
  };

  const handleUpdateNote = () => {
    if (title.trim() === "" || content.trim() === "") return;

    dispatch({
      type: "UPDATE",
      payload: { id: selectedNote.id, title, content },
    });

    setIsEditing(false);
    setIsModalVisible(false);
  };

  const handleOpenNote = (note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
    setIsEditing(false);
    setIsModalVisible(true);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.overlay}>
        <TouchableOpacity
          onPress={() => router.push("/exercises")}
          style={styles.backButton}
        >
          <LinearGradient colors={["#D6336C", "#D6336C"]} style={styles.button}>
            <Text style={styles.buttonText}>Return</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.mainContainer}>
          <View style={styles.inputSection}>
            <Text style={styles.header}>📒 Note App</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.titleInput}
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
                placeholderTextColor="#A45C74"
              />
              <TextInput
                style={styles.contentInput}
                placeholder="Write your note..."
                value={content}
                onChangeText={setContent}
                multiline
                placeholderTextColor="#A45C74"
              />
              <TouchableOpacity style={styles.addButton} onPress={handleAddNote}>
                <Text style={styles.buttonText}>+ Add Note</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.notesSection}>
            <FlatList
              data={state.notes}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.noteBox} onPress={() => handleOpenNote(item)}>
                  <Text style={styles.noteTitle}>{item.title}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>

        <Modal visible={isModalVisible} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {isEditing ? (
                <>
                  <TextInput style={styles.titleInput} value={title} onChangeText={setTitle} />
                  <TextInput style={styles.contentInput} value={content} onChangeText={setContent} multiline />
                  <TouchableOpacity onPress={handleUpdateNote} style={styles.saveButton}>
                    <Text style={[styles.buttonText, { textAlign: "center" }]}>Save</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <Text style={styles.modalTitle}>{selectedNote?.title}</Text>
                  <View style={styles.modalScrollView}>
                    <Text style={styles.modalText}>{selectedNote?.content}</Text>
                  </View>
                </>
              )}
              <View style={styles.buttonRow}>
                {!isEditing && (
                  <TouchableOpacity onPress={() => setIsEditing(true)} style={styles.editButton}>
                    <Text style={styles.buttonText}>Edit</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  onPress={() => {
                    dispatch({ type: "DELETE", payload: selectedNote.id });
                    setIsModalVisible(false);
                  }}
                  style={styles.deleteButton}
                >
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsModalVisible(false)} style={styles.closeButton}>
                  <Text style={styles.buttonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "#E890E8",
    justifyContent: "center",
    alignItems: "center",
  },
  mainContainer: {
    flexDirection: "row",
    width: "90%",
    maxWidth: 800,
    backgroundColor: "#FFE4F3",
    borderRadius: 15,
    shadowColor: "#D6336C",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    padding: 20,
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 1,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  inputSection: {
    flex: 1,
    paddingRight: 10,
  },
  notesSection: {
    flex: 1,
    paddingLeft: 10,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#D6336C",
    marginBottom: 15,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 15,
  },
  titleInput: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    fontSize: 18,
    borderWidth: 1,
    borderColor: "#D6336C",
  },
  contentInput: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 12,
    fontSize: 18,
    minHeight: 100,
    borderWidth: 1,
    borderColor: "#D6336C",
  },
  addButton: {
    backgroundColor: "#D6336C",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  noteBox: {
    backgroundColor: "#FFC1E3",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#8B0033",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    maxWidth: 400,
  },
  saveButton: {
    backgroundColor: "#D6336C",
    padding: 10,
    borderRadius: 6,
    marginTop: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  editButton: {
    backgroundColor: "#D6336C",
    padding: 10,
    borderRadius: 6,
    flex: 1,
    alignItems: "center",
    marginRight: 5,
  },
  deleteButton: {
    backgroundColor: "#F44336",
    padding: 10,
    borderRadius: 6,
    flex: 1,
    alignItems: "center",
    marginHorizontal: 5,
  },
  closeButton: {
    backgroundColor: "#8B0033",
    padding: 10,
    borderRadius: 6,
    flex: 1,
    alignItems: "center",
    marginLeft: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#D6336C",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    color: "#555",
  },
  modalScrollView: {
    maxHeight: 200,
    overflowY: 'auto',
  },
});
