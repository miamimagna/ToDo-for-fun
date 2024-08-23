import axios from 'axios'; 
import url from "../utils/url";

const AUTH_URL = url + '/auth';
const AuthService = {
    login: async ({username, password}) => {
        try{
            const res = await axios.post(AUTH_URL + '/login', {
                username, password,
                withCredentials: true
            });
            const token = res.data.message;
            return token;
        }catch(err) {
            console.log('something went wrong with login');
            throw err;
        }
    },
    signup: async({username, name, password}) => {
        try {
            const res = await axios.post(AUTH_URL + '/signup', {
                username, name, password,
                withCredentials: true
            });
            const token = res.data.message;
            return token;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}

export default AuthService;