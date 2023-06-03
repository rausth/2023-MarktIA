export enum UserRole {
    NORMAL_USER = "Usuário comúm",
    PROVIDER = "Provedor"
}

export namespace UserRole {
    export const fromNumber = (number: number): UserRole => {
        if (number === 0)
            return UserRole.NORMAL_USER;
        else
            return UserRole.PROVIDER;
    }

    export const toNumber = (userRole: string): number => {
        if (userRole === UserRole.NORMAL_USER)
            return 0;
        else
            return 1;
    }
}