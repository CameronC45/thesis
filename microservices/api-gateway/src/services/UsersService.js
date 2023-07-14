import got from "got";

const USERS_SERVICE_URI = "http://users-service:7101";

export default class UsersService {
    static async createUser({ name, email, password}) {
        const body = await got.post(`${USERS_SERVICE_URI}/users`, {
            json: { name, email, password }
        }).json();
    return body;
        
    }
    static async loginUser({email, password}) {
        const body = await got.post(`${USERS_SERVICE_URI}/sessions`, {
            json: { email, password }
        }).json();
    return body;
        
    }

    static async fetchUser({id}) {
        const body = await got.get(`${USERS_SERVICE_URI}/user/${id}`).json();
        return body;
      }

}