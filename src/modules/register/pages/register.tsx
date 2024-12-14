import React, { ChangeEvent, FC, FormEvent } from 'react'
import './styles.scss'
import { Link } from 'react-router-dom';

interface RegisterProps {
    
    handleLogin: (e: FormEvent<HTMLFormElement>) => void;
    handleName: (e: ChangeEvent<HTMLInputElement>) => void;
    handleEmail: (e: ChangeEvent<HTMLInputElement>) => void;
    handlePassword: (e: ChangeEvent<HTMLInputElement>) => void;
    name:string;
    email:string;
    password:string;
}

const Register: FC<RegisterProps> = (props) => {
    const { handleLogin, handleEmail, handlePassword, handleName, name, email, password } = props;
    return (
        <div className='login-container'>
            <h1>Register</h1>
            <form onSubmit={handleLogin}>
                <div className='input-field'>
                    <label>Name</label>
                    <input type='text' value={name} onChange={handleName}></input>
                </div>
                <div className='input-field'>
                    <label>Email</label>
                    <input type='email' value={email} onChange={handleEmail} ></input>
                </div>
                <div className='input-field'>
                    <label>password</label>
                    <input type='password' value={password} onChange={handlePassword}></input>
                </div>
                <button className='submit' type='submit'>Login</button>
            </form>
            <p className='sign-in'> Already registered? <Link to={'/login'}>Sign in</Link>
            </p>
        </div>
    )
}

export default Register