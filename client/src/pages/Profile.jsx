import { useContext, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import {useCookies} from 'react-cookie';
import ProfileForm from '../components/ProfileForm';
import AuthService from '../services/AuthServices';
import { AuthContext } from '../../contexts/AuthProvider';

const Profile = () => {
    const {authState} = useContext(AuthContext);
    const [invalidEntryName, setInvalidEntryName] = useState({
        status: false,
        message: ''
    });
    const [invalidEntryPassword, setInvalidEntryPassword] = useState({
        status: false,
        message: ''
    });
    const [cookies, setCookie, removeCookie] = useCookies('token');
    var name = authState.token? jwtDecode(authState.token).name: 'error';

    const handleName = async ({name, password}) => {
        try{
            const username = authState.username;
            const newPassword = password;
            const res = await AuthService.update({username, password, newPassword, newName: name});
            setInvalidEntryName({
                status: true,
                message: 'name changed'
            });
            setCookie('token', res.data.message);
        }catch(err){
            console.log(err);
            setInvalidEntryName({
                status: true,
                message: 'invalid password'
            });
        }
    }
    const handlePassword = async({Password, password}) => {
        try{
            const username = authState.username;
            await AuthService.update({username, password, newPassword: Password, newName: name});
            setInvalidEntryPassword({
                status: true,
                message: 'password changed'
            });
        }catch(err){
            console.log(err);
            setInvalidEntryPassword({
                status: true,
                message: 'invalid password'
            });
        }
    }
    return (
        <>
            <h1 id='greetings'>Your Profile</h1>
            <div className="profile-tile">
                <h1>Information</h1>
                <p className="profile-info"><b>Username: </b>{authState.username}</p>
                <p className="profile-info"><b>Name: </b>{name}</p>
            </div>
            <ProfileForm name="name" onSubmit={handleName} invalidEntry={invalidEntryName}/>
            <ProfileForm name="Password" onSubmit={handlePassword} invalidEntry={invalidEntryPassword}/>
        </>
    );
};

export default Profile; 