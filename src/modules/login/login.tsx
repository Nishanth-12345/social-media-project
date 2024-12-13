import React, { ChangeEvent, FC, FormEvent, useContext, useState } from 'react'
import './styles.scss'
import { AuthContext } from '../../common/appContext/appContext';

interface LoginProps {
    loading: boolean;
    handleLogin: (e: FormEvent<HTMLFormElement>) => void;
    handleEmail: (e: ChangeEvent<HTMLInputElement>) => void;
    handlePassword: (e: ChangeEvent<HTMLInputElement>) => void;
    email:string;
    password:string;
}

const Login: FC<LoginProps> = (props) => {
    const { loading, handleLogin, handleEmail, handlePassword , email, password } = props;

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
            </form>
        </div>
    )
}

export default Login