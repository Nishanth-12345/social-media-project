import React, { useEffect, useState } from 'react'
import { imageData } from '../../common/data/imageData';
import GoogleSignIn from './googleSignin';
import './styles.scss';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../common/firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { useLoading } from '../../common/appContext/loadingContext';

const GoogleAuthContainer = () => {
    const {setLoading} = useLoading();
    const navigate = useNavigate();
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
    return (
        <GoogleSignIn
            imageData={imageData}
        />
    )
}

export default GoogleAuthContainer