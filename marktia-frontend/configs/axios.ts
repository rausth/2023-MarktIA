import axios from "axios";

const axiosAPI = axios.create({
    /**
     * [TODO]
     * Mudar para usar variavel de ambiente
     */
    baseURL: "http://localhost:8080"
});

export { axiosAPI };