import { useQuery } from "react-apollo";
import gql from "graphql-tag";
import React from "react";
import styled from "styled-components";


import AddComment from "./AddComment";


const Description = styled.p`
    margin-bottom: 0;
`;


const Advert = styled.div`
    padding: 1rem 0;

    :not(:last-child){
        border-bottom: 1px solid ${props => props.theme.veryLightGrey};
    }
`;

const Title = styled.strong`
    display: block;
    font-size: 1.5rem;
    font-weight: 700;
`;

const query = gql`
  query Comment($advertId: String!){
      comments(advertId: $advertId){
        id
        name
        comment
        advertId
      }
  }
`;

const Comments = (id) => {
  
  let split = JSON.stringify(window.location.pathname).split("t/")[1]
  let advertId = split.replace(/['"]+/g, '')
  
    const { data, loading, refetch } = useQuery(query, {
      variables: {advertId}
    });

    if(loading) return "Loading...";

    

if(!data.comments.length){
  return (
    <div style={{ width:"70%", marginLeft: "auto", marginRight: "auto"}}>
     <AddComment
       onAddComment={() => {
         refetch();
       }}
     />
     </div> 
     );
}else{
  return (
    <div style={{ width:"70%", marginLeft: "auto", marginRight: "auto"}}>
     <div>
       {data.comments.map(comment => (
         <Advert key={comment.id}>
           <Title>{comment.name}</Title>
           <Description>{comment.comment}</Description>
         </Advert>
       ))}
     </div>
     <AddComment
       onAddComment={() => {
         refetch();
       }}
     />
     </div>
  );
}
    
      
    
};
 
export default Comments;