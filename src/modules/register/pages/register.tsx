import React, { FC } from 'react'
import './styles.scss'

interface RegisterProps {

}

const Register: FC<RegisterProps> = () => {
    const handleSubmit = () => {

    }
    return (
        <div className='login-container'>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div className='input-field'>
                    <label>Name</label>
                    <input type='text' ></input>
                </div>
                <div className='input-field'>
                    <label>Email</label>
                    <input type='email' ></input>
                </div>
                <div className='input-field'>
                    <label>password</label>
                    <input type='password'></input>
                </div>
                <button className='submit' type='submit'>Login</button>
            </form>
        </div>
    )
}

export default Register