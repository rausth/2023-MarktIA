import Avatar from "../common/avatar";

type ProviderInfoProps = {
    /**
     * any por enquanto
     */
    provider: any;
}

export default function ProviderInfo({ provider }: ProviderInfoProps) {
    return (
        <div className="grid grid-cols-2">
            <div className="flex justify-center items-center p-5">
                <div className="w-[96px] h-[96px] rounded-full bg-gray-400">
                    <Avatar url={provider.imageURL} />
                </div>
            </div>
            <div className="p-5">
                <div className="grid grid-cols-2 py-2">
                    <div><span>Nome: {provider.name}</span></div>
                    <div><span>E-mail: {provider.email}</span></div>
                </div>
                <div className="grid grid-cols-2 py-2">
                    <div><span>CPF: {provider.cpf}</span></div>
                    <div><span>Telefone: {provider.telephone}</span></div>
                </div>
                <div className="py-2"><span>Usuário desde: {provider.creationDate.toDateString()}</span></div>
            </div>
        </div>
    )
}