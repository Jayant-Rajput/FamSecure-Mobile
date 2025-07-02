import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import useAuthStore from "../store/authStore";
import useGroupStore from "../store/groupStore";

export default function CreateGroup() {
  const router = useRouter();
  const [name, setName] = useState("");
  const { user } = useAuthStore()
  const { createGroup } = useGroupStore();

  const handleSubmit = async () => {
    const data = { name, createdBy : user.user.id };
    await createGroup(data);
    await fetchUserFromToken();
    router.replace("/home");
  };

  return (
    <View className="flex-1 bg-white px-6 justify-center">
      <Text className="text-2xl font-bold mb-6 text-center text-blue-700">
        Create a Group
      </Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Enter group name"
        className="border border-gray-300 rounded-xl px-4 py-3 text-base mb-6"
      />
      <TouchableOpacity
        onPress={handleSubmit}
        className="bg-blue-600 py-3 rounded-xl"
      >
        <Text className="text-white text-center text-lg font-semibold">
          Create Group
        </Text>
      </TouchableOpacity>
    </View>
  );
}
