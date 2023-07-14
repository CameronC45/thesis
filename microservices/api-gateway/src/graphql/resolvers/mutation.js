import AdvertsService from "../../services/AdvertsService"
import UsersService from "../../services/UsersService"

const path = require('path')
const fs = require('fs')

const Mutation = {
        
    async createAdvert(obj, { title, description, shipping, price, payment, county, userId, fullname }) {
      return await AdvertsService.createAdvert({ title, description, shipping, price, payment, county, userId, fullname });
      },

    async editAdvert(obj, { title, description, shipping, payment, county, price, id }) {
      const array = {title, description, shipping, payment, county, price, id}

      await AdvertsService.editAdvert(array);
    
      return true;
      },

    async uploadImage(obj, { file, id }) {
      const { createReadStream, filename } = await file;
  
      const stream = createReadStream()
      const pathName = path.join(__dirname, `../../../public/images/${filename}`)
      await stream.pipe(fs.createWriteStream(pathName))
    
      const array = {url:`http://localhost:7000/images/${filename}`, id: id}
    
      await AdvertsService.uploadImage(array);
    
      return true;
      },

    async deleteAdvert(obj, { id }) {
      await AdvertsService.deleteAdvert({ id });

      return true;
    },

    async createComment(obj, { name, comment, advertId }) {
      return await AdvertsService.createComment({ name, comment, advertId });
      },

    async createUser(obj, {name, email, password}){
      return await UsersService.createUser({ name, email, password});
    },

    async loginUser(obj, {email, password}){
      return await UsersService.loginUser({ email, password});
  }
  
}

export default Mutation