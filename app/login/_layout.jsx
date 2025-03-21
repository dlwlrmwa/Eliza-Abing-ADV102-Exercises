import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Dimensions } from "react-native";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get('window');

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please enter both email and password.",
        position: "top",
        visibilityTime: 3000,
        autoHide: true,
      });
      return;
    }

    if (email === "user@example.com" && password === "123456") {
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Login successful!",
        position: "top",
        visibilityTime: 3000,
        autoHide: true,
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Invalid email or password.",
        position: "top",
        visibilityTime: 3000,
        autoHide: true,
      });
    }
  };

  return (
    <ImageBackground
      source={{ uri: "https://images.unsplash.com/photo-1542372147193-a7aca54189dd" }}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Back Button */}
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>

          <Text style={styles.header}>Login</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#A45C74"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="#A45C74"
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>

          <Text style={styles.footerText}>Forgot Password? | Register</Text>
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
    width: '90%', // Use a percentage of the screen width
    maxWidth: 500, // But set a maximum width
    padding: 20,
    backgroundColor: "#FFF0F5",
    borderRadius: 25,
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
  header: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#D6336C",
    marginBottom: 25,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#FCE4EC",
    borderRadius: 15,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#D6336C",
    color: "#333",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#D6336C",
    padding: 15,
    borderRadius: 15,
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
  footerText: {
    marginTop: 20,
    fontSize: 14,
    color: "#D6336C",
    textAlign: "center",
  },
});
