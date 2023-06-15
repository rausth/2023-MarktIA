import { UserRole } from "@/enums/userRole";
import Select from "../common/forms/select";
import TextField from "../common/forms/text_field";

type UserPersonalInfoFormProps = {
    errors: any;
    editVersion?: boolean;
}

export default function UserPersonalInfoForm({ errors, editVersion }: UserPersonalInfoFormProps) {
    return (
        <div>
            <div className="grid grid-cols-2 gap-2">
                <div className="p-1">
                    <Select
                        title="Classificação"
                        name="userRole"
                        options={Object.values(UserRole)}
                    />
                    {errors.userRole && <span className="text-xs text-red mt-1">{errors.userRole.message}</span>}
                </div>
                <div className="p-1">
                    <TextField
                        type="text"
                        label="Nome"
                        name="name"
                    />
                    {errors.name && <span className="text-xs text-red mt-1">{errors.name.message}</span>}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
                <div className="p-1">
                    <TextField
                        type="email"
                        label="Email"
                        name="email"
                    />
                    {errors.email && <span className="text-xs text-red mt-1">{errors.email.message}</span>}
                </div>
                {!editVersion ? (
                    <div className="p-1">
                        <TextField
                            type="password"
                            label="Senha"
                            name="password"
                        />
                        {errors.password && <span className="text-xs text-red mt-1">{errors.password.message}</span>}
                    </div>
                ) : (
                    <div className="p-1">
                        <TextField
                            type="text"
                            label="Número de Telefone"
                            name="telephone"
                        />
                        {errors.telephone && <span className="text-xs text-red mt-1">{errors.telephone.message}</span>}
                    </div>
                )}
            </div>

            <div className="grid grid-cols-2 gap-2">
                <div className="p-1">
                    <TextField
                        type="text"
                        label="CPF"
                        name="cpf"
                    />
                    {errors.cpf && <span className="text-xs text-red mt-1">{errors.cpf.message}</span>}
                </div>
                <div className="p-1">
                    <TextField
                        type="text"
                        label="CNPJ"
                        name="cnpj"
                        placeholder="Deixe em branco caso não se aplique"
                    />
                    {errors.cnpj && <span className="text-xs text-red mt-1">{errors.cnpj.message}</span>}
                </div>
            </div>

            {!editVersion && (
                <div className="grid grid-cols-2 gap-2">
                    <div className="p-1">
                        <TextField
                            type="text"
                            label="Número de Telefone"
                            name="telephone"
                        />
                        {errors.telephone && <span className="text-xs text-red mt-1">{errors.telephone.message}</span>}
                    </div>
                    <div className="p-1">
                        <TextField
                            type="text"
                            label="URL da Imagem de Perfil"
                            name="imageURL"
                        />
                        {errors.imageURL && <span className="text-xs text-red mt-1">{errors.imageURL.message}</span>}
                    </div>
                </div>
            )}
        </div>
    )
}