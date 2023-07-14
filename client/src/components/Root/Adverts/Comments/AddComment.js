import { useMutation } from "react-apollo";
import gql from "graphql-tag";
import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import TextInput from "../../../shared/TextInput";
import Auth from "../../../../utils/auth";

const mutation = gql`
  mutation($name: String!, $comment: String!, $advertId: String!) {
    createComment(name: $name, comment: $comment, advertId: $advertId) {
      id
    }
  }
`;

const Button = styled.button`
  margin-top: 0.5rem;
`;

const Form = styled.form`
    background-color: #F8F8F8;
    margin_top: 1rem;
    padding: 1rem;
`;

const Label = styled.label`
  display: block;
  :not(:first-child) {
    margin-top: 0.5rem;
  }
`;


const AddComment = ({ onAddComment: pushAddComment }) => {
    let split = JSON.stringify(window.location.pathname).split("t/")[1]
    let advertId = split.replace(/['"]+/g, '')
    const [createComment] = useMutation(mutation);
    const {
      formState: { isSubmitting },
      handleSubmit,
      register,
      reset
    } = useForm();    
  
    if (!Auth.loggedIn()) return <h1 style={{textAlign:"center"}}>Login to comment.</h1>;
  
    const onSubmit = handleSubmit(async ({ comment }) => {
      let name = Auth.getProfile().name
      await createComment({ variables: { name, comment, advertId } });
      reset();
      pushAddComment();
    });

    return (
    <Form onSubmit={handleSubmit(onSubmit)}>
    <Label>
            <TextInput disabled={isSubmitting} {...register("comment")} type="text"/>
    </Label>
    <Button disabled={isSubmitting} type="submit">
        Comment
      </Button>
    </Form>
    );

};



 
export default AddComment;