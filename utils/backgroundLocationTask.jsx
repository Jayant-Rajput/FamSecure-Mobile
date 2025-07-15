import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";
import { io } from "socket.io-client"; // Optional: only if using socket from here
import useSocketStore from "../app/store/socketStore";
import useAuthStore from "../app/store/authStore"
import useLocationStore from "../app/store/locationStore";

export const LOCATION_TASK_NAME = "background-location-task";

TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
  if (error) {
    console.error("📛 Background task error:", error);
    return;
  }

  const user = useAuthStore.getState().user;
  const sendLocationToAllGroups = useSocketStore.getState().sendLocationToAllGroups;
  const setLocation = useLocationStore.getState().setLocation;

  if (!user || !user.id || !user.groups) {
    console.warn("🚫 User not ready in background task");
    return;
  }
  
  if (data) {
    const { latitude, longitude } = data.locations[0].coords;
    console.log("📍 Background location:", latitude, longitude , "for user ", user.username);

    sendLocationToAllGroups(user.id, latitude, longitude, user.groups); 
    setLocation(latitude, longitude); 
  } 
});
