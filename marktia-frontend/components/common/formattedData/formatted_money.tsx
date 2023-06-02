type FormattedMoneyProps = {
    money: number;
}

export default function FormattedMoney({ money }: FormattedMoneyProps) {
    return (
        <span>
            {money.toLocaleString(undefined, {
                style: "currency",
                currency: "BRL"
            })}
        </span>
    )
}