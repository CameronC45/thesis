import { Advert } from "#root/db/models";
import { Comments } from "../db/models";
import generateUUID from "../helpers/generateUUID";

import { Sequelize } from "sequelize";
const Op = Sequelize.Op;



const setupRoutes = app => {

  app.get("/advert/:id", async (req, res, next) => {

    try{
      const findAdvert = await Advert.findByPk(req.params.id);
      

      if(!findAdvert) return next(new Error("No advert with that ID!"));

      return res.json(findAdvert);

    } catch (e) {
      return next(e);
    }
  })
  app.get("/adverts", async (req, res, next) => {
    try {
      const adverts = await Advert.findAll({order:[['createdAt', 'DESC']]});
      return res.json(adverts);
    } catch (e) {
      return next(e);
    }
  });

  app.get("/adverts/:title", async (req, res, next) => {
    try {
      const adverts = await Advert.findAll( {where: { title:{[Op.like]:'%'+req.params.title+'%'}},
      order:[['createdAt', 'DESC']]});
      if(!adverts) return next(new Error("No Adverts found"));
      return res.json(adverts);
    } catch (e) {
      return next(e);
    }
  });

  app.get("/advertId/:id", async (req, res, next) => {
    try {
      const adverts = await Advert.findAll( {where: { userId: req.params.id},
      order:[['createdAt', 'DESC']]});
      return res.json(adverts);
    } catch (e) {
      return next(e);
    }
  });

  app.post("/adverts", async (req, res, next) => {
    try {
      const advert = await Advert.create({ 
        title: req.body.title, 
        description: req.body.description,
        shipping: req.body.shipping, 
        price: req.body.price,
        payment: req.body.payment,
        county: req.body.county,
        userId: req.body.userId,
        fullname: req.body.fullname
      });
      return res.json(advert);
    } catch (e) {
      return next(e);
    }
  });

  app.put("/adverts", async (req, res, next) => {

    if(req.body.url){
      try {
        const findAdvert = await Advert.findOne({ attributes: {}, where: { id: req.body.id }});
        if(!findAdvert) return next(new Error("No Advert found!"));
  
        await Advert.update(
          {  url: req.body.url},
          { where: {id: req.body.id} });
        return res.end();
      } catch (e) {
        return next(e);
      }
    }else{
      try {
        const findAdvert = await Advert.findOne({ attributes: {}, where: { id: req.body.id }});
        if(!findAdvert) return next(new Error("No Advert found!"));
  
        await Advert.update(
          {  title: req.body.title,
             description: req.body.description,
             shipping: req.body.shipping,
             payment: req.body.payment,
             county: req.body.county,
             price: req.body.price},
          { where: {id: req.body.id} });
        return res.end();
      } catch (e) {
        return next(e);
      }
    }
    
  });

  app.delete("/advert/:id", async (req, res, next) => {
    try {
      const deleteAdvert = await Advert.findByPk(req.params.id);

      await deleteAdvert.destroy();

      return res.end();
    } catch (e) {
      return next(e);
    }
  });

  app.get("/comments/:advertId", async (req, res, next) => {
    try {
      const comments = await Comments.findAll( { where: { advertId: req.params.advertId},
        order:[['createdAt', 'ASC']]});
      if(!comments) return next(new Error("No Comments found"));
      return res.json(comments);
    } catch (e) {
      return next(e);
    }
  });

  app.post("/comment", async (req, res, next) => {
    try {
      const comment = await Comments.create({
        id: generateUUID(),
        name: req.body.name, 
        comment: req.body.comment,
        advertId: req.body.advertId 
      });
      return res.json(comment);
    } catch (e) {
      return next(e);
    }
  });
};

export default setupRoutes;