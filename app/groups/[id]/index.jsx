import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";
import useGroupStore from "../../store/groupStore";

export default function GroupDetailScreen() {
  const { id } = useLocalSearchParams();
  const { group, fetchGroupDetail } = useGroupStore();
  const router = useRouter();

  useEffect(() => {
    const fetchGroup = async () => {
      console.log("UseEffect - index.jsx of group. and id : ", id);
      
      await fetchGroupDetail(id);
    };

    fetchGroup();
  }, [id]);

  const renderMember = ({ item }) => (
    <View className="bg-gray-100 p-3 rounded-lg mb-2">
      <Text className="text-gray-800 text-base font-medium">
        {item.username}
      </Text>
    </View>
  );

  if (!group) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-lg text-gray-700">Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white px-6 pt-10 pb-6">
      <Text className="text-2xl font-bold text-blue-700 mb-4">
        {group.name}
      </Text>
      <Text className="text-base text-gray-600 mb-2">
        Group Code: {group.code}
      </Text>

      <Text className="text-lg font-semibold mt-6 mb-3 text-gray-700">
        Members
      </Text>
      <FlatList
        data={group.members}
        keyExtractor={(item) => item.id}
        renderItem={renderMember}
        contentContainerStyle={{ paddingBottom: 100 }} // ensures scroll space
      />

      <TouchableOpacity
        className="bg-blue-600 py-4 rounded-xl mt-8"
        onPress={() => router.push(`/groups/${id}/GroupMapScreen`)}
      >
        <Text className="text-white text-center text-lg font-semibold">
          See Locations
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
