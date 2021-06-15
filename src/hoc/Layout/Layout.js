import React, {useState} from 'react';

import Toolsbar from '../../components/Toolsbar/Toolsbar';
import SideDrawer from '../../UI/SideDrawer/SideDrawer';
import AudioPlayer from '../../components/AudioPlayer/AudioPlayer';

import classes from './Layout.module.css';
const Layout = props => {
    const [showSideDrawer, setShowSideDrawer] = useState(false) 

    return (
        <div className={classes.layout}>
            <SideDrawer show = {showSideDrawer} clicked ={() => {setShowSideDrawer(!showSideDrawer)}} />
            <header>
                <Toolsbar clicked = {() => {setShowSideDrawer(!showSideDrawer)}}/>
            </header>
            <div className = {classes.main}>
                {props.children}
            </div>
            <div className = {classes.audio}>
                    <AudioPlayer />
            </div>
        </div>
    )
}

export default Layout;