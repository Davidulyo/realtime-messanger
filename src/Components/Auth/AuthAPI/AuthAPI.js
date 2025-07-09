import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../fbConfig";
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, query, updateDoc, where } from "firebase/firestore";


export const helpReg = async(enteredEmail, enteredPassword) => {

    return createUserWithEmailAndPassword(auth, enteredEmail, enteredPassword)
    .then((msg) => {
        // console.log(msg);
        return 'Success!';
    })
    .catch((err) => {
        // console.log(err.message);
        throw new Error(err.message);
    })

}

export const addNewUser = async(colRef, newUser) => {
    return addDoc(colRef, newUser)
    .then((msg) => {
        // console.log(msg);
    })
    .catch((err) => {
        // console.log(err.message);
        throw new Error(err.message);
    })
}



export const loadProfile = async(email) => {
    // console.log('info function called');
    let token, profileData;

    const colRef = collection(db, 'totalUsers');
    const q = query(colRef, where('email', '==', `${email}`));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        token = doc.id; profileData = doc.data();
    });

    return {
        token,
        profileData,
    }
}

export const loadProfileByToken = async(token) => {
    // console.log('info function called');
    
    const colRef = collection(db, 'totalUsers');
    const docRef = doc(colRef, token);
    
    const answer = await getDoc(docRef);
    let profileData = answer.data();

    
    return profileData;
}

export const setOnlineTrue = async(token) => {
    const docRef = doc(db, "totalUsers", token);
    
    await updateDoc(docRef, {
        online: true,
    });
    
}

export const setOnlineFalse = async(token) => {
    const docRef = doc(db, "totalUsers", token);

    await updateDoc(docRef, {
        online: false,
    });
}

export const loadAllUsers = async() => {
    const colRef = collection(db, 'totalUsers');
    let data = [];

    const querySnapshot = await getDocs(colRef);

    querySnapshot.forEach((doc) => {
        if (doc.data().email !== undefined){
            // console.log(doc.id);
            let merge = {
                ...doc.data(),
                id: doc.id,
            }
            data.push(merge);
        }
    });


        console.log('allusers:',data);
    return data;
}