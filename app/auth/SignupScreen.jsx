import React, { useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import useAuthStore from "../store/authStore";

export default function SignupScreen() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup } = useAuthStore();

  const handleSubmit = async () => {
    const data = { username, email, password };
    console.log(data);
    await signup(data);
    const user = useAuthStore.getState().user;
    if (user) router.replace("/home");
  };

  return (
    <View className="flex-1 bg-white px-6 justify-center">
      <Text className="text-3xl font-bold text-center mb-8 text-blue-700">
        Create Account 🚀
      </Text>

      <View className="space-y-4">
        <Text className="text-gray-700 font-semibold">username</Text>
        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder="Your username"
          className="border border-gray-300 rounded-lg px-4 py-3 text-base"
        />

        <Text className="text-gray-700 font-semibold">Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="you@example.com"
          className="border border-gray-300 rounded-lg px-4 py-3 text-base"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text className="text-gray-700 font-semibold">Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Create a password"
          secureTextEntry
          className="border border-gray-300 rounded-lg px-4 py-3 text-base"
        />

        <TouchableOpacity
          className="bg-blue-600 py-3 rounded-lg mt-4"
          onPress={handleSubmit}
        >
          <Text className="text-white text-center font-semibold text-lg">
            Sign up
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => router.push("/auth/LoginScreen")}
        className="mt-6"
      >
        <Text className="text-center text-gray-600">
          Already have an account?{" "}
          <Text className="text-blue-600 font-semibold">Login</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}
