import React from 'react';

import classes from './Toolsbar.module.css';
import Logo from '../../assets/logo.png';
import SearchBar from '../../UI/SearchBar/SearchBar';

const Toolsbar = props => {
    return (
        <div className = {classes.toolsbar}>
            <div className = {classes.toolsbar__logo}>
                <img src={Logo} onClick={props.clicked} alt="logo"/>
            </div>
            <div className = {classes.toolsbar__searchBar}>
                <div className={classes.toolsbar__searchBar__container} >
                    <SearchBar />
                </div>
            </div>
        </div>
    )
}

export default Toolsbar;