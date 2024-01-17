import React, { useState } from "react";
import LoanResult from "../../components/loanResult/LoanResult";
import LoanForm from "../../components/loanForm/LoanForm";
import "./Loan.css";

const Loan = () => {
  const [emi, setEmi] = useState();

  const onSubmitLoanRequest = (emi) => {
    const roundedEmiAmount = Math.round(emi * 100) / 100;
    setEmi(roundedEmiAmount);
  };

  return (
    <div className="loan_form">
      <h2>Loan Calculator</h2>
      <LoanForm onSubmitLoanRequest={onSubmitLoanRequest} />
      {emi && <LoanResult emi={emi} />}
    </div>
  );
};

export default Loan;
