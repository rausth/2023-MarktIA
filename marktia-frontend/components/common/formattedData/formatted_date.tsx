type FormattedDateProps = {
    date: string;
}

export default function FormattedDate({ date }: FormattedDateProps) {
    return (
        <span>
            {new Date(date).toLocaleDateString()}
        </span>
    )
}