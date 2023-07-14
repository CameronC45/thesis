import { useMutation } from "react-apollo";
import gql from "graphql-tag";
import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import TextInput from "../../../shared/TextInput";
import Auth from "../../../../utils/auth"


const Button = styled.button`
  margin-top: 0.5rem;
`;

const Form = styled.form`
    margin_top: 1rem;
    padding: 1rem;
`;

const Label = styled.label`
  display: block;
  :not(:first-child) {
    margin-top: 0.5rem;
  }
`;

const LabelText = styled.strong`
  display: block;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const mutation = gql`
  mutation($title: String!, $description: String!, $shipping: String!, $price: String!, $payment: String!, $county: String!, $userId: String!, $fullname: String!) {
    createAdvert(title: $title, description: $description, shipping: $shipping, price: $price, payment: $payment, county: $county, userId: $userId, fullname: $fullname) {
      id
    }
  }
`;

const AddAdvert = () => {
    const [createAdvert] = useMutation(mutation,{
      onCompleted: data => window.location.assign('/image/'+data.createAdvert.id)
    });
    const {
      formState: { isSubmitting },
      handleSubmit,
      register,
      reset
    } = useForm();
  
    if(!Auth.loggedIn()) return <h1 style={{width:"30%", margin:"auto", marginTop:"10%"}}>Login to create an Add.</h1>;
  
    const onSubmit = handleSubmit(async ({ title, description, shipping, price, payment, county}) => {
      const userId = Auth.getProfile().userId
      const fullname = Auth.getProfile().name
      await createAdvert({ variables: { title, description, shipping, price, payment, county, userId, fullname } });
      reset();
      pushAddAdvert();

    });

    
    return (
    <div className="raise-element dash-card" onSubmit={handleSubmit(onSubmit)} style={{ width:"50%", marginLeft: "auto", marginRight: "auto"}}>
    <Form >
    <Label>
        <LabelText>Title</LabelText>
            <TextInput disabled={isSubmitting} {...register("title")} type="text"/>
    </Label>
    <Label>
        <LabelText>Description</LabelText>
            <TextInput disabled={isSubmitting} {...register("description")} type="text"/>
    </Label>
    <Label>
        <LabelText>Shipping</LabelText>
            <TextInput disabled={isSubmitting} {...register("shipping")} type="text"/>
    </Label>
    <Label>
        <LabelText>Asking Price</LabelText>
            <TextInput disabled={isSubmitting} {...register("price")} type="text" />
    </Label>
    <Label>
        <LabelText>Payment Accepted</LabelText>
            <TextInput disabled={isSubmitting} {...register("payment")} type="text"/>
    </Label>
    <Label>
        <LabelText>County</LabelText>
            <TextInput disabled={isSubmitting} {...register("county")} type="text"/>
    </Label>
    <Button disabled={isSubmitting} type="submit">
        Add Advert
      </Button>
</Form>
</div>
    );

};



 
export default AddAdvert;