import { useFormContext } from "react-hook-form";

type SelectObjectProps = {
    title?: string;
    name: string;
    objects: Array<any>;
    toStringFunction: (object: any) => string;
    onChangeFunction?: (idx: number) => void;
}

export default function SelectObject({ title, name, objects, toStringFunction, onChangeFunction }: SelectObjectProps) {
    const { register, setValue } = useFormContext();

    return (
        <label>
			{title}
			<select
				className="input focus:border-none w-full"
				{...register(name, {
					onChange: (e) => {
                        setValue(name, e.target.value);
                
                        if (onChangeFunction) {
                            onChangeFunction(e.target.value);
                        }
                    }
				})}
			>
				{objects.map((object, i) => (
					<option key={i} value={i}>
						{toStringFunction(object)}
					</option>
				))}
			</select>
		</label>
    )
}