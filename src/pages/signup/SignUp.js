import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import app2 from '../../images/app2.png';
import app1 from '../../images/app1.png';
import './SignUp.scss';
import { axiosClient } from '../../utils/axiosClient';
import { setItem } from '../../utils/localStorageManager';

const SignUp = () => {
    const [signupName, setSignupName] = useState("");
    const [signupEmail, setSignupEmail] = useState("");
    const [signupPassword, setSignupPassword] = useState("");

    const navigate = useNavigate();

    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(signupName, signupEmail, signupPassword);
            const result = await axiosClient.post('/auth/signup', {
                name: signupName,
                email: signupEmail,
                password: signupPassword
            })
            console.log("signup result", result);
            const authToken = result.data.result.authToken;
            setItem('authToken', authToken);
            navigate('/');

        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className='signup-body'>
            <main className='signup-box'>
                <h1>InterActify</h1>
                {/* <h1>LazyBeeSocial</h1> */}
                <p className='logo-line'>Connect, Engage, Amplify</p>

                <form className='signupForm' onSubmit={handleSignupSubmit}>
                    <label htmlFor="fullName">Name :</label>
                    <input type="text" id='fullName' placeholder='Name' onChange={(e)=>setSignupName(e.target.value)} required />

                    <label htmlFor="signupEmail">Email :</label>
                    <input type="email" id='signupEmail' placeholder='Email' onChange={(e)=>setSignupEmail(e.target.value)} required />

                    <label htmlFor="signupPassword">Password :</label>
                    <input type="password" id='signupPassword' placeholder='Password' onChange={(e)=>setSignupPassword(e.target.value)} required />

                    <p className="policy">People who use our service may have uploaded your contact information to InterActify.</p>
                    <p className="policy">By signing up, you agree to our Terms , Privacy Policy and Cookies Policy .</p>

                    <button className="submit" type='submit'>Sign up</button>
                </form>
                <div className="login-qus">
                    Already have an account? <Link className='link' to={'/login'}>Login</Link>
                </div>
            </main>

            <div className="get-app-box">
                <p className="get-app">Get the app.</p>
                <figure>
                    <img className='app-img' src={app2} alt="google" />
                    <img className='app-img' src={app1} alt="Microsoft" />
                </figure>
            </div>

            <footer className='signupFooter'>
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

export default SignUp