type FormattedCEP = {
    cep: string;
}

const formatCEP = (cep: string) => {
    let str = cep.substring(0, 5);
    str += "-";
    str += cep.substring(5, 8);

    return str;
}

export default function FormattedCEP({ cep }: FormattedCEP) {
    return (
        <span>
            {formatCEP(cep)}
        </span>
    )
}