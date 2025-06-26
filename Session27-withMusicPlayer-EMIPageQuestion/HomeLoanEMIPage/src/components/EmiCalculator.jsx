import React, { useState, useEffect } from 'react';
import EmiResults from './EmiResults';

const EmiCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(16046829);
  const [interestRate, setInterestRate] = useState(7);
  const [tenure, setTenure] = useState(13);
  const [selectedRange, setSelectedRange] = useState('1-5');
  const [emiData, setEmiData] = useState(null);

  
  useEffect(() => {
    calculateEMI();
  }, [loanAmount, interestRate, tenure]);

  const calculateEMI = () => {
    const P = parseFloat(loanAmount);
    const r = parseFloat(interestRate) / 12 / 100;
    const n = parseFloat(tenure) * 12;

    if (P <= 0 || r <= 0 || n <= 0) return;

    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalAmount = emi * n;
    const totalInterest = totalAmount - P;

    setEmiData({
      monthlyEMI: emi,
      totalAmount: totalAmount,
      totalInterest: totalInterest,
      principalAmount: P
    });
  };

  const handleRangeChange = (range) => {
    setSelectedRange(range);
    switch (range) {
      case '0-1':
        setLoanAmount(Math.min(loanAmount, 10000000));
        break;
      case '1-5':
        setLoanAmount(Math.max(10000000, Math.min(loanAmount, 50000000)));
        break;
      case '5-30':
        setLoanAmount(Math.max(50000000, loanAmount));
        break;
      default:
        break;
    }
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-IN').format(Math.round(num));
  };

  const getSliderMax = () => {
    switch (selectedRange) {
      case '0-1':
        return 10000000;
      case '1-5':
        return 50000000;
      case '5-30':
        return 300000000;
      default:
        return 10000000;
    }
  };

  const getSliderMin = () => {
    switch (selectedRange) {
      case '0-1':
        return 0;
      case '1-5':
        return 10000000;
      case '5-30':
        return 50000000;
      default:
        return 0;
    }
  };

  return (
    <div className="main-panel">
      <div className="form-panel">
        <div className="form-section">
          <h3>Select the loan amount range</h3>
          <div className="loan-range-selection">
            <div className="range-option">
              <input
                type="radio"
                id="range-0-1"
                name="loanRange"
                value="0-1"
                checked={selectedRange === '0-1'}
                onChange={() => handleRangeChange('0-1')}
              />
              <label htmlFor="range-0-1">₹ 0 - 1 Crore</label>
            </div>
            <div className="range-option">
              <input
                type="radio"
                id="range-1-5"
                name="loanRange"
                value="1-5"
                checked={selectedRange === '1-5'}
                onChange={() => handleRangeChange('1-5')}
              />
              <label htmlFor="range-1-5">₹ 1 Crore - 5 Crore</label>
            </div>
            <div className="range-option">
              <input
                type="radio"
                id="range-5-30"
                name="loanRange"
                value="5-30"
                checked={selectedRange === '5-30'}
                onChange={() => handleRangeChange('5-30')}
              />
              <label htmlFor="range-5-30">₹ 5 Crore - 30 Crore</label>
            </div>
          </div>
        </div>

        <div className="input-group">
          <label className="input-label">Loan Amount</label>
          <input
            type="number"
            className="input-field"
            value={loanAmount}
            min={getSliderMin()}
            max={getSliderMax()}
            onChange={e => {
              const val = parseInt(e.target.value) || 0;
              setLoanAmount(Math.max(getSliderMin(), Math.min(getSliderMax(), val)));
            }}
          />
          <div className="slider-container">
            <input
              type="range"
              className="slider-input"
              min={getSliderMin()}
              max={getSliderMax()}
              value={loanAmount}
              onChange={(e) => setLoanAmount(parseInt(e.target.value))}
            />
            <div className="slider-labels">
              <span>₹{formatNumber(getSliderMin())}</span>
              <span>₹{formatNumber(getSliderMax())}</span>
            </div>
          </div>
        </div>

        <div className="input-group">
          <label className="input-label">Illustrative Interest Rate p.a.</label>
          <input
            type="number"
            className="input-field"
            value={interestRate}
            min={1}
            max={20}
            step={0.1}
            onChange={e => {
              const val = parseFloat(e.target.value) || 0;
              setInterestRate(Math.max(1, Math.min(20, val)));
            }}
          />
          <div className="slider-container">
            <input
              type="range"
              className="slider-input"
              min="1"
              max="20"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(parseFloat(e.target.value))}
            />
            <div className="slider-labels">
              <span>1%</span>
              <span>5%</span>
              <span>15%</span>
              <span>20%</span>
            </div>
          </div>
        </div>

        <div className="input-group">
          <label className="input-label">Tenure (Months/Years)</label>
          <input
            type="number"
            className="input-field"
            value={tenure}
            min={1}
            max={30}
            onChange={e => {
              const val = parseInt(e.target.value) || 0;
              setTenure(Math.max(1, Math.min(30, val)));
            }}
          />
          <div className="slider-container">
            <input
              type="range"
              className="slider-input"
              min="1"
              max="30"
              value={tenure}
              onChange={(e) => setTenure(parseInt(e.target.value))}
            />
            <div className="slider-labels">
              <span>1 year</span>
              <span>30 year</span>
            </div>
          </div>
        </div>
      </div>

      <div className="results-panel">
        {emiData && <EmiResults data={emiData} />}
      </div>
    </div>
  );
};

export default EmiCalculator;
