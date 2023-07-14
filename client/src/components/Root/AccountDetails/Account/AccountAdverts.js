import { useQuery } from "react-apollo";
import gql from "graphql-tag";
import React from "react";

const query = gql`
    query Advert($id: String!){
        advertId(id: $id) {
            id
            title
            description
            url
            price
        }
    }
`;

const AccountAdverts = (adverts) => {
    console.log(adverts);
    let id = adverts.adverts.user.id;
    
    const { data, loading } = useQuery(query, {
        variables: {id}
    });

    if(loading) return "Loading...";
    

    return (
        
        <div className="adverts-list">
          {data.advertId.map(advert => (
            <div className="adverts-preview"  onClick={_ => window.location.href = "/advert/"+advert.id} style={{ cursor: "pointer"}}>
              <img alt="" src={advert.url} style={{ height: "120px", width:"120px"}}></img>
              <h2>{advert.title}</h2>
              <p>{advert.description}</p>
              <b style={{color:"red"}}>€{advert.price}</b>
            </div>
          ))}
        </div>
      
    );
};

export default AccountAdverts