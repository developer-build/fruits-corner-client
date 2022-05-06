import React, { useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SocialLogin from '../../Shared/SocialLogin/SocialLogin';
import { useSignInWithEmailAndPassword, useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import auth from '../../../firebase.init';
import './Login.css'

const Login = () => {
    const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
    const [sendPasswordResetEmail, sending, resetError] = useSendPasswordResetEmail(auth);
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";
    const emailRef = useRef('');
    if (user) {
        navigate(from, { replace: true });
    }

    const handleLogin = async e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        
        await signInWithEmailAndPassword(email, password);
        const { data } = await axios.post('http://localhost:5000/login',{ email });
        localStorage.setItem('accessToken', data.accessToken);

        if (/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email) === false) {
            return toast('Invalid Email')
        }
        if (password.length < 6) {
            return toast('Password too short')
        }
        if (error) {
            return toast(error?.message);
        }
        if (loading) {
            return toast('Loading...')
        }
    }

    const sendResetEmail = async () => {
        if (/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(emailRef.current.value) === false) {
            return toast('Invalid Email')
        }
        else if (sending) {
            return toast('Sending reset email...')
        }
        else if (resetError) {
            return toast(resetError?.message);
        }
        else {
            await sendPasswordResetEmail(emailRef.current.value)
            toast('Reset Email Sent')
        }
    }

    return (
        <div className='form-container'>
            <ToastContainer />
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input type="email" ref={emailRef} name="email" placeholder='Your Email' required />
                <input type="password" name="password" placeholder='Your Password' required />
                <input type="submit" value="Login" />
            </form>
            <p>Don't have Account? <Link to='/register' style={{ color: "#8259ff" }}>Register Here</Link></p>
            <p>Forgot Password? <button onClick={sendResetEmail} className='reset-btn'>Reset Password</button></p>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Login;