import React from 'react';

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

const TextArea = React.memo((props: TextAreaProps) => {
  const { id, label, ...attrs } = props;
  return (
    <div className="text-left">
      {label && (
        <label htmlFor={id} className="form-control-label text-left">
          {label}
        </label>
      )}
      <textarea
        id={id}
        name="title"
        className="form-control text-left"
        {...attrs}
      />
    </div>
  );
});

export default TextArea;
