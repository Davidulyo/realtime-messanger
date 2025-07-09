import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { loadAllUsers, loadProfileByToken, setOnlineFalse, setOnlineTrue } from '../Auth/AuthAPI/AuthAPI';
import * as Actions from '../../redux/ActionCreators'
import { Redirect } from 'react-router';
import './ChatPage.css';
import UserList from '../Chat/UserList/UserList';
import OpenChat from '../Chat/OpenChat/OpenChat';

function ChatPage() {
    
    const [profile, setProfile] = useState({});
    
    const someoneInSystem = useSelector(state => state.someoneInSystem);
    const pickedChat = useSelector(state => state.pickedChat);
    // const allUs = useSelector(state => state.allUsers);
    const [allUsers, setAllUsers] = useState([]);
    // const allUsers = useSelector(state => state.allUsers);

    const dispatch = useDispatch();

    const refresh = () => {
        init();
    }

    const logout = () => {
        dispatch(Actions.logout())
        const token = localStorage.getItem('token');
        setOnlineFalse(token);
        localStorage.removeItem('token');
    }
    
    useEffect(() => {
        init();
    }, []);

    async function init() {
        const token = localStorage.getItem('token');
        if (token){
            let info = await loadProfileByToken(token);

            dispatch(Actions.setProfile(info));
            setProfile(info);
            setOnlineTrue(token);
            
            let allUs = await loadAllUsers();
            console.log(allUs);

            dispatch(Actions.setAllUsers(allUs))
            setAllUsers(allUs.filter(el => el.email !== info.email));
        }
    }

    return someoneInSystem ? <div className='app'>

    
        {/* hi {profile.email} there! */}

        <div className='user-list-side'>
            {allUsers && <UserList allUsers={allUsers}/>}
            <button onClick={() => logout()}>Log out</button>
            <button onClick={() => refresh()}>Refresh</button>

        </div>

        <div className='chat-side'>
            {pickedChat && <OpenChat />}
        </div>



            

    </div>
    : 
    <Redirect to={{pathname: '/'}}/>
}

export default ChatPage;
