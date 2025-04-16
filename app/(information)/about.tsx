import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function About() {
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      {/* Main Content */}
      <View style={styles.container}>
        <Text style={styles.title}>Hello!</Text>
        <Text style={styles.description}>You have successfully logged in.</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.replace("/")}
        >
          <Text style={styles.buttonText}>Go to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 50,
    justifyContent: "center",
    paddingHorizontal: 10,
    backgroundColor: "#f9f9f9",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  backButton: {
    padding: 5,
  },
  backButtonText: {
    fontSize: 16,
    color: "#007BFF",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 45,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  description: {
    fontSize: 30,
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#D6336C",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
