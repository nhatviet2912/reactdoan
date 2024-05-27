import axios from 'axios';
import config from '../config';


var url = `${config.apiUrl}/report`;

class ReportService {
    async getTotalEmployee() {
        var response = await axios
            .get(`${url}/getTotalEmployee`)
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

    async getTotalDepartment() {
        var response = await axios
            .get(`${url}/getTotalDepartment`)
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

    async getTotalEmployeeOut() {
        var response = await axios
            .get(`${url}/getTotalEmployeeOut`)
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

export default new ReportService();
