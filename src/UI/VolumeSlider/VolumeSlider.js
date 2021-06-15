import React from 'react';

import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';
import { StylesProvider } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    volumeSlider: {
        width: "100%",
        padding: "0px 0px",
        height: "fit-content",
        display: "flex",
        alignItems: "center"
    },
    volumeRail: {
        height: "0.8vh",
        borderRadius: "0.5vh",
        color: "var(--color2)"
    },
    volumeTrack: {
        borderRadius: "0.5vh",
        color: "var(--color3)",
        height: "0.8vh"
    },
    volumeThumb: {
        display: "none"
    }
  }));

const VolumeSlider = props => {
    const classes = useStyles();
    return (
        <StylesProvider injectFirst>
            <Slider 
                classes={{
                    root: classes.volumeSlider,
                    track: classes.volumeTrack,
                    rail: classes.volumeRail,
                    thumb: classes.volumeThumb
                }}
                value={props.value} 
                onChange= {props.changed}/>
        </StylesProvider>

    )
}

export default VolumeSlider;