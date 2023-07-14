import { useQuery } from "react-apollo";
import gql from "graphql-tag";
import React from "react";
import styled from "styled-components";


import Comments from "./Comments/Comments";
import EditAdvert from "./EditAdvert/EditAdvert";
import Auth from "../../../utils/auth";


const Label = styled.div`
    color: ${props => props.theme.nero};
    font-size: 1rem;
    margin-top: .25rem;

`;


const query = gql`
    query Advert($id: ID!){
        advert(id:$id){
            url
            title
            description
            shipping
            price
            payment
            county
            userId
            fullname
        }
    }`

const Advert = () => {
    
  let split = JSON.stringify(window.location.pathname).split("t/")[1]
  let id = JSON.stringify(split).split('"')[1];

  const { loading, error, data } = useQuery(query, {
     variables: {id},
  }); 

  if(loading) return null;

  if(error) return `Error! ${error}`;


  if(Auth.loggedIn() && Auth.getProfile().userId == data.advert.userId){
     return <EditAdvert/>
  }else{
    return (
        <div>
        <div className="raise-element dash-card" style={{ display: "flex", marginLeft: "2rem", marginTop:"2rem", width: "70%", marginLeft: "auto", marginRight: "auto"}}>
          <div>
          <img className="raise-element dash-card" alt="" src={data.advert.url} style={{ height: "400px", width:"400px"}}></img>
          </div>
          <div style={{ marginLeft: "2rem", width:"18rem"}}>
            <b>Title:</b>
            <Label>{data.advert.title}</Label>
            <b>Description:</b>
            <Label>{data.advert.description}</Label>
            <b>Shipping:</b>
            <Label>{data.advert.shipping}</Label>
            <b>Payment:</b>
            <Label>{data.advert.payment}</Label>
            <b>Location:</b>
            <Label>{data.advert.county}, {data.advert.area}</Label>
            <b style={{color:"red", fontSize:"50px"}}>€{data.advert.price}</b>
          </div>
          <div className="raise-element dash-card" style={{marginLeft:"9rem"}}>Seller:
          <div  style={{cursor:"pointer"}}onClick={_ => window.location.href = "/user/"+data.advert.userId}>{data.advert.fullname}</div>
          </div>
          </div>          
         <Comments advertId={id}/>
        </div>
      
    );
  }
    
};
 
export default Advert;