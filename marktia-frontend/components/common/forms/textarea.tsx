import React from "react";
import { useFormContext } from "react-hook-form";

interface Props {
    placeholder?: string;
    label?: string;
    rows?: number
    name: string;
}

const TextArea: React.FC<Props> = ({
    placeholder,
    label,
    rows = 2,
    name
}: any) => {
    const { register } = useFormContext();

    return (
        <label className="truncate">
            <div><span className="w-full truncate">{label}</span></div>
            <textarea
                rows={rows}
                className="w-full text-zinc-500 border rounded-lg bg-white box-limited p-2 mt-1"
                placeholder={placeholder}
                {...register(name)}
            />
        </label>
    )
}

export default TextArea;