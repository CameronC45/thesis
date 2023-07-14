import React from "react";
import { useMutation } from "react-apollo";
import gql from "graphql-tag";
import { Button } from "react-materialize";

const mutation = gql`
    mutation($id: ID!){
        deleteAdvert(id:$id)
    }    
`

const DeleteAdvert = (data) => {
    const [deleteAdvert] = useMutation(mutation, {
        onCompleted: data => window.location.assign('/profile')
    })
    let id = data.data

    
    return(
        
        <Button style={{ color: "red"}}
        onClick={e => {
            deleteAdvert({ variables: { id }})
        }}
        >Delete</Button>
        
    )
}

export default DeleteAdvert