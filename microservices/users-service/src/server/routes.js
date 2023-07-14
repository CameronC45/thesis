import { User } from "#root/db/model";
import generateUUID from "#root/helpers/generateUUID";
import hashPassword from "#root/helpers/hashPassword";
import passwordCompareSync from "../helpers/passwordComparedSync";

const { sign } = require('jsonwebtoken')


const setupRoutes = app => {

  app.get("/user/:id", async (req, res, next) => {

    try{
      const findUser = await User.findByPk(req.params.id);
      

      if(!findUser) return next(new Error("No user with that email"));

      return res.json(findUser);

    } catch (e) {
      return next(e);
    }
  })

  app.post("/sessions", async (req, res, next) => {
    if(!req.body.email || !req.body.password){
      return next(new Error("Invalid body!"));
    }

    try{
      const findUser = await User.findOne({ attributes: {}, where: { email: req.body.email }  });

      if(!findUser) return next(new Error("No user with that email"));

      if (!passwordCompareSync(req.body.password, findUser.passwordHash)){
         return next(new Error("Incorrect password!"));
      }

      return res.json({ token: sign({ userId: findUser.id, email: findUser.email, name: findUser.name }, 'privateKey', { expiresIn: '1y'}) });

    } catch (e) {
      return next(e);
    }
  })

  app.post("/users", async (req, res, next) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
      return next(new Error("Invalid body!"));
    }

    try {
      const newUser = await User.create({
        id: generateUUID(),
        name: req.body.name,
        email: req.body.email,
        passwordHash: hashPassword(req.body.password)
      });

      return res.json(newUser);

    } catch (e) {
      return next(e);
    }
  });

};

export default setupRoutes;