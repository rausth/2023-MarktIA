export enum ServiceType {
    DESIGN_GRAFICO = "Design Gráfico",
    MARKETING_DIGITAL = "Marketing Digital",
    REDACAO_TRADUCAO = "Redação e Tradução",
    VIDEO_ANIMACAO = "Vídeo e Animação",
    MUSICA_AUDIO = "Música e Áudio",
    PROGRAMACAO_TECNOLOGIA = "Programação e Tecnologia",
    FOTOGRAFIA = "Fotografia",
    NEGOCIOS = "Negócios",
    SERVICOS_IA = "Serviços de IA"
}

export const ServiceTypeUtils = {
    fromNumber: (number: number): ServiceType => {
        if (number === 0)
            return ServiceType.DESIGN_GRAFICO;
        else if (number === 1)
            return ServiceType.MARKETING_DIGITAL;
        else if (number === 2)
            return ServiceType.REDACAO_TRADUCAO;
        else if (number === 3)
            return ServiceType.VIDEO_ANIMACAO;
        else if (number === 4)
            return ServiceType.MUSICA_AUDIO;
        else if (number === 5)
            return ServiceType.PROGRAMACAO_TECNOLOGIA;
        else if (number === 6)
            return ServiceType.FOTOGRAFIA;
        else if (number === 7)
            return ServiceType.NEGOCIOS;
        else
            return ServiceType.SERVICOS_IA;
    },

    toNumber: (type: string): number | undefined => {
        if (type === ServiceType.DESIGN_GRAFICO)
            return 0;
        else if (type === ServiceType.MARKETING_DIGITAL)
            return 1;
        else if (type === ServiceType.REDACAO_TRADUCAO)
            return 2;
        else if (type === ServiceType.VIDEO_ANIMACAO)
            return 3;
        else if (type === ServiceType.MUSICA_AUDIO)
            return 4;
        else if (type === ServiceType.PROGRAMACAO_TECNOLOGIA)
            return 5;
        else if (type === ServiceType.FOTOGRAFIA)
            return 6;
        else if (type === ServiceType.NEGOCIOS)
            return 7;
        else if (type == ServiceType.SERVICOS_IA)
            return 8;
        else
            return undefined;
    }
}