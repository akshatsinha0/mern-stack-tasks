import React from 'react';
import useTypewriter from '../hooks/useTypewriter';

const Header = () => {
  const text = useTypewriter('ADVANCED EMI CALCULATOR', 120);

  return (
    <header className="header">
      <h1>
        {text}
        <span className="cursor">|</span>
      </h1>
      <h2>Calculate Home Loan EMI</h2>
      <p>
        Use our Home Loan Calculator to get insights on your loan plan! Just select an amount, 
        set an approximate interest rate and loan tenure. The Home Loan EMI Calculator will 
        estimate the monthly EMI amount & total interest payable till the end of the loan tenure.
      </p>
    </header>
  );
};

export default Header;
