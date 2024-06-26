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

    async getDetailRole(Year, Month, Id) {
        console.log(Id);
        var response = await axios
            .post(`${url}/detailRole`, {
                Year,
                Month,
                Id,
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

    async exportMonth(year, selectedValueMonth, selectedValueStatus) {
        let month = selectedValueMonth;
        let DepartmentId = selectedValueStatus;
        var response = await axios
            .get(`${url}/exportMonth/${year}/${month}/${DepartmentId}`, {
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

    async exportExcelMonth(month, data) {
        var response = await axios
            .post(`${url}/exportExcelMonth/${month}`, {
                headers,
                responseType: 'arraybuffer',
                data: data,
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

    async updateDetailRow(data) {
        var response = await axios
            .post(`${url}/updateDetailRow`, data)
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
}

export default new AttendanceService();
