import React from 'react';

import classes from './otherTrack.module.css';

const otherTrack = props => {
    return (
        <div className={classes.otherTrack}>
            <p>{props.name}</p>
            <p>{props.artists}</p>
            <img src={props.image} alt="img" />
        </div>
    )
}

export default otherTrack;