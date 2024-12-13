import React, { FC, useContext, useState } from 'react'
import './styles.scss'
import { AuthContext } from '../../common/appContext/appContext';

interface LoginProps {
    loading:boolean;
    handleLogin:() => void;
}

const Login: FC<LoginProps> = (props) => {
    const {loading, handleLogin} = props;
 
    return (
        <div className='login-container'>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div className='input-field'>
                    <label>Email</label>
                    <input type='email' ></input>
                </div>
                <div className='input-field'>
                    <label>password</label>
                    <input type='password'></input>
                </div>
                <button className='submit' type='submit'
                
                >Login</button>
            </form>
        </div>
    )
}

export default Login