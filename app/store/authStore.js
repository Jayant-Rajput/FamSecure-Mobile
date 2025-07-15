import { create } from 'zustand';
import { Alert } from 'react-native';
import axios from "axios";
import { saveToken, getToken, removeToken } from '../../utils/secureStore';
import { API } from "../../utils/api.js";
import useSocketStore from "./socketStore";
import log from "../../utils/logger.js";


const useAuthStore = create((set) => ({
    user: null,
    isLoggingIn: false,
    isSigningIn: false,

    signup: async (data) => {
        set({ isSigningIn: true });
        log.info("signin called with ", data);
        try{
            const res = await axios.post(`https://famsecure.onrender.com/api/auth/register`, data);
            console.log("signin Response: ", res.data);
            set({ user: res.data.user });
            useSocketStore.getState().connectSocket(res.data.user.id);
        } catch(error){
            log.error(error.response?.data || error);
            Alert.alert(error.response.data.message);
        } finally{
            set({ isSigningIn: false });
        }
    },


    login: async (data) => {
        log.info("Login called with: ", data);
        set({ isLoggingIn: true});
        try{
            const res = await axios.post(`https://famsecure.onrender.com/api/auth/login`, data);
            console.log("Login Response: ", res.data);
            await saveToken(res.data.token);
            set({ user: res.data.user });
            useSocketStore.getState().connectSocket(res.data.user.id);

        } catch(error){
            log.error(error.response?.data || error);
        } finally{
            set({ isLoggingIn: false });
        }
    },

    
    logout: async (data) => {
        await removeToken();
        set({ user: null });
        useSocketStore.getState().disconnectSocket();
    },


    fetchUserFromToken: async () => {
        log.info("fetchUserFromToken called");
        const token = await getToken();
        if(!token) return;

        try{
            const res = await axios.get(`https://famsecure.onrender.com/api/auth/me`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log("fetchUserFromToken response: ", res.data);
            set({ user: res.data.user});
            useSocketStore.getState().connectSocket(res.data.user.id);  

        } catch(error){
            log.error("Invalid token", error);
            await removeToken();
            set({ user: null });
        }
    }  
}));

export default useAuthStore;