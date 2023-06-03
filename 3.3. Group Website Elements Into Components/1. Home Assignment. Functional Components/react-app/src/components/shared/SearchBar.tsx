import Button from '../common/Button';
import Input from '../common/Input';
import './SearchBar.css';
import {MdSearch} from 'react-icons/md';

type InputValue = React.InputHTMLAttributes<HTMLInputElement>['value'];

interface SearchBarProps<T> {
  value: T;
  onChange: (value: T) => void;
  onClick?: React.DOMAttributes<HTMLButtonElement>['onClick'];
}

export default function SearchBar<T extends InputValue>({
  value,
  onChange,
  onClick,
}: SearchBarProps<T>) {
  return (
    <div className="SearchBar">
      <Input
        className="search-input"
        type="text"
        label="Search"
        value={value}
        placeholder="Search..."
        onChange={onChange}
      ></Input>
      <Button slotContent={<MdSearch size={27} />}></Button>
    </div>
  );
}
