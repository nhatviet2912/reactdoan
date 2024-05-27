import axios from 'axios';
import config from '../config';

var url = `${config.apiUrl}/employees`;
var headers = new Headers({
    'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
});

class EmployeeService {
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

    async getPageData(pageSize, pageIndex) {
        var response = await axios
            .get(`${url}/getPageData`, {
                params: {
                    pagesize: 10,
                    pageindex: 1,
                },
            })
            .then((res) => {
                if (res.data) {
                    return res.data.data;
                }
            })
            .catch((error) => {
                console.log(error);
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

    async exportData() {
        var response = await axios
            .get(`${url}/export`, { headers, responseType: 'arraybuffer' })
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

    async getStatus(Status) {
        var response = await axios
            .get(`${url}/status/${Status}`)
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

    async deleteMany(ids) {
        var response = await axios
            .post(`${url}/deleteMany`, ids)
            .then((res) => {
                if (res.data) {
                    return res.data;
                }
            })
            .catch((err) => {
                return err.response;
            });
        return response;
    }

    async updateStatus(status) {
        let id = status;
        var response = await axios
            .put(`${url}/updateStatus/${id}`)
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

    async updateStatusMany(ids) {
        var response = await axios
            .post(`${url}/updateStatusMany`, ids)
            .then((res) => {
                if (res.data) {
                    return res.data;
                }
            })
            .catch((err) => {
                return err.response;
            });
        return response;
    }
}

export default new EmployeeService();
