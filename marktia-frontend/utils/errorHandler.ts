"use client";

import { ErrorResponseDTO } from "@/dtos/responses/errorResponseDTO";
import { enqueueSnackbar } from "notistack";

export const handleError = (customMessage: string, errorResponseDTO: ErrorResponseDTO) => {
    enqueueSnackbar(customMessage, {
        variant: "error"
    });

    errorResponseDTO.errors.forEach((error) => {
        enqueueSnackbar(`Mensagem para o usuário: ${error.userMessage}`, {
            variant: "error"
        });

        enqueueSnackbar(`Mensagem para o desenvolvedor: ${error.developerMessage}`, {
            variant: "error"
        });
    });
}