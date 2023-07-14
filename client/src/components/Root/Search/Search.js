import { useQuery } from "react-apollo";
import gql from "graphql-tag";
import React from "react";

const query = gql`
    query Advert($title: String!){
        advertSearch(title: $title) {
            id
            title
            description
            url
            price
        }
    }
`;

const Search = () => {

    let split = JSON.stringify(window.location.pathname).split("h/")[1]
    let title = split.replace(/['"]+/g, '')
    
    const { data, loading } = useQuery(query, {
        variables: {title}
    });

    if(loading) return "Loading...";
    

    return (
        
        <div className="adverts-list">
            <b>Search results for {title}</b>
          {data.advertSearch.map(advert => (
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

export default Search