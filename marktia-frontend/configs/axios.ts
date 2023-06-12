import axios from "axios";

const axiosAPI = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL
});

export { axiosAPI };