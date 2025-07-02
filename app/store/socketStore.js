import { create } from "zustand";
import socket from "../../utils/socket";

const useSocketStore = create((set) => ({
  socket,

  connectSocket: (userId) => {
    if (!socket.connected) {
      socket.connect();

      socket.on("connect", () => {
        console.log("Socket connected:", socket.id);
        socket.emit("joinGroups", { userId });
      });

      socket.on("disconnect", () => {
        console.log("Socket disconnected");
      });
    } else {
      socket.emit("joinGroups", { userId });
    }
  },

  disconnectSocket: () => {
    if (socket.connected) {
      socket.disconnect();
      console.log("Socket manually disconnected");
    }
  },

  sendLocationToAllGroups: (userId, lat, lon, groupIds) => {
    groupIds.forEach((groupId) => {
      socket.emit("locationUpdate", { userId, lat, lon, groupId });
    });
  },
}));

export default useSocketStore;
