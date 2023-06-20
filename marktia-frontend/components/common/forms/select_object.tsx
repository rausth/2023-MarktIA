import { useFormContext } from "react-hook-form";

type SelectObjectProps = {
    title?: string;
    name: string;
    objects: Array<any>;
    includeEmptyOption: boolean;
    toStringFunction: (object: any) => string;
    onChangeFunction?: (id: string | undefined) => void;
}

export default function SelectObject({ title, name, objects, includeEmptyOption, toStringFunction, onChangeFunction }: SelectObjectProps) {
    const { register, setValue } = useFormContext();

    return (
        <label className="truncate">
            <div><span>{title}</span></div>
            <select
                className="w-full text-zinc-500 w-100 justify-between rounded-lg p-2 mt-1 bg-white"
                {...register(name, {
                    onChange: (e) => {
                        let newValue: string | undefined;
                        if (e.target.value) {
                            newValue = e.target.value;
                        } else {
                            newValue = undefined;
                        }

                        setValue(name, newValue);

                        if (onChangeFunction) {
                            onChangeFunction(newValue);
                        }
                    },
                    setValueAs: (value) => value ? Number(value) : undefined
                })}
                name={name}
            >
                {includeEmptyOption && (
                    <option value={undefined}></option>
                )}
                {objects.map((object, i) => (
                    <option key={i} value={Number(object.id)}>
                        {toStringFunction(object)}
                    </option>
                ))}
            </select>
        </label>
    )
}