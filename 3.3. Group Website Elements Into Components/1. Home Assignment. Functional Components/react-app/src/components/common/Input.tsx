import './Input.css';

type InputValue = React.InputHTMLAttributes<HTMLInputElement>['value'];
interface InputProps<T extends InputValue> {
  type?: string;
  label?: string;
  className?: string;
  value: T;
  placeholder?: string;
  onChange: (value: T) => void;
}

export default function Input<T extends InputValue>({
  type = 'text',
  label = '',
  value,
  className = '',
  placeholder,
  onChange,
}: InputProps<T>) {
  const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = e => {
    const targetValue =
      typeof value === 'number' ? Number(e.target.value) : e.target.value;
    return onChange(targetValue as T);
  };

  return (
    <div className={'Input ' + className}>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChangeHandler}
      />
    </div>
  );
}
