import axios from 'axios';
import config from '../config';

var url = `${config.apiUrl}/salary`;

class SalaryService {
    async getAll() {
        var response = await axios
            .get(`${url}`)
            .then((res) => {
                if (res.data) {
                    return res.data;
                }
            })
            .catch((error) => {
                console.log(error);
            });
        return response;
    }

    async get(data) {
        var response = await axios
            .post(`${url}/get`, data)
            .then((res) => {
                if (res.data) {
                    return res.data;
                }
            })
            .catch((error) => {
                return error.response;
            });
        return response;
    }

    async post(data) {
        var response = await axios
            .post(`${url}/create`, data)
            .then((res) => {
                if (res.data) {
                    return res.data;
                }
            })
            .catch((error) => {
                return error.response;
            });
        return response;
    }

    async updateStatus(Id) {
        let data = {
            Id,
        };
        var response = await axios
            .post(`${url}/updateStatus`, data)
            .then((res) => {
                if (res.data) {
                    return res.data;
                }
            })
            .catch((error) => {
                return error.response;
            });
        return response;
    }

    async updateStatusMany(Ids) {
        var response = await axios
            .post(`${url}/updateStatusMany`, Ids)
            .then((res) => {
                if (res.data) {
                    return res.data;
                }
            })
            .catch((error) => {
                return error.response;
            });
        return response;
    }

    async put(id, data) {
        var response = await axios
            .put(`${url}/update/${id}`, data)
            .then((res) => {
                if (res.data) {
                    return res.data;
                }
            })
            .catch((error) => {
                return error.response;
            });
        return response;
    }

    async getById(Id) {
        var response = await axios
            .get(`${url}/getById/${Id}`)
            .then((res) => {
                if (res.data) {
                    return res.data;
                }
            })
            .catch((error) => {
                return error.response;
            });
        return response;
    }

    async delete(Id) {
        var response = await axios
            .delete(`${url}/delete/${Id}`)
            .then((res) => {
                if (res.data) {
                    return res.data;
                }
            })
            .catch((error) => {
                return error.response;
            });
        return response;
    }

    async search(value) {
        const data = {
            value,
        };
        var response = await axios
            .post(`${url}/search`, data)
            .then((res) => {
                if (res.data) {
                    return res.data;
                }
            })
            .catch((error) => {
                return error.response;
            });
        return response;
    }
}

export default new SalaryService();
