import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import useAuthStore from "../../store/authStore";
import useGroupStore from "../../store/groupStore";
import useSocketStore from "../../store/socketStore";

export default function GroupMapScreen() {
  const { user } = useAuthStore();
  const { group } = useGroupStore();
  const { sendLocationToAllGroups, socket } = useSocketStore();

  const [location, setLocation] = useState(null);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    let locationWatcher;

    const startTracking = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      console.log("Location permission status:", status);

      if (status !== "granted") {
        alert("Permission denied for location.");
        return;
      }

      locationWatcher = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 10,
        },
        (loc) => {
          const { latitude, longitude } = loc.coords;
          console.log("Got location:", latitude, longitude);
          setLocation({ lat: latitude, lon: longitude });

          sendLocationToAllGroups(user.id, latitude, longitude, user.groups);   
        }
      );
    };

    console.log("user: ", user);
    console.log("group: ", group);

    if (user?.id && group?.id) {
      startTracking();
    }

    return () => {
      if (locationWatcher) locationWatcher.remove();
    };
  }, [user, group]);

  useEffect(() => {
    if (group?.members) {
      const initialized = group.members.map((m) => ({
        userId: m.id,
        username: m.username,
        lat: m.lastLocation.lat,
        lon: m.lastLocation.lon,
        timestamp: m.lastLocation.timestamp,
      }));
      setMembers(initialized);
    }
  }, [group]);

  useEffect(() => {
    const listener = ({ userId, lat, lon, timestamp }) => {
      setMembers((prev) =>
        prev.map((m) => (m.userId === userId ? { ...m, lat, lon, timestamp } : m))
      );
    };

    socket.on("locationBroadcast", listener);
    return () => socket.off("locationBroadcast", listener);
  }, [socket]);

  if (!location) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="blue" />
        <Text className="mt-2">Getting your location...</Text>
      </View>
    );
  }

  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: location.lat,
        longitude: location.lon,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    >
      {/* Your location */}
      <Marker
        coordinate={{ latitude: location.lat, longitude: location.lon }}
        title="You"
        pinColor="blue"
      />

      {/* Other members */}
      {members
        .filter((m) => m.userId !== user.id && m.lat && m.lon)
        .map((m) => (
          <Marker
            key={m.userId}
            coordinate={{ latitude: m.lat, longitude: m.lon }}
            title={m.username}
            pinColor="red"
          />
        ))}
    </MapView>
  );
}
