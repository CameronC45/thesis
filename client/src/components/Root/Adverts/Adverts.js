import { useQuery } from "react-apollo";
import gql from "graphql-tag";
import React from "react";

const query = gql`
    {
        adverts {
            id
            title
            description
            url
            price
        }
    }
`;

const Adverts = () => {
   const { data, loading } = useQuery(query);

   if(loading) return "Loading...";

    return (
        
        <div className="adverts-list">
          <b>Recent Adverts</b>
          {data.adverts.map(advert => (
            <div className="adverts-preview" key={advert.id} onClick={_ => window.location.href = "/advert/"+advert.id} style={{ cursor: "pointer"}}>
              <img alt="" src={advert.url} style={{ height: "120px", width:"120px"}}></img>
              <h2>{advert.title}</h2>
              <p>{advert.description}</p>
              <b style={{color:"red"}}>€{advert.price}</b>
            </div>
          ))}
        </div>
      
    );
};
 
export default Adverts;