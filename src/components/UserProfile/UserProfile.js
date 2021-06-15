import React from 'react';

import classes from './UserProfile.module.css';
import UserAvatar from '../../assets/user.png';

const UserProfile = props => {
    return (
        <div className = {classes.userProfile}>
            <div>
                <img src={UserAvatar} alt="Avatar"/>
            </div>
            <div>
                <p>Your Playlist</p>
            </div>
        </div>
    )
}

export default UserProfile;