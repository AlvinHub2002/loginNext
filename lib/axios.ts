import axios from "axios";

axios.defaults.baseURL =
    process.env.NODE_ENV !== "production"
        ? "http://localhost:5000"
        : process.env.NEXT_PUBLIC_SERVER_DOMAIN;

axios.defaults.withCredentials = true;

// Add a request interceptor
axios.interceptors.request.use((config) => {
    console.log(
        "Sending request to backend: ",
        config.baseURL! + config.url,
        "RequestData:",
        JSON.stringify(config.data)
    );

    // Do something before request is sent
    return config;
},
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
axios.interceptors.response.use((response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log(
        "Sending request to backend: ",
        response.config.baseURL + response.config.url!,
        "ResponseData:",
        JSON.stringify(response.data)
    );
    return response;
},
    async (error) => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        const originalRequest = error.config;
        if (error.response.status === 403) {
            try {
                await axios.post('/api/v1/refresh-token');
                return axios(originalRequest);
            } catch (err) {
                console.log(err)
            }
        }
        return Promise.reject(error);
    }
);

export default axios;