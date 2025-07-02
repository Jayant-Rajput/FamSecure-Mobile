import { create } from 'zustand';
import { Alert } from 'react-native';
import { useRouter } from "expo-router";
import { API } from "../../utils/api.js";
import axios from "axios";

const router = useRouter();

const useGroupStore = create((set) => ({
    groups: [],
    group : null,


    createGroup : async (data) => {
        try{
            const res = await axios.post(`http://${API}:3000/api/grp/create`, data);
            Alert.alert("Success", `Group "${res.data.name}" created\nCode: ${res.data.code}`);
        } catch(error){
            console.log(error.response?.data || error);
            Alert.alert(error.response.data.message);
        }
    },


    joinGroup : async (data) => {
        try{
            const res = await axios.post(`http://${API}:3000/api/grp/join`, data);
            Alert.alert(`${res.data.message}, groupId : ${res.data.groupId}`);
        } catch(error){
            console.log(error.response.data.message, error);
            Alert.alert(error.response.data.message);
        }
    },


    fetchUserGroups : async (data) => {
        try{
            console.log("fetchUserGroups called with data : ", data);
            const res = await axios.post(`http://${API}:3000/api/grp/groups`, data);
            console.log("response from fetchUserGropus ", res.data);
            set({groups: res.data.groups});

        } catch(error){
            console.log(error.response.data.message, error);
            Alert.alert(error.response.data.message);
        }
    },

    
    fetchGroupDetail : async (id) => {
        try{
            const res = await axios.get(`http://${API}:3000/api/grp/${id}`);
            console.log("response from fetchGroupDetail ", res.data);
            set({ group: res.data.group });
        
        } catch(error){
            console.log(error.response.data.message, error);
            Alert.alert(error.response.data.message);
        }
    }
}))

export default useGroupStore;