const { gql } = require('apollo-server')

const typeDefs = gql`
 scalar Upload
 
 type Advert {
    id: ID!
    title: String!
    description: String!
    url: String!
    shipping: String!
    price: String!
    payment: String!
    county: String!
    userId: String!
    fullname: String!
 }

 type User {
     name: String!
     email: String!
     id: ID!
 }

 type Comment {
     id: ID!
     name: String!
     comment: String!
     advertId: String! 
 }

 type LoginResponse {
     token: String
 }

 type File {
    id: String!
    url: String!  
 }

 type Mutation {
    createAdvert(title: String!, description: String!, shipping: String!, price: String!, payment: String!, county: String!, userId: String!, fullname: String!): Advert!
    editAdvert(title: String, description: String, shipping: String, payment: String, county: String, price: String, id: String!): Boolean!
    uploadImage(file: Upload!, id: String!): Boolean!
    deleteAdvert(id: ID!): Boolean!
    createUser(name: String!, email: String!, password: String!): User!
    loginUser(email: String!, password: String!): LoginResponse!
    createComment(name: String!, comment: String!, advertId: String!): Comment!
 }

 type Query {
     adverts: [Advert!]!
     advertId(id: String!): [Advert!]!
     advertSearch(title: String!): [Advert!]!
     advert(id: ID!): Advert
     user(id: ID!): User
     comments(advertId: String!): [Comment!]!
 }
`;

export default typeDefs;