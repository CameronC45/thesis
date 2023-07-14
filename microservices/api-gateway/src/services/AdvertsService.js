import got from "got";

const LISTINGS_SERVICE_URI = "http://listings-service:7100";

export default class AdvertsService {
  static async createAdvert({title, description, shipping, price, payment, county, userId, fullname}) {
    const body = await got.post(`${LISTINGS_SERVICE_URI}/adverts`, { json: { title, description, shipping, price, payment, county, userId, fullname } }).json();
    return body;
  }

  static async editAdvert(array) {
    const body = await got.put(`${LISTINGS_SERVICE_URI}/adverts`, { json: array }).json();
    return body;
  }

  static async uploadImage(array) {
    const body = await got.put(`${LISTINGS_SERVICE_URI}/adverts`, { json: array }).json();
    return body;
  }

  static async fetchAllAdverts() {
    const body = await got.get(`${LISTINGS_SERVICE_URI}/adverts`).json();
    return body;
  }

  static async fetchAdvert({id}) {
    const body = await got.get(`${LISTINGS_SERVICE_URI}/advert/${id}`).json();
    return body;
  }

  static async fetchAllAdvertsById({id}) {
    const body = await got.get(`${LISTINGS_SERVICE_URI}/advertId/${id}`).json();
    return body;
  }

  static async fetchAllAdvertsBySearch({title}) {
    const body = await got.get(`${LISTINGS_SERVICE_URI}/adverts/${title}`).json();
    return body;
  }

  static async deleteAdvert({ id }) {
    const body = await got.delete(`${LISTINGS_SERVICE_URI}/advert/${id}`).json();
    return body;
  }

  static async fetchAllCommentsById({advertId}) {
    const body = await got.get(`${LISTINGS_SERVICE_URI}/comments/${advertId}`).json();
    return body;
  }

  static async createComment({name, comment, advertId}) {
    const body = await got.post(`${LISTINGS_SERVICE_URI}/comment`, { json: { name, comment, advertId } }).json();
    return body;
  }
}