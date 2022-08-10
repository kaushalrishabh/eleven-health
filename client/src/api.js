import axios from 'axios';

const api = axios.create({
    baseURL: '/',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }
});

api.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err.response.status === 401)
            console.log("Server Axios/API Error");

        return Promise.reject(err)
    }
);

export default api;