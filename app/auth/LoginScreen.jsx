import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import useAuthStore from "../store/authStore";
import log from "../../utils/logger";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuthStore();

  const handleSubmit = async () => {
    const data = { email, password };
    log.info("loginscreen data ", data);
    await login(data);
    const user = useAuthStore.getState().user;

    if (user) router.replace("/home");
    else Alert.alert("Login Failed", "Invalid email or password");
  };

  return (
    <View className="flex-1 bg-white px-6 justify-center">
      <Text className="text-3xl font-bold text-center mb-8 text-blue-700">
        Welcome Back 👋
      </Text>

      <View className="space-y-4">
        <Text className="text-gray-700 font-semibold">Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          className="border border-gray-300 rounded-lg px-4 py-3 text-base"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text className="text-gray-700 font-semibold">Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          className="border border-gray-300 rounded-lg px-4 py-3 text-base"
          secureTextEntry
        />

        <TouchableOpacity
          className="bg-blue-600 py-3 rounded-lg mt-4"
          onPress={handleSubmit}
        >
          <Text className="text-white text-center font-semibold text-lg">
            Login
          </Text>
        </TouchableOpacity> 
      </View>

      <TouchableOpacity
        onPress={() => router.push("/auth/SignupScreen")}
        className="mt-6"
      > 
        <Text className="text-center text-gray-600">
          Don’t have an account?{" "}
          <Text className="text-blue-600 font-semibold">Sign up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}
