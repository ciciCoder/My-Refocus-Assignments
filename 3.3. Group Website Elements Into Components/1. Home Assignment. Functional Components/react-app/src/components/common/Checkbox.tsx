import './Checkbox.css';
import 'animate.css';

interface CheckboxProps {
  label?: string;
  checked?: boolean;
  lineThroughLabel?: boolean;
  onChange?: (checked: boolean) => void;
}
const generateUniqueId = () => {
  const randomString =
    Math.random().toString(36).substring(2) + new Date().getTime().toString(36);
  return `checkbox_${randomString}`;
};
export default function Checkbox({
  checked,
  lineThroughLabel,
  label = '',
  onChange,
}: CheckboxProps) {
  const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = e => {
    onChange?.(e.target.checked);
  };
  const id = generateUniqueId();
  return (
    <div className="Checkbox">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        hidden
        onChange={onChangeHandler}
      />
      <label htmlFor={id}></label>
      <span>
        {lineThroughLabel && checked && (
          <div className="line-through animate__animated animate__slideInLeft"></div>
        )}
        {label}
      </span>
    </div>
  );
}
