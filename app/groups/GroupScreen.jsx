import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import useGroupStore from "../store/groupStore";
import useAuthStore from "../store/authStore";

export default function GroupScreen() {
  const router = useRouter();
  const { fetchUserGroups, groups } = useGroupStore();
  const { user } = useAuthStore();

  useEffect(() => {
    if (user?.id) {
      const fetchGroups = async () => {
        await fetchUserGroups({ userId: user.id });
      };
      fetchGroups();
    }
  }, [user]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      className="bg-blue-100 p-4 rounded-lg mb-3"
      onPress={() => router.push(`/groups/${item.id}`)}
    >
      <Text className="text-lg font-semibold text-blue-800">{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-white px-6 pt-10">
      <Text className="text-2xl font-bold text-blue-700 mb-5">Your Groups</Text>
      <FlatList
        data={groups}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}
