import * as Location from "expo-location";
import { LOCATION_TASK_NAME } from "./backgroundLocationTask";

export async function startBackgroundLocation() {
  const { status: fgStatus } = await Location.requestForegroundPermissionsAsync();
  if (fgStatus !== "granted") {
    alert("Location permission not granted");
    return;
  }

  const { status: bgStatus } = await Location.requestBackgroundPermissionsAsync();
  if (bgStatus !== "granted") {
    alert("Background location permission not granted");
    return;
  }

  await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
    accuracy: Location.Accuracy.High,
    timeInterval: 10000, // every 10s
    distanceInterval: 10, // or 10 meters
    showsBackgroundLocationIndicator: true,
    foregroundService: {
      notificationTitle: "Tracking You",
      notificationBody: "We’re tracking your location in background.",
      notificationColor: "#0000ff",
    },
  });

  console.log("✅ Background location started");
}
