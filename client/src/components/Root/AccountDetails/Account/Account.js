import React  from "react";
import styled from "styled-components";
import { useQuery } from "react-apollo";
import gql from "graphql-tag";

import Auth from "../../../../utils/auth";
import AccountAdverts from "./AccountAdverts";


const Label = styled.div`
    color: ${props => props.theme.nero};
    font-size: 1rem;
    margin-top: .25rem;

`;

const LogoutLink = styled.button`
    color: red;
    display: block;
    margin-top: .25rem;

`;



const query = gql`
    query User($id: ID!){
        user(id:$id){
            id
            name
            email
        }
    }`

const Account = () => {
    let id = Auth.getProfile().userId;
    
    const { loading, error, data } = useQuery(query, {
        variables: {id},
    });   

    if(loading) return null;

    if(error) return `Error! ${error}`;
  


    return(
        <div >
            <b style={{marginTop:"3rem", marginLeft:"1rem"}}>Your Listings</b>
            <div style={{display:"flex"}}>
            <div style={{ marginLeft:"1rem"}} className="raise-element dash-card">
            <Label>Name: {data.user.name}</Label>
            <Label>Email: {data.user.email}</Label>
            <LogoutLink onClick={evt => {
                Auth.logout() 
                window.location.assign('/profile')
        }}>Logout</LogoutLink>
            </div>
            <AccountAdverts adverts={data} />
        </div>
        </div>
    );
    
};

export default Account;