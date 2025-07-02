import { useEffect } from 'react';
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import useAuthStore from "../store/authStore";
import { startBackgroundLocation } from '../../utils/startBackgroundLocations';

export default function HomeScreen() {
  const router = useRouter();
  const { logout } = useAuthStore();

  useEffect(()=>{
    const startBgFetching = async () => {
      await startBackgroundLocation();
    }
    startBgFetching();
  },[]);

  const handleLogout = async () => {
    await logout(); // removes token + sets user null
    console.log("reached");
    router.replace("/auth/LoginScreen"); // just to be safe
  };

  return (
    <View className="flex-1 bg-white px-6 justify-center items-center">
      
      {/* Logout Button (Top Right) */}
      <TouchableOpacity
        className="absolute top-12 right-6 bg-red-500 px-4 py-2 rounded-lg"
        onPress={handleLogout}
      >
        <Text className="text-white font-semibold">Logout</Text>
      </TouchableOpacity>

      <Text className="text-3xl font-bold text-blue-700 mb-10">
        Welcome 👋
      </Text>

      <TouchableOpacity
        className="bg-blue-600 w-full py-4 rounded-xl mb-4"
        onPress={() => router.push("/groups/GroupScreen")}
      >
        <Text className="text-white text-center text-lg font-semibold">
          My Groups
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-green-600 w-full py-4 rounded-xl mb-4"
        onPress={() => router.push("/groups/create")}
      >
        <Text className="text-white text-center text-lg font-semibold">
          Create Group
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-yellow-500 w-full py-4 rounded-xl"
        onPress={() => router.push("/groups/join")}
      >
        <Text className="text-white text-center text-lg font-semibold">
          Join Group
        </Text>
      </TouchableOpacity>
    </View>
  );
}
