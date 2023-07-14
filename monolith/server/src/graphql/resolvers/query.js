import { Advert, Comments, User } from "../../db/models";

import { Sequelize } from "sequelize";
const Op = Sequelize.Op;

const Query = {

    async adverts(){
        try {
            const adverts = await Advert.findAll({order:[['createdAt', 'DESC']]});
            return adverts;
          } catch (e) {
            return next(e);
          }
    },

    async advert(obj, {id}){
        try{
            const findAdvert = await Advert.findByPk(id);
            
      
            if(!findAdvert) return next(new Error("No adverts with that ID!"));
      
            return findAdvert;
      
          } catch (e) {
            return next(e);
          }
    },

    async advertId(obj, {id}){
        try {
            const adverts = await Advert.findAll( {where: { userId: id},
            order:[['createdAt', 'DESC']]});
            return adverts;
          } catch (e) {
            return next(e);
          }
    },

    async advertSearch(obj, {title}){
        try {
            const adverts = await Advert.findAll( {where: { title:{[Op.like]:'%'+title+'%'}},
            order:[['createdAt', 'DESC']]});
            if(!adverts) return next(new Error("No Adverts found"));
            return adverts;
          } catch (e) {
            return next(e);
          }
    },

    async comments(obj, {advertId}){
        try {
            const comments = await Comments.findAll( { where: { advertId: advertId},
              order:[['createdAt', 'ASC']]});
            if(!comments) return next(new Error("No Comments found"));
            return comments;
          } catch (e) {
            return next(e);
          }
    },

    async user(obj, {id}){

        try{
            const findUser = await User.findByPk(id);
            
      
            if(!findUser) return next(new Error("No user with that email"));
      
            return findUser;
      
          } catch (e) {
            return next(e);
          }
    }
}

export default Query