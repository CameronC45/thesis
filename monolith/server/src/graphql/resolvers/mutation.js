import { Advert, Comments, User } from "../../db/models";
const path = require('path')
const fs = require('fs')

import generateUUID from "../../helpers/generateUUID";
import hashPassword from "../../helpers/hashPassword";
import passwordComparedSync from "../../helpers/passwordComparedSync";

const { sign } = require('jsonwebtoken')

const Mutation = {
        
      async createAdvert(obj, { title, description, shipping, price, payment, county, userId, fullname }) {
            try {
                const advert = await Advert.create({ 
                  title: title, 
                  description: description,
                  shipping: shipping, 
                  price: price,
                  payment: payment,
                  county: county,
                  userId: userId,
                  fullname: fullname
                });
                return advert
              } catch (e) {
                return next(e);
              }
        },

      async editAdvert(obj, { title, description, shipping, payment, county, price, id }) {
          try {
            const findAdvert = await Advert.findOne({ attributes: {}, where: { id: id }});
            if(!findAdvert) return next(new Error("No Advert found!"));
      
            await Advert.update(
              {  title: title,
                 description: description,
                 shipping: shipping,
                 payment: payment,
                 county: county,
                 price: price},
              { where: {id: id} });
            return end();
          } catch (e) {
            return next(e);
          }
        },

      async uploadImage(obj, { file, id }) {
          const { createReadStream, filename } = await file;
  
          const stream = createReadStream()
          const pathName = path.join(__dirname, `../../../public/images/${filename}`)
          await stream.pipe(fs.createWriteStream(pathName))

          const url = `http://localhost:5000/images/${filename}`

          try {
            const findAdvert = await Advert.findOne({ attributes: {}, where: { id: id }});
            if(!findAdvert) return next(new Error("No Advert found!"));
      
            await Advert.update(
              {  url: url},
              { where: {id: id} });
            return end();
          } catch (e) {
            return next(e);
          }
        },

      async deleteAdvert(obj, { id }) {
          try {
            const deleteAdvert = await Advert.findByPk(id);
      
            await deleteAdvert.destroy();
      
            return end();
          } catch (e) {
            return next(e);
        }
      },

      async createComment(obj, { name, comment, advertId }) {
          try {
            const comments = await Comments.create({
              id: generateUUID(),
              name: name, 
              comment: comment,
              advertId: advertId 
            });
            return comments;
          } catch (e) {
            return next(e);
          }
        },

      async createUser(obj, {name, email, password}){
          
          if (!name || !email || !password) {
            return next(new Error("Invalid body!"));
          }
      
          try {
            const newUser = await User.create({
              id: generateUUID(),
              name: name,
              email: email,
              passwordHash: hashPassword(password)
            });
      
            return newUser;
      
          } catch (e) {
            return next(e);
          }
      },

      async loginUser(obj, {email, password}){
        
        try{
          const findUser = await User.findOne({ attributes: {}, where: { email: email }  });
    
          if(!findUser) return next(new Error("No user with that email"));
    
          if (!passwordComparedSync(password, findUser.passwordHash)){
             return next(new Error("Incorrect password!"));
          }
    
          return ({ token: sign({ userId: findUser.id, email: findUser.email, name: findUser.name }, 'privateKey', { expiresIn: '1h'}) });
    
        } catch (e) {
          return next(e);
        }
    }
    
}

export default Mutation