import React from 'react';
import './HeaderDetails.css';
import LoginDetails from '../detailslogin/LoginDetails';
import LogoutDetails from '../detailslogin/LogoutDetails';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
export default function HeaderDetails() {
    const loginOrlogoutDetails = useSelector(state=>state.statevalue);
    const dispatch = useDispatch();
    const history = useHistory();
    async function verifyUserHandlerDetails(email,password) {
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
            if(rawResponse.ok) {
                dispatch({"type":"SET_STATE",payload:false});
                <LogoutDetails />
            } else {
                dispatch({"type":"SET_STATE",payload:true});
                const error = new Error();
                error.message = 'Credentials is not correct';              
            }
        } catch(e) {
            alert(`Error: ${e.message}`);
        }
    }
    const renderLoginPageDetails=()=>{
        dispatch({"type":"SET_STATE",payload:true});
        history.push("/");
    }
  async function  userRegisterHandlerDetails (firstname,lastname,emailid,passwordemail,contact) {
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
            if(rawResponse.ok) {

            } else {
                const error = new Error();
                error.message = 'Credentials is not correct';
                throw error;
            }
        } catch(e) {
            alert(`Error: ${e.message}`);
        }
    }
    return (

        <div className="container">
            {loginOrlogoutDetails ? <LoginDetails verifyUserHandlerDetails={verifyUserHandlerDetails} userRegisterHandlerDetails={userRegisterHandlerDetails} /> : <LogoutDetails  renderLoginPageDetails={renderLoginPageDetails}/>  }  

        </div>

    )
}