import axios from 'axios';
import config from '../config';

var url = `${config.apiUrl}/attendances`;
var headers = new Headers({
    'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
});

class AttendanceService {
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

    async getWithMonth(Year, Month) {
        var response = await axios
            .post(`${url}/getwithmonth`, {
                Year,
                Month,
            })
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

    async import(file) {
        var response = await axios
            .post(`${url}/import`, file)
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

    async export(year, month, day, selectedValueStatus) {
        var DepartmentId = selectedValueStatus;
        var response = await axios
            .get(`${url}/export/${year}/${month}/${day}/${DepartmentId}`, {
                headers,
                responseType: 'arraybuffer',
            })
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

export default new AttendanceService();
