import React, { useState } from 'react';
import logo from '../../assets/logo.svg';
import '../header/Header.css';
import { Button, Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Modal from 'react-modal';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

Modal.setAppElement('#root');

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '0px 0px',
        overflow: 'auto',
    },
};

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {
                value === index && (
                    <div>{children}</div>
                )
            }
        </div>
    );
}

export default function Login(props) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const paperStyle = {
        width: 300,
        margin: "0px auto",
    }
    const [loginUser, setLoginUser] = useState({
        id: 0,
        email: '',
        password: ''
    });
    const [registerUser, setRegisterUser] = useState({
        id: 0,
        firstname: '',
        lastname: '',
        emailid: '',
        passwordemail: '',
        contact: ''
    });
    const inputChangedHandler = (e) => {
        const state = loginUser;
        state[e.target.name] = e.target.value;
        setLoginUser({ ...state });
    }
    const registerInputChangedHandler = (e) => {
        const state = registerUser;
        state[e.target.name] = e.target.value;
        setRegisterUser({ ...state });
    }
    const onLoginSubmitted = (e) => {
        e.preventDefault();
        props.verifyUserHandler(loginUser.email, loginUser.password);
        setLoginUser({ id: 0, email: '', password: '' });
        setModalIsOpen(false);
    }
    const onRegisterSubmitted = (e) => {
        e.preventDefault();
        props.userRegisterHandler(registerUser.firstname, registerUser.lastname, registerUser.emailid, registerUser.passwordemail, registerUser.contact);
        setRegisterUser({
            id: 0,
            firstname: '',
            lastname: '',
            emailid: '',
            passwordemail: '',
            contact: ''
        });
    }
    const { email, password } = loginUser;
    const { firstname, lastname, emailid, passwordemail, contact } = registerUser;

    return (
        <div className="header">
            <div className="logo">
                <img src={logo} className="App-logo" alt="logo" />
            </div>
            <div className="container-btn">
                <Button variant="contained" color="default" onClick={() => setModalIsOpen(true)}>Login</Button>
            </div>

            <Modal isOpen={modalIsOpen} style={customStyles}>
                <Paper style={paperStyle}>
                    <Tabs
                        value={value}
                        indicatorColor="secondary"
                        textColor="inherit"
                        onChange={handleChange}
                        centered
                        className="tab-nav-container"
                    >
                        <Tab label="Login" />

                        <Tab label="Register" />
                    </Tabs>

                    <TabPanel value={value} index={0}>

                        <ValidatorForm className="login-form" onSubmit={onLoginSubmitted}>
                            <Grid
                                container
                                alignItems='center'
                                justify='center'>
                                <TextValidator
                                    name="email"
                                    id="email"
                                    type="text"
                                    label="Username *"
                                    onChange={inputChangedHandler}
                                    value={email}
                                    validators={['required']}
                                    errorMessages={['required']}
                                >
                                </TextValidator>

                                <br />
                                <TextValidator
                                    name="password"
                                    id="password"
                                    type="password"
                                    label="Password *"
                                    value={password}
                                    onChange={inputChangedHandler}
                                    validators={['required']}
                                    errorMessages={['required']}
                                >
                                </TextValidator>
                            </Grid>
                            <br /> <br />
                            <Grid container
                                alignItems='center'
                                justify='center'>
                                <Button type="submit" variant="contained" color="primary">LOGIN</Button>
                            </Grid>

                        </ValidatorForm>
                    </TabPanel>

                    <TabPanel value={value} index={1}>
                        <ValidatorForm className="register-form" onSubmit={onRegisterSubmitted}>
                            <Grid
                                container
                                alignItems='center'
                                justify='center'>
                                <TextValidator
                                    name="firstname"
                                    id="firstname"
                                    type="text"
                                    label="First Name *"
                                    onChange={registerInputChangedHandler}
                                    value={firstname}
                                    validators={['required']}
                                    errorMessages={['required']}
                                >
                                </TextValidator>

                                <br />
                                <TextValidator
                                    name="lastname"
                                    id="lastname"
                                    type="text"
                                    value={lastname}
                                    label="Last Name *"
                                    onChange={registerInputChangedHandler}
                                    validators={['required']}
                                    errorMessages={['required']}
                                >
                                </TextValidator>
                                <TextValidator
                                    name="emailid"
                                    id="emailid"
                                    type="text"
                                    value={emailid}
                                    label="Email *"
                                    validators={['required']}
                                    errorMessages={['required']}
                                    onChange={registerInputChangedHandler}

                                >
                                </TextValidator>
                                <TextValidator
                                    name="passwordemail"
                                    id="passwordemail"
                                    type="password"
                                    value={passwordemail}
                                    label="Password *"
                                    onChange={registerInputChangedHandler}
                                    validators={['required']}
                                    errorMessages={['required']}
                                >
                                </TextValidator>
                                <TextValidator
                                    name="contact"
                                    id="contact"
                                    type="text"
                                    value={contact}
                                    label="Contact No. *"
                                    onChange={registerInputChangedHandler}
                                    validators={['required']}
                                    errorMessages={['required']}
                                >
                                </TextValidator>

                            </Grid>
                            <br /> <br />
                            <Grid container
                                alignItems='center'
                                justify='center'>
                                <Button type="submit" variant="contained" color="primary">REGISTER</Button>
                            </Grid>

                        </ValidatorForm>
                    </TabPanel>
                </Paper>
            </Modal>
        </div>
    )
}

