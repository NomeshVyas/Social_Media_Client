import React, { useState } from 'react';
import './SignIn.scss';
import app2 from '../../images/app2.png';
import app1 from '../../images/app1.png';
import { Link } from "react-router-dom";
import { axiosClient } from '../../utils/axiosClient';
import { setItem } from '../../utils/localStorageManager';

const SignIn = () => {

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const handleLoginSubmit = async (e) =>{
    e.preventDefault();
    try {
      const response = await axiosClient.post('/auth/login', {
        email: loginEmail,
        password: loginPassword
      })
      const authToken = response.data.result.authToken;
      setItem('authToken', authToken);
      console.log(response);

      
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='login-body'>
      <main className='login-box'>
        <h1>InterActify</h1>
        {/* <h1>LazyBeeSocial</h1> */}
        <p>Connect, Engage, Amplify</p>
        <form className='loginForm' onSubmit={handleLoginSubmit}>
          <label htmlFor="loginEmail">Email :</label>
          <input type="email" id='loginEmail' placeholder='Email' onChange={(e) => setLoginEmail(e.target.value)} required />

          <label htmlFor="loginPassword">Password :</label>
          <input type="password" id='loginPassword' placeholder='Password' onChange={(e) => setLoginPassword(e.target.value)} required />

          <button className="submit">Log in</button>
        </form>
        <div className="signup-qus">
          Don't have an account? <Link className='link' to={'/signup'}>Sign up</Link>
        </div>
      </main>

      <div className="get-app-box">
        <p className="get-app">Get the app.</p>
        <figure>
          <img className='app-img' src={app2} alt="google" />
          <img className='app-img' src={app1} alt="Microsoft" />
        </figure>
      </div>

      <footer className='loginFooter'>
        <ul>
          <li>LazyBee Media</li>
          <li>About</li>
          <li>Blog</li>
          <li>Jobs</li>
          <li>Help</li>
          <li>API</li>
          <li>Privacy</li>
          <li>Terms</li>
          <li>Top Accounts</li>
          <li>Locations</li>
          <li>LazyBee Lite</li>
          <li>Threats</li>
          <li>Contact Uploading & Non-Users</li>
          <li>LazyBee Verified</li>
        </ul>
      </footer>
    </div>
  )
}

export default SignIn