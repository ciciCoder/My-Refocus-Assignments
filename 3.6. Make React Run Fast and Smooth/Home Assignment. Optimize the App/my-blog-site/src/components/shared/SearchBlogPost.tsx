import React from 'react';
import Input from '../common/Input';

export default function SearchBlogPost() {
  const onChangeHandler = () => {};

  return (
    <div>
      <Input label="Search" onChange={onChangeHandler}></Input>
    </div>
  );
}
