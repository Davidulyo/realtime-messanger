import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../../../redux/ActionCreators'
import './UserCard.css';
import { loadAllUsers, loadProfileByToken } from '../../Auth/AuthAPI/AuthAPI';
import { useEffect, useState } from 'react';

function UserCard({user}) {

    const profile = useSelector(state => state.profile);

    const [lastMsg, setLastMsg] = useState('no messages yet');

    const dispatch = useDispatch();

    // let lastMsg = 'no messages yet';

    useEffect(() => {
        let chatWith = user.chats.find(el => el.with === profile.nickName);
        if(chatWith) {
            let chat = user.chats.find(el => el.with === profile.nickName);
            setLastMsg(chat.chat.reverse()[0].msg);
        }
    }, []);

    const chooseChat = () => {
        dispatch(Actions.pickChat(user));

        init();
        async function init() {
            const token = localStorage.getItem('token');
            if (token){
                let info = await loadProfileByToken(token);
    
                dispatch(Actions.setProfile(info));
                // setProfile(info);
                // setPickedChat(pickedChat)
                // setOnlineTrue(token);
                
                let allUs = await loadAllUsers();
    
                dispatch(Actions.setAllUsers(allUs))
                // setAllUsers(allUs.filter(el => el.email !== info.email));
            }
        }
    }

    return <>
    
        <div className='user-card' onClick={() => chooseChat()}>
            <div className='ava-plus-status'>
                <li className='ava' style={{backgroundColor: `#${Math.floor(Math.random()*1000)}`}}></li>
                {user.online ? <div className='online-mark'/> : <div className='offline-mark'/>}
            </div>
            <div className='name-plus-last-message'>
                <h4>{user.nickName}</h4>
                <p>{lastMsg}</p>
            </div>
        </div>
    
    </>
}

export default UserCard;
