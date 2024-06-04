import axios from 'axios';
import config from '../config';

var url = `${config.apiUrl}/Mail`;

class SendMailService {
    async send(data) {
        var response = await axios
            .post(`${url}/SendMail`, data)
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

export default new SendMailService();
