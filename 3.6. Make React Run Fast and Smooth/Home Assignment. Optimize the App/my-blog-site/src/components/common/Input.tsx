import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props: InputProps, ref) => {
    const { id, label, ...attrs } = props;
    return (
      <div className="text-left">
        {label && (
          <label htmlFor={id} className="form-control-label text-left">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          name="title"
          type="text"
          className="form-control text-left"
          {...attrs}
        />
      </div>
    );
  }
);
export default Input;
