"use client";

import { useFormContext } from "react-hook-form";

type InputProps = {
    type: "text" | "password" | "email" | "number" | "time" | "date";
    placeholder?: string;
    label?: string;
    name: string;
}

export default function Input({ type, placeholder, label, name }: InputProps) {
    const { register } = useFormContext();

    return (
        <div>
            <span className="w-full truncate">{label}</span>
            <div className="w-full">
                <input
                    className="p-2 rounded-sm"
                    type={type}
                    placeholder={placeholder}
                    {...register(name)}
                />
            </div>
        </div>
    )
}