import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";
import { io } from "socket.io-client"; // Optional: only if using socket from here
import useSocketStore from "../app/store/socketStore";

const { sendLocationToAllGroups } = useSocketStore();


export const LOCATION_TASK_NAME = "background-location-task";


TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
  if (error) {
    console.error("📛 Background task error:", error);
    return;
  }

  if (data) {
    const { latitude, longitude } = data.locations[0].coords;
    console.log("📍 Background location:", latitude, longitude);

    sendLocationToAllGroups(user.id, latitude, longitude, user.groups);  
  }
  
});
