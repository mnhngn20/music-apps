import React from 'react';

import classes from './NavItems.module.css';
import NavItem from './NavItem/NavItem';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const NavItems = props => {
    return (
        <ul className={classes.navItems}>
            <NavItem link="/" exact clicked={props.clicked}>
                <HomeIcon style = {{height: '50px', width: '50px', color: 'var(--color3)'}}/>
            </NavItem>
            <NavItem link="/profile" exact clicked={props.clicked}>
                <AccountCircleIcon style = {{height: '50px', width: '50px', color: 'var(--color3)'}}/>
            </NavItem>
        </ul>
    )
}

export default NavItems;
