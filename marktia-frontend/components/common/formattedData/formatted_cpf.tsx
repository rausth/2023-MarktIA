type FormattedCPF = {
    cpf: string;
}

const formatCPF = (cpf: string) => {
    let str = cpf.substring(0, 3);
    str += ".";
    str += cpf.substring(3, 6);
    str += ".";
    str += cpf.substring(6, 9);
    str += "-";
    str += cpf.substring(9, 11);

    return str;
}

export default function FormattedCPF({ cpf }: FormattedCPF) {
    return (
        <span>
            {formatCPF(cpf)}
        </span>
    )
}