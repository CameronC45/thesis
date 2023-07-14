import Mutation from './mutation';
import Query from './query';
const { GraphQLUpload } = require('graphql-upload');


const resolvers = { Upload: GraphQLUpload, Mutation, Query };

export default resolvers;