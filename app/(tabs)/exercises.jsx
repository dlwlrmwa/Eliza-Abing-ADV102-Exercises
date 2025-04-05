import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Animated
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import HTMLView from "react-native-htmlview";
import { useNavigation } from "@react-navigation/native";

export default function Exercise() {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const animation = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  const exercises = [
    {
      title: "Exercise 3",
      description:
        "Create login screen \nLogin screen fields:\n<ul><li>Email</li><li>Password</li></ul>",
      route: "login",
      buttonText: "Login Now",
    },
    {
      title: "Exercise 4",
      description:
        "Using the useState and useEffect hooks, create a stopwatch with two buttons: one for Start/Stop and one for Reset.",
      route: "stopwatch",
      buttonText: "Stopwatch",
    },
    {
      title: "Exercise 5",
      description:
        "Create register screen<br/>Register screen fields:\n\n<ul><li>Image: Allows user to select image</li><li>Name</li><li>Email</li><li>Password</li></ul>",
      route: "register",
      buttonText: "Register an Account",
    },
    {
      title: "Exercise 6",
      description: "Simple CRUD using useContext and useReducer",
      route: "crud",
      buttonText: "Note App",
    },

    { 
      title: "Exercise 7", 
      description: "Create a simple quiz using the Open Trivia Database API. \nThe user should be able to input the number of questions they want to answer, with a minimum of 10 and a maximum of 30. \nThe UI will also be considered in grading this exercise. After completing the quiz, the user's score should be displayed as score/total questions.",
      route: "quiz", // Add a route for the quiz screen
      buttonText: "Try Quiz"
    },
    { title: "Exercise 8", description: "Sample description rendered HTML 8" },
    { title: "Exercise 9", description: "Sample description rendered HTML 9" },
    { title: "Exercise 10", description: "Sample description rendered HTML 10" },
  ];

  const toggleExpand = (index) => {
    if (expandedIndex === index) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false
      }).start(() => setExpandedIndex(null));
    } else {
      setExpandedIndex(index);
      Animated.timing(animation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false
      }).start();
    }
  };

  const handleNavigation = (route) => {
    if (route) {
      navigation.navigate(route);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Exercises</Text>
      {exercises.map((exercise, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => toggleExpand(index)}
          activeOpacity={0.9}
          style={styles.card}
        >
          <LinearGradient
            colors={expandedIndex === index ? ['#FFC1E3', '#FFB6C1'] : ['#FFFFFF', '#F1F1F1']}
            style={styles.gradient}
          >
            <Text style={styles.title}>{exercise.title}</Text>

            {expandedIndex === index && (
              <Animated.View style={[styles.descriptionContainer, { opacity: animation }]}>
                <HTMLView value={exercise.description} stylesheet={htmlStyles} />

                {exercise.route && (
                  <TouchableOpacity
                    onPress={() => handleNavigation(exercise.route)}
                    style={styles.navigateButton}
                  >
                    <Text style={styles.navigateButtonText}>
                      {exercise.buttonText}
                    </Text>
                  </TouchableOpacity>
                )}
              </Animated.View>
            )}
          </LinearGradient>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "rgba(206, 36, 240, 0.6)", // Semi-transparent Purple background
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000', // Black shadow for depth effect
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  gradient: {
    padding: 15,
    borderRadius: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  descriptionContainer: {
    marginTop: 8,
  },
  navigateButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#D6336C", // Deep pink button
    borderRadius: 8,
    alignItems: 'center'
  },
  navigateButtonText: {
    color: '#fff', // White text for contrast on blue button
    fontSize: 16,
    fontWeight: '600'
  }
});

const htmlStyles = StyleSheet.create({
  p: {
    fontSize: 16,
    color: '#333', // Dark Gray text for readability
    lineHeight: 22,
  },
  ul: {
    marginTop: 5,
    marginBottom: 5,
    paddingLeft: 20,
  },
  li: {
    fontSize: 14,
    color: '#000',
  },
});
