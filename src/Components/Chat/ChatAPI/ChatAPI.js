import { arrayUnion, doc, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../../fbConfig";


export const sendNewMessage = async(token, pickedChat, profile, newMessage) => {

    const docRef = doc(db, "totalUsers", token);
    const docRef1 = doc(db, "totalUsers", pickedChat.id);
    let oneChat = undefined;
    let oneChat1 = undefined;

    console.log(pickedChat);
    console.log(profile);

    if(profile.chats) {
        oneChat = profile.chats.find(el => el.with === pickedChat.nickName);
        oneChat1 = pickedChat.chats.find(el => el.with === profile.nickName);
    } 
    // else {
    //     console.log('gonna return');
    //     return;
    // }
        console.log(oneChat, oneChat1);
    if(oneChat === undefined && oneChat1 === undefined) {
        let startChat = {
            with: pickedChat.nickName,
            chat: [
                {
                    who: profile.nickName,      //  for the first time of chat
                    msg: newMessage,
                }
            ]
        }

        let startChat1 = {
            with: profile.nickName,
            chat: [
                {
                    who: profile.nickName,      //  for the first time of chat
                    msg: newMessage,
                }
            ]
        }
    
        await updateDoc(docRef, {
            chats: arrayUnion(startChat) // for who send
        });

        await updateDoc(docRef1, {
            chats: arrayUnion(startChat1) // for who recieve
        });

    } else {
    //////////// for next chatting
        // let oneChat = profile.chats.find(el => el.with === pickedChat.nickName);
        let oneChat = profile.chats.find(el => el.with === pickedChat.nickName);
        console.log('1: ',oneChat);

        let oneMsg = oneChat.chat;
        console.log('2: ',oneMsg);

        let updatedChat = oneMsg.push({
            who: profile.nickName,
            msg: newMessage,
        })
        console.log('3: ',updatedChat);

        let resChat = {...oneChat, ...updatedChat};  // it works good!!
        console.log('4: ', resChat);

        let allChats = profile.chats;
        console.log('5 to set : -',allChats);

        await updateDoc(docRef, {
            chats: allChats,
        });

///////////////

        // let oneChat1 = pickedChat.chats.find(el => el.with === profile.nickName);
        console.log('1: ',oneChat1);

        let oneMsg1 = oneChat1.chat;
        console.log('2: ',oneMsg1);

        let updatedChat1 = oneMsg1.push({
            who: profile.nickName,
            msg: newMessage,
        })
        console.log('3: ',updatedChat1);

        let resChat1 = {
            ...updatedChat1,
        }; 
        console.log('4: ', resChat1);

        let allChats1 = pickedChat.chats;
        console.log('5 to set : -',allChats);

        // let allChats1 = {
        //     ...pickedChat.chats,    
        //     ...resChat1,
        // }
        // console.log('5 to set : -',allChats1);

        await updateDoc(docRef1, {
            chats: allChats1,
        });
    //////////////////
    }







    



}





// export const sendNewMessage = async(token, pickedChat, profile, newMessage) => {

//     const docRef = doc(db, "totalUsers", token);

//     let oneChat = profile.chats.find(el => el.with === pickedChat.nickName);


//     if(profile.chats.length == 0 || ) 



//     // let startChat = {
//     //     with: pickedChat.nickName,
//     //     chat: [
//     //         {
//     //             who: profile.nickName,      //  for the first time of chat
//     //             msg: newMessage,
//     //         }
//     //     ]
//     // }

//     // await updateDoc(docRef, {
//     //     chats: arrayUnion(startChat)
//     // });


// //////////// for next chatting
//     // let oneChat = profile.chats.find(el => el.with === pickedChat.nickName);
//     console.log(oneChat);

//     let oneMsg = oneChat.chat;
//     console.log(oneMsg);

//     let updatedChat = oneMsg.push({
//         who: profile.nickName,
//         msg: newMessage,
//     })
//     // console.log(updatedChat);

//     let resChat = {...oneChat, ...updatedChat};  // it works good!!
//     console.log(resChat);

//     let allChats = profile.chats;
//     console.log('to set : -',allChats);

//     await updateDoc(docRef, {
//         chats: allChats,
//     });
// //////////////////
    



// }