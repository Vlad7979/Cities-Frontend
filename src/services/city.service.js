import axios from 'axios';

const API_URL = 'http://localhost:8080/api/city/';

class CityService {

    getAll(limit, page) {
        return axios.get(API_URL + "get", {
            params: {
                limit: limit,
                page: page
            }
        })
    }

    get(name) {
        return axios.get(API_URL + "get-by-name", {
            params: {
                name: name
            }
        })
    }

    edit(requestBody) {
        return axios.put(API_URL + "edit", requestBody)
    }
}

export default new CityService();