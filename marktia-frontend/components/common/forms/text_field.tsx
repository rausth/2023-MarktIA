import React from "react";
import { useFormContext } from "react-hook-form";

interface Props {
	type: "text" | "password" | "email" | "number" | "time" | "date" | "radio";
	placeholder?: string;
	label?: string;
	sulfix?: React.ReactNode;
	name: string;
	disabled?: boolean;
}

const TextField: React.FC<Props> = ({
	type,
	placeholder,
	label,
	sulfix,
	name,
	disabled
}: any) => {
	const { register } = useFormContext();

	return (
		<label className="truncate">
			<span className="w-full truncate">{label}</span>
			<div className={`flex items-center text-zinc-500 w-100 justify-between ${disabled ? "bg-zinc-50 border border-gray-200 p-2 rounded-lg h-[40px]" : "input"}`}>
				<input
					className="w-full"
					type={type}
					placeholder={placeholder}
					disabled={disabled}
					{...register(name, {
						valueAsNumber: type === "number" ? true : false
					})}
				/>
				{sulfix}
			</div>
		</label>
	);
};

export default TextField;