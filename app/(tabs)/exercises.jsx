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
import Icon from "react-native-vector-icons/MaterialIcons"; // Import the icon library

export default function Exercise() {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const animation = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  const exercises = [
    {
      title: "Exercise 3",
      description:
        "<b>Create login screen</b> \nLogin screen fields:\n<ul><li>Email</li><li>Password</li></ul>",
      route: "login",
      buttonText: "Login Now",
      icon: "login", // Icon name
    },
    {
      title: "Exercise 4",
      description:
        "Using the useState and useEffect hooks, create a stopwatch with two buttons: one for Start/Stop and one for Reset.",
      route: "stopwatch",
      buttonText: "Stopwatch",
      icon: "timer", // Icon name
    },
    {
      title: "Exercise 5",
      description:
        "<b>Create Register screen</b><br/>Register screen fields:\n<ul><li>Image: Allows user to select image</li><li>Name</li><li>Email</li><li>Password</li></ul>",
      route: "register",
      buttonText: "Register an Account",
      icon: "person-add", // Icon name
    },
    {
      title: "Exercise 6",
      description: "Simple CRUD using useContext and useReducer",
      route: "crud",
      buttonText: "Note App",
      icon: "edit", // Icon name
    },
    {
      title: "Exercise 7",
      description: "Create a simple quiz using the Open Trivia Database API. \nThe user should be able to input the number of questions they want to answer, with a minimum of 10 and a maximum of 30. \nThe UI will also be considered in grading this exercise. After completing the quiz, the user's score should be displayed as score/total questions.",
      route: "quiz",
      buttonText: "Try Quiz",
      icon: "quiz", // Icon name
    },
    {
      title: "Exercise 8",
      description: "<b>(Exercise 3 & 5)</b> \nContinuation\nUsing React Hook Form, add appropriate validations for the registration and login page.",
      route: null,
      buttonText: null,
      buttons: [
        { text: "Login", route: "login" },
        { text: "Register", route: "register" }
      ],
      icon: "check-circle", // Icon name
    },
    {
      title: "Exercise 9",
      description: "<b>(Exercise 3 & 5)</b> \nContinuation\nConnect your React Native app to Firebase. \nOn the registration and login pages, integrate Firebase Authentication and use Firebase Storage to allow users to upload a profile image during registration.",
      route: null,
      buttonText: null,
      buttons: [
        { text: "Login", route: "login" },
        { text: "Register", route: "register" }
      ],
      icon: "cloud", // Icon name
    },
    {
      title: "Exercise 10",
      description: "Sample description rendered HTML 10",
      icon: "info", // Icon name
    },
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
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
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
              <View style={styles.cardHeader}>
                <Icon name={exercise.icon} size={30} color="#D6336C" style={styles.icon} />
                <Text style={styles.title}>{exercise.title}</Text>
              </View>

              {expandedIndex === index && (
                <Animated.View style={[styles.descriptionContainer, { opacity: animation }]}>
                  <HTMLView value={exercise.description} stylesheet={htmlStyles} />

                  {exercise.buttons ? (
                    <View style={styles.buttonRow}>
                      {exercise.buttons.map((button, idx) => (
                        <TouchableOpacity
                          key={idx}
                          onPress={() => handleNavigation(button.route)}
                          style={styles.sideBySideButton}
                        >
                          <Text style={styles.navigateButtonText}>{button.text}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  ) : (
                    exercise.route && (
                      <TouchableOpacity
                        onPress={() => handleNavigation(exercise.route)}
                        style={styles.navigateButton}
                      >
                        <Text style={styles.navigateButtonText}>{exercise.buttonText}</Text>
                      </TouchableOpacity>
                    )
                  )}
                </Animated.View>
              )}
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "rgba(206, 36, 240, 0.6)", // Full screen background
  },
  container: {
    padding: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  gradient: {
    padding: 27,
    borderRadius: 12,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: '700',
  },
  descriptionContainer: {
    marginTop: 8,
  },
  navigateButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#D6336C",
    borderRadius: 8,
    alignItems: 'center'
  },
  navigateButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600'
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  sideBySideButton: {
    flex: 1,
    marginHorizontal: 5,
    padding: 10,
    backgroundColor: "#D6336C",
    borderRadius: 8,
    alignItems: 'center',
  },
});

const htmlStyles = StyleSheet.create({
  p: {
    fontSize: 18,
    color: '#333', 
    lineHeight: 24,
  },
  b: {
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#000', 
  },
  ul: {
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 20, 
  },
  li: {
    fontSize: 14, 
    color: '#000', 
  },
});
