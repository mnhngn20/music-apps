import React from 'react';

import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';
import { StylesProvider } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    timeSlider: {
        width: "70%",
        padding: "0px 0px",
        height: "20px",
        display: "flex",
        alignItems: "center"
    },
    timeRail: {
        height: "0.8vh",
        borderRadius: "0.5vh",
        color: "black"
    },
    timeTrack: {
        borderRadius: "0.5vh",
        color: "var(--color3)",
        height: "0.8vh"
    },
    timeThumb: {
        backgroundColor: 'white',
        marginTop: -2,
        boxShadow: '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)',
        '&:focus, &:hover': {
            boxShadow: '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)'
        },
        width: 18,
        height: 18
    }
  }));

const TimeSlider = props => {
    const classes = useStyles();
    return (
        <StylesProvider injectFirst>
            <Slider 
                classes={{
                    root: classes.timeSlider,
                    track: classes.timeTrack,
                    rail: classes.timeRail,
                    thumb: classes.timeThumb
                }}
                value={props.value} 
                onChange= {props.changed}/>
        </StylesProvider>

    )
}

export default TimeSlider;