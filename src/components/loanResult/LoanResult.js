import React from "react";
import "./LoanResult.css";

const LoanResult = ({ emi }) => {
  return (
    <div className="loan_result">
      <h2>Your EMI</h2>
      <div className="loan_emi" data-testid="emi_amount">
        {emi}
      </div>
      {}
    </div>
  );
};

export default LoanResult;
