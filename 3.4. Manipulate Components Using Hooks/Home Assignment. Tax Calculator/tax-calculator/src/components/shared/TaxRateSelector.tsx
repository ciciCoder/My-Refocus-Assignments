interface TaxRateSelectorProps {
  value?: number;
  onChange: (value?: number) => void;
}

export default function TaxRateSelector({
  value,
  onChange,
}: TaxRateSelectorProps) {
  const options = [0.1, 0.15, 0.2, 0.3];
  const taxRate = value;

  const onChangeSelectHandler: React.SelectHTMLAttributes<HTMLSelectElement>['onChange'] =
    e => {
      const val = Number(e.target.value);
      const nvalue = isNaN(val) ? undefined : val;
      onChange?.(nvalue);
    };

  return (
    <>
      <select
        value={taxRate}
        onChange={onChangeSelectHandler}
        className="w-full max-w-lg rounded border border-slate-200 px-4 py-2 hover:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500/40 active:ring active:ring-blue-500/40 font-medium text-slate-500"
      >
        <option value={undefined}>Select Tax rate</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option * 100}%
          </option>
        ))}
      </select>
    </>
  );
}
