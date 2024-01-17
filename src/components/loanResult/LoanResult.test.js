import { render, screen } from "@testing-library/react";
import LoanResult from "./LoanResult";

describe("loan result", () => {
  it("renders the emi amount correctly", async () => {
    render(<LoanResult emi={15000} />);
    
    const emiAmount = screen.getByTestId("emi_amount");
    expect(emiAmount).toBeInTheDocument();
    expect(emiAmount).toHaveTextContent(15000);
  });
});
