import React from 'react';

import classes from './Button.module.css';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import HeadsetIcon from '@material-ui/icons/Headset';

const Button = props => {
    let button = null;
    let buttonClasses = [classes.cusButton__button];
    let spanClasses = []
    const style = {width: '30px', height: '30px'}
    switch(props.buttonType){
        case 'playPreview': 
            spanClasses = [classes.playPreviewIcon]
            buttonClasses = [classes.cusButton__button, classes.playPreview]
            button = <PlayArrowIcon style={{...style, color: 'var(--color1)'}}/>
            break;
        case 'playing':
            spanClasses = [classes.playingIcon]
            buttonClasses = [classes.cusButton__button, classes.playing]
            button = <HeadsetIcon style={{...style, color: 'var(--color1)'}} />
            break;
        default: 
            break;
    }
    return (
        <div className={classes.cusButton}>
            <span className={spanClasses.join(' ')}>
                {button}
            </span>
            <button className={buttonClasses.join(' ')} onClick={props.clicked}>{props.children}</button>
        </div>
    )
}

export default Button;