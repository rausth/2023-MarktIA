import { useFormContext } from "react-hook-form";

interface SelectOption {
	label: string;
	value: string;
}

export function getSelectOptionsOfEnum(e: any) {
	let list: SelectOption[] = [];
	const keys = Object.keys(e);
	const values = Object.values(e);

	keys.map((key: string, index: number) => {
		list.push({
			label: key,
			value: values[index] as string
		})
	});

	return list;
}

interface Props {
	options: Array<SelectOption>;
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
					<option key={i} value={opt.value}>
						{opt.value}
					</option>
				))}
			</select>
		</label>
	);
};

export default Select;