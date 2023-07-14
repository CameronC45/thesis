import AdvertsService from "../../services/AdvertsService"
import UsersService from "../../services/UsersService"

const Query = {

    async adverts(){
        return await AdvertsService.fetchAllAdverts();
    },

    async advert(obj, {id}){
        return await AdvertsService.fetchAdvert({id: id});
    },

    async advertId(obj, {id}){
        return await AdvertsService.fetchAllAdvertsById({id: id});
    },

    async advertSearch(obj, {title}){
        return await AdvertsService.fetchAllAdvertsBySearch({title: title});
    },

    async comments(obj, {advertId}){
        return await AdvertsService.fetchAllCommentsById({advertId: advertId});
    },

    async user(obj, {id}){
        return await UsersService.fetchUser({id: id});        
    }
}

export default Query