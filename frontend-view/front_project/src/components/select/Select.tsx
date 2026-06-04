
interface SelectProps {
  name: string;

  value: string | number;

  onChange: (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => void;
  classname?: string;
  options: {
    label: string;
    value: string | number;
  }[];
}

export default function Select({
  name,
  value,
  onChange,
  classname,
  options,
}: SelectProps) {
  return (
    <select
      name={name}
      value={value || ""}
      onChange={onChange}
      className={classname}
    >
      <option value="">
        Select Option
      </option>

      {options.map((option,index) => (
        <option
          key={index}
          value={option.value}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
}