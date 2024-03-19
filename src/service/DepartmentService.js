import axios from 'axios';

var url = `http://localhost:4000/department`;

class DepartmentService {
    async getAllDepartments() {
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
}

export default new DepartmentService();
