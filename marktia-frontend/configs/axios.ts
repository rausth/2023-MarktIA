"use client";

import axios from "axios";
import { useSnackbar } from "notistack";

const axiosAPI = axios.create({
    /**
     * [TODO]
     * Mudar para usar variavel de ambiente
     */
    baseURL: "http://localhost:8080"
});

const onError = (enqueueSnackbar: ReturnType<typeof useSnackbar>["enqueueSnackbar"], error: any) => {
    /**
     * [TODO]
     * Lidar com erros da API
     */
    enqueueSnackbar("[ERROR ON API CALL]", { variant: "error" });
};

export { axiosAPI, onError };