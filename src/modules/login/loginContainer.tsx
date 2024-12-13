import React, { ChangeEvent, FC, FormEvent, useContext, useEffect, useState } from 'react'
import Login from './login'

import { useNavigate } from 'react-router-dom';
import { auth, onAuthStateChanged } from '../../common/firebase/firebase';
import { AuthContext } from '../../common/appContext/appContext';

const LoginContainer: FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();

    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error("AuthContext is not provided!");
    }

    const { loginWithUserEmail } = authContext;


    useEffect(() => {
        setLoading(true);
        onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate('/');
                setLoading(false);
            } else {
                setLoading(false);
            }
        })
    }, [navigate]);

    const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }
    const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true)
            loginWithUserEmail(email, password);
            setLoading(false);
        } catch (error) {
            setLoading(false)
        }

    }
    return (
        <div>
            <Login
                loading={loading}
                handleLogin={handleSubmit}
                handleEmail={handleEmail}
                handlePassword={handlePassword}
                email={email}
                password={password}
            />
        </div>
    )
}

export default LoginContainer