import { useQuery } from "react-apollo";
import gql from "graphql-tag";
import React from "react";
import 'react-edit-text/dist/index.css';

import Comments from "../Comments/Comments";
import SubmitAdvert from "./SubmitAdvert"


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
    }`;

const EditAdverts = () => {
    
  let split = JSON.stringify(window.location.pathname).split("t/")[1]
  let id = JSON.stringify(split).split('"')[1];

  let image = split.replace(/['"]+/g, '')

  const { loading, error, data, refetch } = useQuery(query, {
     variables: {id},
  }); 

  if(loading) return null;

  if(error) return `Error! ${error}`;


    return (
        <div>
        <div className="raise-element dash-card"  style={{ display: "flex", marginLeft: "2rem", marginTop:"2rem", width: "70%", marginLeft: "auto", marginRight: "auto"}}>
          <div>
          <img className="raise-element1 dash-card" alt="" src={data.advert.url} style={{ height: "400px", width:"400px", cursor:"pointer"}}
           onClick={_ => window.location.href = "/image/"+image}></img>
          </div>
          <SubmitAdvert 
                data={data}
                onAddAdvert={() => {
                  refetch();
                }}/>
          <div className="raise-element dash-card" style={{marginLeft:"9rem"}}>Seller:
          <div  style={{cursor:"pointer"}}onClick={_ => window.location.href = "/user/"+data.advert.userId}>{data.advert.fullname}</div>
          </div>
          </div>
         <Comments advertId={id}/>
        </div>
      
    );
};
 
export default EditAdverts;


