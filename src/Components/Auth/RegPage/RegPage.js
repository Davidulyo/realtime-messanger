import { collection } from 'firebase/firestore';
import { db } from '../../../fbConfig';
import { addNewUser, helpReg } from '../AuthAPI/AuthAPI';
import { useState } from 'react';
import './RegPage.css';
import Loading from '../../Loading/Loading';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

function RegPage() {

    const [serverMessage, setServerMessage] = useState('');
    const [successReg, setSuccessReg] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const regHandler = async(e) => {
        e.preventDefault();
    
        setLoading(true);

        let enteredPassword = e.target.password.value;
        let nickName = e.target.nickName.value;
        let enteredEmail = e.target.email.value;

        let newUser = {
            email: enteredEmail,
            online: false,
            nickName,
        }

        const colRef = collection(db, 'totalUsers');
        
        try {
            let res = await helpReg(enteredEmail, enteredPassword);
            await addNewUser(colRef, newUser);
            setServerMessage(res);
            setTimeout(() => {  
                setSuccessReg(true);
            }, 1000)
        } catch (error) {
            setServerMessage(error.message);
        } finally {
            setLoading(false);
        }



    
    
    }

    return successReg ? <Redirect to={{pathname: '/'}}/>
    :
    <>
        <div>



            {isLoading && <Loading/>}
            {serverMessage && <h1>{serverMessage}</h1>}

            <form className='reg-form' name="regForm" onSubmit={(e) => regHandler(e)}>
                <h3>registration form</h3>
                <input className='input-item' type="email" name="email" placeholder="email" required/>
                <input className='input-item' type="text" name="nickName" placeholder="nickname" required/>
                <input className='input-item' type="password" name="password" placeholder="password" required/>
                <input className='input-item' type="submit" value="registration"/>
                <Link to={'/'}>Sign in</Link>

            </form>

        </div>
    
    </>
}

export default RegPage;
