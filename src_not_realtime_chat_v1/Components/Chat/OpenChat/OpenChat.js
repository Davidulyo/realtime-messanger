import { useDispatch, useSelector } from 'react-redux';
import img from '../../../assets/settings.png'
import './OpenChat.css';
import { sendNewMessage } from '../ChatAPI/ChatAPI';
import { loadAllUsers, loadProfileByToken } from '../../Auth/AuthAPI/AuthAPI';
import * as Actions from '../../../redux/ActionCreators';
import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../fbConfig';

function OpenChat() {

    const pickedChat = useSelector(state => state.pickedChat);
    const allUsers = useSelector(state => state.allUsers);
    const profileR = useSelector(state => state.profile);
    const [profile, setProfile] = useState(profileR);
    // const [pickedChat, setPickedChat] = useState(pickedChatR);

    // const [allUsers, setAllUsers] = useState();

    const dispatch = useDispatch();
    const token = localStorage.getItem('token');
    let chatWith = undefined;

    if(profile.chats) {
        chatWith = profile.chats.find(el => el.with === pickedChat.nickName);
        // console.log(chatWith);
    }

    // console.log(pickedChat);

    // useEffect(() => {

    //     const docRef = doc(db, "totalUsers", token);

    //     onSnapshot(docRef, (snapshot) => {
    //         console.log(snapshot.docs);
    //         let data = [];
    //         snapshot.docs.forEach(doc => {
    //             data.push({...doc.data(), id: doc.id});
    //         })
    //         console.log(data);
    //     })

    // }, []);

    

    const sendMessageHandler = (e) => {
        e.preventDefault();

        let newMessage = e.target.message.value;
        e.target.message.value = '';

        // dispatch(Actions.pickChat(pickedChat));

        init();
        let pickedChatUpdate = allUsers.find(el => el.id === pickedChat.id);
        console.log(pickedChatUpdate);

        sendNewMessage(token, pickedChatUpdate, profile, newMessage);
        // sendNewMessage(token, pickedChat, profile, newMessage);
        init();
    }

    async function init() {
        const token = localStorage.getItem('token');
        if (token){
            let info = await loadProfileByToken(token);

            dispatch(Actions.setProfile(info));
            setProfile(info);
            // setPickedChat(pickedChat)
            // setOnlineTrue(token);
            
            let allUs = await loadAllUsers();

            dispatch(Actions.setAllUsers(allUs))
            // setAllUsers(allUs.filter(el => el.email !== info.email));
        }
    }

    return <>

        <div className='chat-header'>
            <div className='chat-header-left-side'>
                <h3>{pickedChat.nickName}</h3>
                <h4>last seen recently</h4>
            </div>

            <div className='chat-header-right-side'>
                <img src={`${img}`} alt='settings' className='settings'/>                
            </div>
        </div>

        <div className='chat-field'>
            {chatWith && chatWith.chat.map((el, i) => {
                return <li key={i+22}>{el.who}: {el. msg}</li>
            })}
        </div>

        <form name='sendForm' className='chat-input-field' onSubmit={(e) => sendMessageHandler(e)}>
            <input type='text' name='message' className='chat-input-message' placeholder='write message...'/>
            <button className='chat-send-btn' type='submit'>send</button>
        </form>

    </>
}

export default OpenChat;
