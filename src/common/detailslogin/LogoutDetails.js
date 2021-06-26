import React from 'react';
import logo from '../../assets/logo.svg';
import '../detailsheader/HeaderDetails.css';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';
import { useSelector } from "react-redux";
const useStyles = makeStyles((theme) => ({
  
    buttonStyle :{
        marginRight : 5,
    },

}));

export default function LogoutDetails(props) {
    const movieId = useSelector(state=>state.movieID);
    const history = useHistory();
    const classes = useStyles();
    const onLogoutClicked= ()=>{
        props.renderLoginPageDetails();      
    }
    const onBookShowClicked =(e) =>{
        history.push("/bookshow/" +movieId);
    }
    return (
        <div className="header">
            <div className="logo">
                <img src={logo} className="App-logo" alt="logo" />
            </div>
            <div className="container-btn">
              <Button className={classes.buttonStyle} variant="contained" onClick={onBookShowClicked} color="primary">BOOK SHOW</Button>
              <Button variant="contained" color="default" onClick={onLogoutClicked}>LOGOUT</Button>
              
            </div>
        </div>
    )

}