import React, { ChangeEvent, FC, FormEvent, useContext, useState } from 'react'
import './styles.scss'
import { AuthContext } from '../../common/appContext/appContext';
import { Link, useNavigate } from 'react-router-dom';
import { IconSvg } from '../../common/constants/image';

interface LoginProps {
    handleLogin: (e: FormEvent<HTMLFormElement>) => void;
    handleEmail: (e: ChangeEvent<HTMLInputElement>) => void;
    handlePassword: (e: ChangeEvent<HTMLInputElement>) => void;
    email: string;
    password: string;
}

const Login: FC<LoginProps> = (props) => {
    const {  handleLogin, handleEmail, handlePassword, email, password } = props;
    const navigate = useNavigate()
    const handleGoogleAuth = () => {
        navigate('/google-sign-in')
    }

    return (
        <div className='login-container'>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div className='input-field'>
                    <label>Email</label>
                    <input type='email' value={email} onChange={handleEmail}></input>
                </div>
                <div className='input-field'>
                    <label>password</label>
                    <input type='password' value={password} onChange={handlePassword}></input>
                </div>
                <button className='submit' type='submit'
                >Login</button>
                <p className='sign-in'>Don't have a account, create it <Link to={'/register'}>Sign up</Link>
                </p>
                <div className='divider'>
                    OR
                </div>
                <button className='signup-button' onClick={handleGoogleAuth}>
                    <IconSvg.GoogleIcon />
                    <p>Continue with Google</p>
                </button>
            </form>
        </div>
    )
}

export default Login