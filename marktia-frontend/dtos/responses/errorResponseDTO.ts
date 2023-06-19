export type ErrorResponseDTO = {
    errors: Array<{
        userMessage: string;
        developerMessage: string;
    }>
}