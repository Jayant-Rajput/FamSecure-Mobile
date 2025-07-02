import React, { useRef, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import useGroupStore from "../store/groupStore";
import useAuthStore from "../store/authStore";

export default function JoinGroupScreen() {

  const router = useRouter();

  const { joinGroup } = useGroupStore();
  const { user, fetchUserFromToken } = useAuthStore();

  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text.toUpperCase();
    setCode(newCode);

    if (text && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleSubmit = async () => {
    const groupCode = code.join("");
    if (groupCode.length !== 6) {
      Alert.alert("Invalid Code", "Please enter the full 6-character group code.");
      return;
    }

    const data = { userId: user.id, code: groupCode };
    await joinGroup(data);
    await fetchUserFromToken();
    router.replace("/home");
  };

  return (
    <View className="flex-1 justify-center items-center bg-white px-4">
      <Text className="text-2xl font-bold text-blue-600 mb-6">Enter Group Code</Text>

      <View className="flex-row space-x-3 mb-6">
        {code.map((char, idx) => (
          <TextInput
            key={idx}
            ref={(ref) => (inputs.current[idx] = ref)}
            value={char}
            onChangeText={(text) => handleChange(text, idx)}
            maxLength={1}
            keyboardType="default"
            autoCapitalize="characters"
            className="w-12 h-12 border border-gray-300 text-center rounded-md text-lg"
          />
        ))}
      </View>

      <TouchableOpacity
        className="bg-blue-600 px-6 py-3 rounded-lg"
        onPress={handleSubmit}
      >
        <Text className="text-white font-semibold text-lg">Join</Text>
      </TouchableOpacity>
    </View>
  );
}
