import React from 'react';

import Backdrop from '../Backdrop/Backdrop';
import Auxiliary from '../../hoc/Auxiliary';
import classes from './Modal.module.css';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';

const Modal = (props) => {
    let modalClasses = [classes.modal, classes.hide];
    if(props.show){
        modalClasses = [classes.modal, classes.show];
    }
    switch(props.modalType){
        case "no preview":
            modalClasses.push(classes.noPreview);
            break;
        default: break;
    }
    return (
        <Auxiliary>
            <Backdrop show={props.show} clicked={props.modalClose}/>
                <div className={modalClasses.join(' ')}>
                    {props.modalType==="no preview" 
                        ?<SentimentVeryDissatisfiedIcon style={{width: "50px", height: "50px"}} className={classes.noPreviewIcon}/>
                        :null}
                    {props.children}
                </div>
        </Auxiliary>
    )
}

export default Modal;