import { useFormContext } from "react-hook-form";

interface Props {
	options: Array<string>;
	disabled?: boolean;
	title?: string;
	name: string;
}

const Select: React.FC<Props> = ({
	options,
	title,
	disabled,
	name
}: Props) => {
	const { register, setValue } = useFormContext();

	return (
		<label>
			{title}
			<select
				className="input focus:border-none w-full"
				disabled={disabled}
				{...register(name, {
					onChange: (e) => setValue(name, e.target.value)
				})}
			>
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