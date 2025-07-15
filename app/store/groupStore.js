import { create } from 'zustand';
import { Alert } from 'react-native';
import { useRouter } from "expo-router";
import { API } from "../../utils/api.js";
import axios from "axios";
import log from '../../utils/logger.js';


const router = useRouter();

const useGroupStore = create((set) => ({
    groups: [],
    group : null,


    createGroup : async (data) => {
        log.info("createGroup called with data ", data);
        try{
            const res = await axios.post(`https://famsecure.onrender.com/api/grp/create`, data);
            Alert.alert("Success", `Group "${res.data.name}" created\nCode: ${res.data.code}`);
        } catch(error){
            log.error(error.response?.data || error);
            Alert.alert(error.response.data.message);
        }
    },


    joinGroup : async (data) => {
        log.info("joinGroup called with data ", data);
        try{
            const res = await axios.post(`https://famsecure.onrender.com/api/grp/join`, data);
            Alert.alert(`${res.data.message}, groupId : ${res.data.groupId}`);
        } catch(error){
            log.error(error.response.data.message, error);
            Alert.alert(error.response.data.message);
        }
    },


    fetchUserGroups : async (data) => {
        try{
            log.info("fetchUserGroups called with data : ", data);
            const res = await axios.post(`https://famsecure.onrender.com/api/grp/groups`, data);
            log.info("response from fetchUserGropus ", res.data);
            set({groups: res.data.groups});

        } catch(error){
            log.error(error.response.data.message, error);
            Alert.alert(error.response.data.message);
        }
    },

    
    fetchGroupDetail : async (id) => {
        console.log("fetchGroupDetail called with id ", id);
        try{
            const res = await axios.get(`https://famsecure.onrender.com/api/grp/${id}`);
            log.info("response from fetchGroupDetail ", res.data);
            set({ group: res.data.group });
        
        } catch(error){
            log.error(error.response.data.message, error);
            Alert.alert(error.response.data.message);
        }
    }
}))

export default useGroupStore;