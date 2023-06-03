import {ReactNode} from 'react';
import './Button.css';

interface ButtonProps {
  slotContent: ReactNode;
  onClick?: React.DOMAttributes<HTMLButtonElement>['onClick'];
}

export default function Button({slotContent, onClick}: ButtonProps) {
  return (
    <button className="Button" onClick={onClick}>
      {slotContent}
    </button>
  );
}
