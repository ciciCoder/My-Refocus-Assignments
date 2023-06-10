import React from 'react';
import { MdSearch } from 'react-icons/md';

const SearchInput = React.memo((props: JSX.IntrinsicElements['input']) => {
  const { ...attrs } = props;
  return (
    <div className="flex items-center w-[311px]">
      <input
        type="text"
        className="form-control rounded-none rounded-l-lg"
        placeholder="search..."
        {...attrs}
      />
      <div className="h-full flex items-center justify-center px-4 bg-primary text-white rounded-r-lg">
        <MdSearch className="text-3xl" />
      </div>
    </div>
  );
});

export default SearchInput;
