import "@babel/polyfill";
import { useMutation } from "react-apollo";
import gql from "graphql-tag";
import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import * as yup from "yup";

import TextInput from "../../shared/TextInput";

const Label = styled.label`
    display: block;

    :not(:first-child){ 
        margin-top: .75rem;
    }
`;

const LabelText = styled.strong`
    display: block;
    font-size: 0.9rem;
    margin-bottom: 0.25rem;
`;

const RegisterButton = styled.button`
    display: inline-block;
    margin-top: .5rem;
`;

const OrLogin = styled.button`
    display: inline-block;
    margin-top: .5rem;
`;

const mutation = gql`
    mutation($name: String!, $email: String!, $password: String!) {
        createUser(name: $name, email: $email, password: $password){
            id
        }
    }
`;

const validationSchema = yup.object().shape({
    email: yup.string().required(),
    password: yup.string().required().test("PasswordMatch", "${path} Passwords do not match", function () {
        return this.parent.password === this.parent.confirmPassword;
    })
})

const Register = ({ onChangeToLogin: pushChangeToLogin }) => {
    const [createUser] = useMutation(mutation);
    const {
        formState: { isSubmitting, isValid },
        handleSubmit,
        register,
        reset
    } = useForm({ mode: "onChange", validationSchema});

    const onSubmit = handleSubmit(async({ name, email, password }) => {
        await createUser({ variables: { name, email, password }});
        reset();
        pushChangeToLogin();
    });

    return (
    <div className="loginForm">
    <form onSubmit={handleSubmit(onSubmit)}>
    <Label>
        <LabelText>Full Name</LabelText>
        <TextInput disabled={isSubmitting} type="text" {...register("name")}></TextInput>
    </Label>
    <Label>
        <LabelText>Contact Information For Your Adverts</LabelText>
        <TextInput disabled={isSubmitting} placeholder="Email or Phone Number" type="email" {...register("email")}></TextInput>
    </Label>
    <Label>
        <LabelText>Password</LabelText>
        <TextInput disabled={isSubmitting} type="password" {...register("password")}></TextInput>
    </Label>
    <Label>
        <LabelText>Confirm Password</LabelText>
        <TextInput disabled={isSubmitting} type="password" {...register("confirmPassword")}></TextInput>
    </Label>
    <RegisterButton disabled={isSubmitting || !isValid} type="submit">Register</RegisterButton>
    <OrLogin>
        <a href="#" onClick={evt => {
            evt.preventDefault();
            pushChangeToLogin();
        }}>Login</a>
    </OrLogin>
    </form>
    </div>
 );
};

export default Register;