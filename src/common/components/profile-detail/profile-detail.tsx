import React, { FC } from 'react'
import './profileDetailStyles.scss'
import { images } from '../../constants/image';

interface ProfileDetailProps {
    name: string;
    image: string;
    className?: string;
}

const ProfileDetail: FC<ProfileDetailProps> = (props) => {
    const { name, image, className } = props;

    return (
        <div className={`profile-detail ${className ? className : ''}`}>
            <div className='image'>
                <img src={image} alt='profile' />
            </div>
            <div className='details'>
                <p>Welcome Back,</p>
                <p>{name}</p>
            </div>
        </div>
    )
}

export default ProfileDetail