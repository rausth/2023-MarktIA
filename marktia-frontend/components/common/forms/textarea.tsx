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
            <span className="w-full truncate">{label}</span>
            <div className="text-zinc-500 border rounded-lg bg-white box-limited w-100 p-1">
                <textarea
                    rows={rows}
                    className="w-full"
                    placeholder={placeholder}
                    {...register(name)}
                />
            </div>
        </label>
    )
}

export default TextArea;