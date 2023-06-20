type FormattedPhoneNumber = {
    phoneNumber: string;
}

const formatNumber = (phoneNumber: string) => {
    let str = "(";
    str += phoneNumber.substring(0, 2);
    str += ") ";

    if (phoneNumber.length === 10) {
        str += phoneNumber.substring(2, 6);
        str += "-"
        str += phoneNumber.substring(6, 10);
    } else {
        str += phoneNumber.substring(2, 7);
        str += "-"
        str += phoneNumber.substring(7, 11);
    }

    return str;
}

export default function FormattedPhoneNumber({ phoneNumber }: FormattedPhoneNumber) {
    return (
        <span>
            {formatNumber(phoneNumber)}
        </span>
    )
}