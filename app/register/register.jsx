import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageBackground,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";

export default function Register() {
  const router = useRouter();
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleRegister = () => {
    if (!name || !email || !password) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please fill in all fields.",
        position: "top",
        visibilityTime: 3000,
        autoHide: true,
      });
      return;
    }

    Toast.show({
      type: "success",
      text1: "Success",
      text2: "You have successfully registered!",
      position: "top",
      visibilityTime: 3000,
      autoHide: true,
    });
    resetForm();
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setImage(null);
  };

  return (
    <ImageBackground
      source={{ uri: "https://images.unsplash.com/photo-1542372147193-a7aca54189dd" }}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Back Button */}
          <TouchableOpacity style={styles.backButton} onPress={() => router.push("/exercises")}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Register</Text>

          {/* Image Picker */}
          <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
            {image ? (
              <Image source={{ uri: image }} style={styles.image} />
            ) : (
              <Text style={styles.imageText}>Select Image</Text>
            )}
          </TouchableOpacity>

          {/* Input Fields */}
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#D6336C"
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            placeholderTextColor="#D6336C"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="#D6336C"
          />

          {/* Register Button */}
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Toast />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(206, 36, 240, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "90%",
    maxWidth: 500, 
    padding: 25,
    backgroundColor: "#FFEFF3",
    borderRadius: 20,
    shadowColor: "#A45C74",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: 15,
    left: 15,
  },
  backText: {
    fontSize: 20,
    color: "#D6336C",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#D6336C",
    marginBottom: 20,
    textAlign: "center",
  },
  imagePicker: {
    width: 100, 
    height: 100,
    backgroundColor: "#FCE4EC",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    marginBottom: 20,
    borderWidth: 1.5, 
    borderColor: "#D6336C",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },
  imageText: {
    color: "#D6336C",
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#FFEFF3",
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1.5, 
    borderColor: "#D6336C",
    color: "#333",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#D6336C",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    width: "100%",
    marginTop: 10,
    shadowColor: "#D6336C",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
