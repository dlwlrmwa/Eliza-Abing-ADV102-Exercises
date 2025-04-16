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
import { useForm, Controller } from "react-hook-form";
import { auth } from "@/firebaseConfig"; // Import Firebase auth
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Register() {
  const router = useRouter();
  const { handleSubmit, control, formState: { errors }, watch, reset } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  const [image, setImage] = useState(null);

  const password = watch("password"); // Watch the password field for confirmation validation

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

  const onSubmit = async (data) => {
    console.log("Registration Data:", data, "Image URI:", image);

    if (!image) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please select an image.",
        position: "top",
        visibilityTime: 3000,
        autoHide: true,
      });
      return;
    }

    try {
      // Create a new user in Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      console.log("User created:", userCredential.user);

      // Show success toast
      Toast.show({
        type: "success",
        text1: "Registration Successful",
        text2: "You may now proceed to the login page.",
        position: "top",
        visibilityTime: 5000,
        autoHide: true,
      });

      // Reset form fields and image
      reset();
      setImage(null);

      // Optionally delay navigation to allow the user to see the toast
      setTimeout(() => {
        console.log("User can now navigate to the login page.");
      }, 5000);
    } catch (error) {
      console.error("Error during registration:", error);
      Toast.show({
        type: "error",
        text1: "Registration Failed",
        text2: error.message,
        position: "top",
        visibilityTime: 3000,
        autoHide: true,
      });
    }
  };

  const goToLogin = () => {
    router.push('/login');
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
          {errors.image && <Text style={styles.errorText}>{errors.image.message}</Text>}

          {/* Input Fields */}
          <Controller
            name="name"
            control={control}
            rules={{ required: 'Name is required' }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Name"
                value={value}
                onChangeText={onChange}
                placeholderTextColor="#D6336C"
              />
            )}
          />
          {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}

          <Controller
            name="email"
            control={control}
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email format',
              },
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                value={value}
                onChangeText={onChange}
                autoCapitalize="none"
                placeholderTextColor="#D6336C"
              />
            )}
          />
          {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

          <Controller
            name="password"
            control={control}
            rules={{
              required: 'Password is required',
              minLength: { value: 6, message: 'Password must be at least 6 characters' },
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={value}
                onChangeText={onChange}
                placeholderTextColor="#D6336C"
              />
            )}
          />
          {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

          <Controller
            name="confirmPassword"
            control={control}
            rules={{
              required: 'Confirm Password is required',
              validate: value =>
                value === password || "Passwords do not match",
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                secureTextEntry
                value={value}
                onChangeText={onChange}
                placeholderTextColor="#D6336C"
              />
            )}
          />
          {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>}

          {/* Register Button */}
          <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>

          {/* Go to Login */}
          <TouchableOpacity onPress={goToLogin} style={styles.goToLoginButton}>
            <Text style={styles.goToLoginText}>Already have an account? | <Text style={{ fontWeight: 'bold' }}>Login  </Text></Text>
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
    marginBottom: 10, 
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
    marginBottom: 5, 
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
  errorText: {
    color: 'red',
    marginBottom: 5, 
  },
  goToLoginButton: {
    marginTop: 15,
  },
  goToLoginText: {
    color: "#D6336C",
    fontSize: 16,
  },
});