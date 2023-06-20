import { useFormContext } from "react-hook-form";

interface Props {
	options: Array<string>;
	title?: string;
	name: string;
	includeEmptyOption?: boolean;
}

const Select: React.FC<Props> = ({
	options,
	title,
	name,
	includeEmptyOption
}: Props) => {
	const { register, setValue } = useFormContext();

	return (
		<label>
			<div><span>{title}</span></div>
			<select
				className="w-full rounded-lg p-2 mt-1 focus:border-none"
				{...register(name, {
					onChange: (e) => setValue(name, e.target.value)
				})}
			>
				{includeEmptyOption && (
					<option value={""}></option>
				)}
				{options.map((opt, i) => (
					<option key={i} value={opt}>
						{opt}
					</option>
				))}
			</select>
		</label>
	);
};

export default Select;