import React, { FC } from 'react'
import Profile from './profile'


interface ProfileContainerProps { }

const ProfileContainer: FC<ProfileContainerProps> = (props) => {
    const { } = props;
    return (
        <div>
            <Profile />
        </div>
    )
}

export default ProfileContainer