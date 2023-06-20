import { Controller, useFormContext } from "react-hook-form";

type BooleanInputProps = {
    title?: string;
    name: string;
}

export default function BooleanInput({ title, name }: BooleanInputProps) {
    const { control, register } = useFormContext();

    return (
        <div className="flex flex-col">
            {title}
            <div className="rounded-lg border h-[40px] w-full flex">
                <Controller
                    control={control}
                    name={name}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <>
                            <label className="cursor-pointer flex items-center h-full w-1/2">
                                <span className={`px-2 flex items-center justify-center h-full w-full rounded-l-lg ${value === true ? "bg-zinc-200" : "bg-white"}`}>
                                    {"Sim"}
                                </span>
                                <input
                                    type="radio"
                                    className="hidden"
                                    onBlur={onBlur}
                                    onChange={() => onChange(true)}
                                    checked={value === true}
                                />
                            </label>
                            <label className="cursor-pointer flex items-center h-full border-l w-1/2">
                                <span className={`px-2 flex items-center justify-center h-full w-full rounded-r-lg ${value === false ? "bg-zinc-200" : "bg-white"}`}>
                                    {"Não"}
                                </span>
                                <input
                                    type="radio"
                                    className="hidden"
                                    onBlur={onBlur}
                                    onChange={() => onChange(false)}
                                    checked={value === false}
                                />
                            </label>
                        </>
                    )}
                />
            </div>
        </div>
    )
}