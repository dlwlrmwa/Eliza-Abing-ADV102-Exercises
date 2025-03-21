import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function StopwatchScreen() {
  const router = useRouter();
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => setTime((prevTime) => prevTime + 10), 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  const formatTime = () => {
    const minutes = String(Math.floor(time / 60000)).padStart(2, "0");
    const seconds = String(Math.floor((time % 60000) / 1000)).padStart(2, "0");
    const milliseconds = String((time % 1000) / 10).padStart(2, "0");
    return `${minutes}:${seconds}:${milliseconds}`;
  };

  return (
    <LinearGradient colors={["#E890E8", "#FFE4F3", "#E890E8"]} style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => router.push("/exercises")} style={styles.backButton}>
        <LinearGradient colors={["#D6336C", "#D6336C"]} style={styles.buttonGradient}>
          <Text style={styles.buttonText}>Return</Text>
        </LinearGradient>
      </TouchableOpacity>

      <Text style={styles.timer}>{formatTime()}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => setRunning(!running)}>
          <LinearGradient colors={running ? ["#8B0033", "#D6336C"] : ["#D6336C", "#8B0033"]} style={styles.button}>
            <Text style={styles.buttonText}>{running ? "Stop" : "Start"}</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          setTime(0);
          setRunning(false);
        }}>
          <LinearGradient colors={["#8B0033", "#D6336C"]} style={styles.button}>
            <Text style={styles.buttonText}>Reset</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E890E8", // Background from Quiz
  },
  timer: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#8B0033", // Darker text
    marginBottom: 20,
    marginTop: 60,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 15,
  },
  button: {
    paddingVertical: 18,
    paddingHorizontal: 30,
    borderRadius: 8, // Slightly less rounded
    alignItems: "center",
    width: 160,
    shadowColor: "#D6336C", // Consistent shadow
    shadowOffset: { width: 0, height: 3 }, // Slightly different shadow
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 10,
  },
  buttonGradient: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center'
  },
});
