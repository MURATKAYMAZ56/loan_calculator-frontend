import React, { useState } from "react";
import "./LoanForm.css";

const initialForm = {
  amount: "",
  instalment: "",
  interestRate: "",
  email: "",
};

const LoanForm = ({ onSubmitLoanRequest }) => {
  const [formData, setFormData] = useState(initialForm);

  const [errors, setErrors] = useState({
    amount: "",
    instalment: "",
    interestRate: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let errorMessage = "";

    switch (name) {
      case "amount":
        errorMessage = validateAmount(value);
        break;
      case "instalment":
        errorMessage = validateInstalment(value);
        break;
      case "interestRate":
        errorMessage = validateinterestRate(value);
        break;
      case "email":
        errorMessage = validateEmail(value);
        break;
      default:
        break;
    }

    setErrors({
      ...errors,
      [name]: errorMessage,
    });
  };

  const validateAmount = (value) => {
    if (isNaN(value) || value < 0 || value % 1 !== 0) {
      return "Amount value  must be a non-negative integer";
    }
    return "";
  };

  const validateInstalment = (value) => {
    if (isNaN(value) || value < 1 || value > 30) {
      return "Loan Term (instalment) must be a number between 0 and 30";
    }
    return "";
  };

  const validateinterestRate = (value) => {
    if (isNaN(value) || value < 0 || value > 100) {
      return "Interest rate must be a number between 0 and 100";
    }
    return "";
  };

  const validateEmail = (value) => {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return "Invalid email address";
    }
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if there are any errors before submitting
    if (Object.values(errors).every((error) => error === "")) {
      fetch("http://localhost:8080/api/loans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          setFormData(initialForm);
          return response.json();
        })
        .then((loanResponse) => onSubmitLoanRequest(loanResponse.emi))
        .catch((error) =>
          console.error("Error occurred during form submission:", error)
        );
    } else {
      console.log("Form submission failed. Please fix errors.");
    }
  };

  return (
    <form className="form" data-testid="loan_form" onSubmit={handleSubmit}>
        <div className="form_element">
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            data-testid="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
          <span className="loan_error">{errors.amount}</span>
        </div>
        <div className="form_element">
          <label htmlFor="instalment">Instalment:</label>
          <input
            type="number"
            id="instalment"
            data-testid="instalment"
            name="instalment"
            value={formData.instalment}
            onChange={handleChange}
            required
          />
          <span className="loan_error">{errors.instalment}</span>
        </div>
        <div className="form_element">
          <label htmlFor="interestRate">Interest Rate (%):</label>
          <input
            type="number"
            id="interestRate"
            data-testid="interestRate"
            name="interestRate"
            value={formData.interestRate}
            onChange={handleChange}
            required
          />
          <span className="loan_error">{errors.interestRate}</span>
        </div>
        <div className="form_element">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            data-testid="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <span className="loan_error">{errors.email}</span>
        </div>
        <button
          data-testid="loan_submit_button"
          className="loan_submit"
          type="submit"
        >
          Submit
        </button>
      </form>
  );
};

export default LoanForm;
