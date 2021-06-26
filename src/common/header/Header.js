import React from 'react';
import './Header.css';
import Logout from '../login/Logout';
import Login from '../login/Login';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
export default function Header() {
    const dispatch = useDispatch();
    const history = useHistory();
    const loginOrlogout = useSelector(state => state.statevalue);
    async function verifyUserHandler(email, password) {
        const param = window.btoa(`${email}:${password}`);
        try {
            const rawResponse = await fetch('http://localhost:8085/api/v1/auth/login', {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json;charset=UTF-8",
                    authorization: `Basic ${param}`
                }
            });
            if (rawResponse.ok) {
                dispatch({ "type": "SET_STATE", payload: false });
                <Logout />
            } else {
                dispatch({ "type": "SET_STATE", payload: true });
                const error = new Error();
                error.message = 'Credentials is not correct';
                throw error;
            }
        } catch (e) {
            alert(`Error: ${e.message}`);
        }
    }
    const renderLoginPage = () => {
        dispatch({ "type": "SET_STATE", payload: true });
        history.push("/");
    }
    async function userRegisterHandler(firstname, lastname, emailid, passwordemail, contact) {
        const params = {
            email_address: emailid,
            first_name: firstname,
            last_name: lastname,
            mobile_number: contact,
            password: passwordemail
        }

        try {
            const rawResponse = await fetch('http://localhost:8085/api/v1/signup', {
                body: JSON.stringify(params),
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json;charset=UTF-8"
                }
            });
            if (rawResponse.ok) {
                //
            } else {
                const error = new Error();
                error.message = 'Credentials is not correct';
                throw error;
            }
        } catch (e) {
            alert(`Error: ${e.message}`);
        }
    }

    return (

        <div className="container">
            {loginOrlogout ? <Login verifyUserHandler={verifyUserHandler} userRegisterHandler={userRegisterHandler} /> : <Logout renderLoginPage={renderLoginPage} />}

        </div>

    )
}