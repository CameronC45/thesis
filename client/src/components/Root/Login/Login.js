import "@babel/polyfill";
import { useMutation } from "react-apollo";
import gql from "graphql-tag";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import TextInput from "../../shared/TextInput";
import Auth from '../../../utils/auth';


const Label = styled.label`
    display: block;

    :not(:first-child){ 
        margin-top: .75rem;
    }
`;

const LabelText = styled.strong`
    display: block;
    font-size: 1rem;
    margin-bottom: 0.25rem;
`;

const LoginButton = styled.button`
    display: inline-block;
    margin-top: .5rem;
`;

const Register = styled.button`
    display: inline-block;
    margin-top: .5rem;
`;

const mutation = gql`
    mutation($email: String!, $password: String!) {
        loginUser(email: $email, password: $password){
            token
        }
    }
`;


const Login = ({ onChangeToRegister: pushChangeToRegister }) => {
    const [logIn] = useMutation(mutation);
    const {
        formState: { errors },
        handleSubmit,
        register
    } = useForm();

    const onSubmit = handleSubmit(async({ email, password }) => {
        try{
            const {data} = await logIn({
                variables: {
                    email,
                    password }
            });
            console.log(data);
            Auth.login(data.loginUser.token);
        } catch (e) {
            console.error(e);
        }
        
    });



    return (
    <div className="loginForm" style={{display: "flex"}}>
        <h1>{"Buy & Sell"}</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
    <Label>
        <LabelText>Email</LabelText>
        <TextInput {...register("email")}></TextInput>
    </Label>
    <Label>
        <LabelText>Password</LabelText>
        <TextInput type="password" {...register("password")}></TextInput>
    </Label>
    <LoginButton type="submit">Login</LoginButton>
    <Register>
        <a href="#" onClick={evt => {
            evt.preventDefault();
            pushChangeToRegister();
        }}>Register</a>
    </Register>
    </form>
    </div>
 );
};

export default Login;