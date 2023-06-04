import React from "react";
import { useFormContext } from "react-hook-form";

interface Props {
	type: "text" | "password" | "email" | "number" | "time" | "date" | "radio";
	placeholder?: string;
	label?: string;
	name: string;
	onChange?: (value: any) => void;
}

const TextField: React.FC<Props> = ({
	type,
	placeholder,
	label,
	name,
	onChange,
}: any) => {
	const { register } = useFormContext();

	return (
		<label className="truncate">
			<div><span>{label}</span></div>
			<input
				className="w-full text-zinc-500 w-100 justify-between rounded-lg p-2 mt-1 bg-white"
				type={type}
				placeholder={placeholder}
				{...register(name, {
					valueAsNumber: type === "number" ? true : false,
					onChange: (e: any) => {
						if (onChange)
							onChange(e)
					}
				})}
			/>
		</label>
	);
};

export default TextField;