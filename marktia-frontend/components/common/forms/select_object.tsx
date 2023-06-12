import { useFormContext } from "react-hook-form";

type SelectObjectProps = {
    title?: string;
    name: string;
    objects: Array<any>;
    includeEmptyOption: boolean;
    toStringFunction: (object: any) => string;
    onChangeFunction?: (id: string) => void;
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
                        setValue(name, e.target.value);
                
                        if (onChangeFunction) {
                            onChangeFunction(e.target.value);
                        }
                    }
				})}
			>
                {includeEmptyOption && (
					<option value={undefined}></option>
				)}
				{objects.map((object, i) => (
					<option key={i} value={object.id}>
						{toStringFunction(object)}
					</option>
				))}
			</select>
		</label>
    )
}