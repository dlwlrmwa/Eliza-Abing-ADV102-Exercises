import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from "react-native";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";

const { width, height } = Dimensions.get('window');

export default function Login() {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data) => {
    console.log("Login Data:", data);
    if (data.email === "sofiagwapa@gmail.com" && data.password === "123456") {
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Login successful!",
        position: "top",
        visibilityTime: 3000,
        autoHide: true,
      });
      // In a real app, you would navigate to the main app screen here.
      // router.push("/home");
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

  const navigateToRegister = () => {
    router.push("/register"); // Navigate to the registration page
  };

  const navigateToForgotPassword = () => {
    //   Implement your forgot password navigation logic here
    //   For example:
    //   router.push("/forgot-password");
    console.log("Forgot Password pressed"); // Placeholder for now
    Toast.show({
      type: 'info',
      text1: 'Info',
      text2: 'Forgot Password functionality not implemented yet.',
      position: 'top',
      visibilityTime: 3000,
      autoHide: true,
    });
  };

  return (
    <ImageBackground
      source={{ uri: "https://images.unsplash.com/photo-1542372147193-a7aca54189dd" }}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>

          <Text style={styles.header}>Login</Text>

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
                value={value}
                onChangeText={onChange}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#A45C74"
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
                value={value}
                onChangeText={onChange}
                secureTextEntry
                placeholderTextColor="#A45C74"
              />
            )}
          />
          {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

          <TouchableOpacity onPress={navigateToForgotPassword} style={styles.forgotPasswordButton}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={navigateToRegister}>
            <Text style={styles.footerText}>
              Not registered? | <Text style={{ fontWeight: 'bold' }}>Create an account</Text>
            </Text>
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
    width: '90%',
    maxWidth: 500,
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
    marginBottom: 10,
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
    marginTop: 15,
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
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  forgotPasswordButton: {
    marginTop: 10,
    alignSelf: 'left',
  },
  forgotPasswordText: {
    color: '#D6336C',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});