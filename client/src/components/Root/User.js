import React  from "react";
import styled from "styled-components";
import { useQuery } from "react-apollo";
import gql from "graphql-tag";

import AccountAdverts from "./AccountDetails/Account/AccountAdverts";


const Label = styled.div`
    color: ${props => props.theme.nero};
    font-size: 1rem;
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

const User = () => {
    let split = JSON.stringify(window.location.pathname).split("r/")[1]
    let id = JSON.stringify(split).split('"')[1];
    console.log(id);
    
    const { loading, error, data } = useQuery(query, {
        variables: {id},
    });   

    if(loading) return null;

    if(error) return `Error! ${error}`;
  


    return(
        <div>
        <b style={{marginTop:"3rem", marginLeft:"1rem"}}>{data.user.name}'s Listings</b>
        <div style={{ display:"flex"}}>
            <div style={{ marginLeft:"1rem"}} className="raise-element dash-card">
            <Label>Name: {data.user.name}</Label>
            <Label>Email: {data.user.email}</Label>
            </div>
            <AccountAdverts adverts={data} />
        </div>
        </div>
    );
    
};

export default User;