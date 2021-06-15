import React from 'react';

import classes from './otherTracks.module.css';
import otherTrack from './otherTrack/otherTrack';

const otherTracks = props => {
    const tracks = props.tracks.map(track => {
        return <otherTrack key={track.id} name={track.name} artists={track.artists} image={track.album.url}/> 
    })

    return (
        <div className={classes.otherTracks}>
            {tracks}
        </div>
    )
}

export default otherTracks;