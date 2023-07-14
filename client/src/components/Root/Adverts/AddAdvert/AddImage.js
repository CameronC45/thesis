import { useMutation } from "react-apollo";
import gql from "graphql-tag";
import React from "react";

const mutation = gql`
  mutation($file: Upload!, $id: String!) {
    uploadImage(file: $file, id: $id)
  }
`;

const AddImage = () =>{

let split = JSON.stringify(window.location.pathname).split("e/")[1]
let id = split.replace(/['"]+/g, '')

  const[uploadFile] = useMutation(mutation)

  const handleFileChange = e =>{
    const file = e.target.files[0]
    if(!file) return
    uploadFile({ variables: { file, id }})
  }

  return (
    <div style={{width:"30%", margin:"auto", marginTop:"10%"}}>
      <h1 style={{textAlign:"center"}}>Upload your image</h1>
      <div className="raise-element dash-card">
        <input type ="file" onChange={handleFileChange}/>
        </div>
    </div>
  );
};



 
export default AddImage;