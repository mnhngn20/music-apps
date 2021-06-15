import React from 'react';
import { NavLink } from 'react-router-dom'
import classes from './NavItem.module.css';

const NavItem = props => {
    return (
        <li className={classes.navItem} onClick={props.clicked}>
            <NavLink 
                className={classes.navItem}
                activeClassName={classes.Active}
                to = {props.link}
                exact={props.exact}>{props.children}</NavLink>
        </li>
    )
}

export default NavItem;
