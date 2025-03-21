import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Quiz({ navigation }) {
  const [numQuestions, setNumQuestions] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(10);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    let interval;
    if (isQuizStarted && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0) {
      handleNextQuestion();
    }
    return () => clearInterval(interval);
  }, [isQuizStarted, timer]);

  const fetchQuestions = async () => {
    const num = parseInt(numQuestions);
    if (isNaN(num) || num < 10 || num > 30) {
      setError("Please enter a number between 10 and 30.");
      return;
    }
    setError("");
    setLoading(true); 
    try {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=${num}&type=multiple`
        
      );
      const data = await response.json();
      setQuestions(data.results);
      setScore(0);
      setCurrentQuestion(0);
      setShowScore(false);
      setIsQuizStarted(true);
      setTimer(10);
    } catch (error) {
      console.error("Error fetching questions:", error);
      setError("Failed to fetch questions. Please check your connection and try again."); //Set error message
    } finally {
      setLoading(false); 
    }
  };

  const handleNextQuestion = () => {
    if (!selectedAnswer && isQuizStarted) { 
      Alert.alert("Please select an answer", "You must select an answer before proceeding.");
      return;
    }

    if (selectedAnswer) {
      if (selectedAnswer === questions[currentQuestion]?.correct_answer) {
        setScore((prev) => prev + 1);
      }
      setSelectedAnswer(null);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setTimer(10);
    } else {
      setShowScore(true);
    }
  };

  const getAnswerLetter = (index) => {
    switch (index) {
      case 0: return 'A';
      case 1: return 'B';
      case 2: return 'C';
      case 3: return 'D';
      default: return '';
    }
  };

  return (
    <LinearGradient colors={["#E890E8", "#FFE4F3", "#E890E8"]} style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("(tabs)", { screen: "exercises" })}>
        <LinearGradient colors={["#D6336C", "#D6336C"]} style={styles.buttonGradient}>
          <Text style={styles.buttonText}>Return</Text>
        </LinearGradient>
      </TouchableOpacity>

      {!isQuizStarted ? (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Enter Number of Questions (10-30)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={numQuestions}
            onChangeText={(text) => setNumQuestions(text)}
          />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <TouchableOpacity style={styles.button} onPress={fetchQuestions}>
            <Text style={styles.buttonText}>Start Quiz</Text>
          </TouchableOpacity>
        </View>
      ) : showScore ? (
        <View style={styles.resultContainer}>
          <Text style={styles.scoreText}>Your Score: {score} / {questions.length}</Text>
          <TouchableOpacity style={styles.button} onPress={() => setIsQuizStarted(false)}>
            <Text style={styles.buttonText}>Restart</Text>
          </TouchableOpacity>
        </View>
      ) : loading ? ( // Show loading indicator
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#D6336C" />
          <Text style={styles.loadingText}>Loading Questions...</Text> {/* Add loading text */}
        </View>
      ) : (
        <View style={styles.quizContainer}>
          <Text style={styles.timer}>Time Left: {timer}s</Text>
          <View style={styles.questionBox}>
            <Text style={styles.questionText}>{currentQuestion + 1}. {questions[currentQuestion]?.question}</Text>
          </View>
          {questions[currentQuestion]?.incorrect_answers.concat(questions[currentQuestion]?.correct_answer).sort().map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.option, selectedAnswer === option && styles.selectedOption]}
              onPress={() => setSelectedAnswer(option)}
            >
              <Text style={styles.optionText}>
                {getAnswerLetter(index)}. {option}
                </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.navButton} onPress={handleNextQuestion}>
            <Text style={styles.buttonText}>{currentQuestion === questions.length - 1 ? "Finish" : "Next"}</Text>
          </TouchableOpacity>
        </View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#E890E8",
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
  inputContainer: {
    alignItems: "center",
    backgroundColor: "#FFE4F3",
    padding: 20,
    borderRadius: 15,
    width: "90%",
    maxWidth: 800,
  },
  label: {
    fontSize: 20,
    color: "#D6336C",
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 12,
    width: "80%",
    maxWidth: 300,
    textAlign: "center",
    fontSize: 18,
    color: "#333",
    borderColor: "#D6336C",
    borderWidth: 1,
  },
  button: {
    backgroundColor: "#D6336C",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
    shadowColor: "#D6336C",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    width: 'auto',
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  quizContainer: {
    alignItems: "center",
    width: "90%",
    maxWidth: 800,
    backgroundColor: "#FFE4F3",
    padding: 20,
    borderRadius: 15,
  },
  timer: {
    fontSize: 18,
    color: "#D6336C",
    fontWeight: "bold",
    marginLeft: "auto",
    marginBottom: 10,
  },
  questionBox: {
    backgroundColor: "#D6336C",
    padding: 20,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  questionText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  option: {
    backgroundColor: "#FFF",
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
    width: "90%",
    maxWidth: 400,
    alignItems: "flex-start",
    shadowColor: "#D6336C",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 2,
    borderColor: "#D6336C",
  },
  selectedOption: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#000",
  },
  navButton: {
    backgroundColor: "#8B0033",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: "center",
    width: "90%",
    maxWidth: 300,
    marginTop: 20,
    shadowColor: "#D6336C",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  scoreText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
    marginBottom: 20,
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
  loadingContainer: { // Style for loading indicator container
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: '#D6336C'
  }
});
