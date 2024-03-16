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
}

export default new DepartmentService();
