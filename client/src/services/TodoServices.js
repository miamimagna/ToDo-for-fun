import axios from 'axios'; 
import url from "../utils/url";

axios.defaults.withCredentials = true;
const API_URL = url + '/api';

const TodoService = {
    add: async ({title, owner, desc}) => {
        const ADDURL = API_URL + '/add';
        const ress = await axios.post(ADDURL, {
            title, owner, desc 
        });
        const res = ress.data;
        if(!res.success){
            console.log(res.message);
        }
        else return res;
    },
    get: async ({owner}) => {
        const ADDURL = API_URL + '/get';
        const ress = await axios.post(ADDURL, {
            owner
        });
        const res = ress.data;
        if(!res.success){
            console.log(res.message);
        }
        else return res;
    },
    update: async({_id, title, desc}) => {
        const ADDURL = API_URL + '/update';
        const ress = await axios.post(ADDURL,{
            _id, title, desc
        });
        const res = ress.data;
        if(!res.success){
            console.log(res.message);
        }
        else return res;
    },
    delete: async({_id}) => {
        const ADDURL = API_URL + '/delete';
        const ress = await axios.post(ADDURL,{
            _id 
        })
        const res = ress.data;
        if(!res.success)
            console.log(res.message);
        else return res;
    }
}

export default TodoService