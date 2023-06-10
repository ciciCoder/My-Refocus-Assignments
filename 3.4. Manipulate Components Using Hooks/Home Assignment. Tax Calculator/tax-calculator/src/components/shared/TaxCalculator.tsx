import { useState } from 'react';
import { MdCalculate } from 'react-icons/md';
import TaxRateSelector from './TaxRateSelector';
import 'animate.css';

export default function TaxCalculator() {
  const [income, setIncome] = useState<string>('');
  const [taxRate, setTaxRate] = useState<number>();
  const [taxResult, setTaxResult] = useState<string>();
  const [errorMsg, setErrorMsg] = useState('');
  const incomeChangeHandler: React.ChangeEventHandler<HTMLInputElement> = e => {
    setIncome(e.target.value);
  };

  const onCalculateIncomeHandler: React.DOMAttributes<HTMLButtonElement>['onClick'] =
    e => {
      setErrorMsg('');
      if (!income) return;
      const incomeVal = Number(income);
      if (isNaN(incomeVal)) return setErrorMsg('Please input numbers only.');
      if (incomeVal.toFixed(0).length > 7)
        return setErrorMsg('Maximum of 7 digits only.');
      const result = !incomeVal
        ? ''
        : (incomeVal * (taxRate ?? 0)).toLocaleString('en-PH', {
            style: 'currency',
            currency: 'PHP',
          });
      setTaxResult(result);
    };

  return (
    <div className="max-w-sm flex flex-col items-start gap-3 px-10 py-5 rounded border border-slate-200 shadow-md animate__animated animate__bounceInDown">
      <h1 className="w-full text-4xl text-slate-500 text-left font-bold flex gap-1 items-end">
        <MdCalculate size={35} />
        Tax Calculator
      </h1>
      <hr className="border-1 border-gray-200 w-full" />
      <h2 className="w-full text-2xl text-slate-500 text-left font-semibold">
        Tax Result:{' '}
        <span className="text-slate-600 font-bold">{taxResult}</span>
      </h2>
      <input
        type="text"
        value={income}
        placeholder="type income here..."
        onChange={incomeChangeHandler}
        className="w-full max-w-lg rounded border border-slate-200 px-4 py-2 hover:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500/40 active:ring active:ring-blue-500/40 font-medium text-slate-500"
      />
      <TaxRateSelector value={taxRate} onChange={setTaxRate} />
      <button
        onClick={onCalculateIncomeHandler}
        className="w-full border border-slate-200 text-slate-500 hover:bg-slate-200 active:bg-slate-500 active:text-white font-bold py-2 px-4 rounded"
      >
        Calculate My Income Tax
      </button>

      {errorMsg && (
        <div
          className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-left animate__animated animate__lightSpeedInRight"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <br />
          <span className="block sm:inline">{errorMsg}</span>
        </div>
      )}
    </div>
  );
}
