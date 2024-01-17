import { fireEvent, render, screen } from "@testing-library/react";
import LoanForm from "./LoanForm";

describe("loan form", () => {
  it("renders all the form fields", async () => {
    render(<LoanForm />);
    const amountLabel = screen.getByText("Amount:");
    const interestRateLabel = screen.getByText("Interest Rate (%):");
    const instalmentLabel = screen.getByText("Instalment:");
    const emailLabel = screen.getByText("Email:");

    const amountInput = screen.getByTestId("amount");
    const interestInput = screen.getByTestId("interestRate");
    const instalmentInput = screen.getByTestId("instalment");
    const emailInput = screen.getByTestId("email");
    const loanForm = screen.getByTestId("loan_form");
    const submitButton = screen.getByTestId("loan_submit_button");

    expect(loanForm).toBeInTheDocument();
    expect(amountLabel).toBeInTheDocument();
    expect(interestRateLabel).toBeInTheDocument();
    expect(instalmentLabel).toBeInTheDocument();
    expect(emailLabel).toBeInTheDocument();

    expect(amountInput).toBeInTheDocument();
    expect(interestInput).toBeInTheDocument();
    expect(instalmentInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    fireEvent.change(amountInput, { target: { value: 100 } });
    expect(amountInput).toHaveValue(100);

    fireEvent.change(interestInput, { target: { value: 101 } });
    expect(interestInput).toHaveValue(101);
    const interestRateErrorMessage = screen.getByText(
      "Interest rate must be a number between 0 and 100"
    );

    expect(interestRateErrorMessage).toBeInTheDocument();
    fireEvent.change(instalmentInput, { target: { value: 100 } });
    expect(instalmentInput).toHaveValue(100);
    const loanTermErrorMessage = screen.getByText(
      "Loan Term (instalment) must be a number between 0 and 30"
    );

    expect(loanTermErrorMessage).toBeInTheDocument();
    fireEvent.change(emailInput, { target: { value: "invalid email" } });
    expect(emailInput).toHaveValue("invalid email");
    const invalidEmailErrorMessage = screen.getByText("Invalid email address");
    expect(invalidEmailErrorMessage).toBeInTheDocument();
  });
});
