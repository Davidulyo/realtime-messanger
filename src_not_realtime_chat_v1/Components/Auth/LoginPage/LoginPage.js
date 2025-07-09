import { Link, Redirect } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../fbConfig';
import { useEffect, useState } from 'react';
import * as Actions from '../../../redux/ActionCreators';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../Loading/Loading';
import './LoginPage.css'
import { infoFunc, loadAllUsers, loadProfile, loadProfileByToken, setOnlineTrue } from '../AuthAPI/AuthAPI';

function LoginPage() {


  const [serverMessage, setServerMessage] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const loggedIn = useSelector(state => state.someoneInSystem);

  useEffect(() => {
    async function init() {
        const token = localStorage.getItem('token');
        if (token){
            let info = await loadProfileByToken(token);
            // console.log('info', info);
            dispatch(Actions.setProfile(info));
            setOnlineTrue(token);

            dispatch(Actions.setAllUsers(await loadAllUsers()))
        }
    }
    init();
        
}, []);
    
  const loginHandler = async(e) => {
    e.preventDefault(); setLoading(true);
    
    let enteredPassword = e.target.password.value;
    let enteredEmail = e.target.email.value;

    let profile = await loadProfile(enteredEmail);



    signInWithEmailAndPassword(auth, enteredEmail, enteredPassword)
    .then((msg) => {
      setServerMessage('Success!');
      dispatch(Actions.setProfile(profile.profileData));
      dispatch(Actions.someoneInSystem(true));
      localStorage.setItem('token', profile.token);
    })
    .catch((err) => {
      setServerMessage(err.message);
    })
    .finally(() => {
      setLoading(false);
    })


  }


  return loggedIn ? <Redirect to={{pathname: '/chat'}}/>
  :
  <>
  
    <div>

      {isLoading && <Loading/>}
      {serverMessage && <h1>{serverMessage}</h1>}

      <form className='login-form' name="loginForm" onSubmit={(e) => loginHandler(e)}>
        <h3>login form</h3>
        <input className='input-item' type="email" name="email" placeholder="email" required/>
        <input className='input-item' type="password" name="password" placeholder="password" required/>
        <input className='input-item' type="submit" value="login"/>
        
        <Link to={'/reg'}>Sign up</Link>

      </form>


    </div>
  
  </>
}

export default LoginPage;
