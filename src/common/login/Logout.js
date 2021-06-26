import React from 'react';
import logo from '../../assets/logo.svg';
import '../header/Header.css';
import { Button } from '@material-ui/core';

export default function Logout(props) {
    const onLogoutClicked = () => {
        props.renderLoginPage();
    }
    return (
        <div className="header">
            <div className="logo">
                <img src={logo} className="App-logo" alt="logo" />
            </div>
            <div className="container-btn">
                <Button variant="contained" color="default" onClick={onLogoutClicked}>LOGOUT</Button>
            </div>
        </div>
    )

}