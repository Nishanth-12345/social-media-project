import React, { FC, useContext } from 'react'
import Profile from './profile'
import { AuthContext } from '../../../common/appContext/appContext';


interface ProfileContainerProps { }

const ProfileContainer: FC<ProfileContainerProps> = (props) => {
    const { } = props;
     const authContext = useContext(AuthContext);
        if (!authContext) {
            throw new Error("AuthContext is not provided!");
        }
    
        const { user, userData } = authContext;
    
    return (
        <div>
            <Profile 
               user={user}
               userData={userData}
             />
        </div>
    )
}

export default ProfileContainer