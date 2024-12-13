import React, { ChangeEvent, FC, FormEvent } from 'react'
import './styles.scss'

interface RegisterProps {
    loading: boolean;
    handleLogin: (e: FormEvent<HTMLFormElement>) => void;
    handleName: (e: ChangeEvent<HTMLInputElement>) => void;
    handleEmail: (e: ChangeEvent<HTMLInputElement>) => void;
    handlePassword: (e: ChangeEvent<HTMLInputElement>) => void;
    name:string;
    email:string;
    password:string;
}

const Register: FC<RegisterProps> = (props) => {
    const { loading, handleLogin, handleEmail, handlePassword, handleName, name, email, password } = props;
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
        </div>
    )
}

export default Register