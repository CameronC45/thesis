import { useMutation } from "react-apollo";
import gql from "graphql-tag";
import React from "react";
import { Button } from "react-materialize";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import TextInput from "../../../shared/TextInput";
import DeleteAdvert from "../DeleteAdvert/AdvertListing";



const Form = styled.form`
    margin_top: 1rem;
`;

const mutation = gql`
mutation($title: String, $description: String, $shipping: String, $payment: String, $county: String, $price: String, $id: String!) {
  editAdvert(title: $title, description: $description, shipping: $shipping, payment: $payment, county: $county, price: $price, id: $id) 
    
}
`;

const SubmitAdvert = (data, { onAddAdvert: pushAddAdvert}) => {
    let split = JSON.stringify(window.location.pathname).split("t/")[1]
    let id = split.replace(/['"]+/g, '')
    const [editAdvert] = useMutation(mutation)
    const {
      formState: { isSubmitting },
      handleSubmit,
      register
    } = useForm();
  
    
    const onSubmit = handleSubmit(async ({ title, description, shipping, payemnt, county, price }) => {
      await editAdvert({ variables: { title, description, shipping, payemnt, county, price, id } });
      pushAddAdvert();
    });
  
    return (
      <div onSubmit={handleSubmit(onSubmit)} style={{ marginLeft: "2rem", width:"18rem"}}>
              <Form>
              <b>Title:</b>
              <TextInput disabled={isSubmitting} {...register("title")} type="text" defaultValue={data.data.advert.title}/>
              <b>Description:</b>
              <TextInput disabled={isSubmitting} {...register("description")} type="text" defaultValue={data.data.advert.description}/>
              <b>Shipping:</b>
              <TextInput disabled={isSubmitting} {...register("shipping")} type="text" defaultValue={data.data.advert.shipping}/>
              <b>Payment:</b>
              <TextInput disabled={isSubmitting} {...register("payment")} type="text" defaultValue={data.data.advert.payment}/>
              <b>Location:</b>
              <TextInput disabled={isSubmitting} {...register("county")} type="text" defaultValue={data.data.advert.county}/>
              <b>Price:</b>
              <TextInput disabled={isSubmitting} {...register("price")} type="text" style={{color:"red"}} defaultValue={data.data.advert.price}/>
              <div style={{marginTop:"1rem"}}>
              <Button style={{color:"blue"}} disabled={isSubmitting} type="submit">Edit</Button>{" "}<DeleteAdvert data={id}/>
              </div>
              </Form>
              <div></div>
            </div>
    )
  };

  export default SubmitAdvert