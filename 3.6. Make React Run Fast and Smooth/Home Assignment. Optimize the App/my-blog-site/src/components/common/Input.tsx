import React from 'react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = React.memo((props: InputProps) => {
  const { id, label, ...attrs } = props;
  return (
    <div className="text-left">
      {label && (
        <label htmlFor={id} className="form-control-label">
          {label}
        </label>
      )}
      <input
        id={id}
        name="title"
        type="text"
        className="form-control"
        {...attrs}
      />
    </div>
  );
});

export default Input;
