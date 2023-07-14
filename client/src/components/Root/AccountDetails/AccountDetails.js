import React, { useState } from "react";
import { useSelector } from "react-redux";

import Account from "./Account/Account";
import Login from "../Login/Login";
import Register from "../Register/Register";

import Auth from "../../../utils/auth";

const AccountDetails = () => {
    const [isSigningUp, setIsSigningUp] = useState(false);

    if(Auth.loggedIn()) return <Account/>

    return isSigningUp ?( 
    <Register
        onChangeToLogin={() => {
            setIsSigningUp(false);
        }} /> ) : 
    ( 
    <Login 
        onChangeToRegister={() => {
            setIsSigningUp(true)}} /> );
};

export default AccountDetails;