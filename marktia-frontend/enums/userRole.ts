export enum UserRole {
    NORMAL_USER = "Usuário comúm",
    PROVIDER = "Provedor"
}

export const UserRoleUtils = {
    fromNumber: (number: number): UserRole => {
        if (number === 0)
            return UserRole.NORMAL_USER;
        else
            return UserRole.PROVIDER;
    },

    toNumber: (userRole: string): number | undefined => {
        if (userRole === UserRole.NORMAL_USER)
            return 0;
        else if (userRole === UserRole.PROVIDER)
            return 1;
        else
            return undefined;
    }
}