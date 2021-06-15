import React from 'react';

import classes from './SideDrawer.module.css';
import Backdrop from '../Backdrop/Backdrop';
import NavItems from '../../components/NavItems/NavItems';

const SideDrawer = props => {
    let sideDrawerClasses = [classes.sideDrawer, classes.hide];
    if(props.show) sideDrawerClasses = [classes.sideDrawer, classes.show];
    return (
        <div>
            <Backdrop show={props.show} clicked={props.clicked}/>
            <div className={sideDrawerClasses.join(' ')}>
                <div className={classes.Logo}>
                    <p>Musi.</p>
                </div>
                <NavItems />
            </div>
        </div>
    )
}

export default SideDrawer;