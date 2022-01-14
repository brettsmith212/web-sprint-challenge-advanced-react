import React from "react";
import MutationObserver from "mutationobserver-shim";
import { render, screen } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";
import userEvent from "@testing-library/user-event";

// Write up the two tests here and make sure they are testing what the title shows

test("renders without errors", () => {
  render(<CheckoutForm />);
});

test("shows success message on submit with form details", () => {
  render(<CheckoutForm />);

  const firstNameInput = "Brett";
  const lastNameInput = "Smith";
  const addressInput = "123 Fake St.";
  const cityInput = "Seattle";
  const stateInput = "WA";
  const zipInput = "12345";

  const firstName = screen.getByLabelText(/First Name/i);
  const lastName = screen.getByLabelText(/Last Name/i);
  const address = screen.getByLabelText(/Address/i);
  const city = screen.getByLabelText(/City/i);
  const state = screen.getByLabelText(/State/i);
  const zip = screen.getByLabelText(/Zip/i);
  const button = screen.getByRole("button");

  userEvent.type(firstName, firstNameInput);
  userEvent.type(lastName, lastNameInput);
  userEvent.type(address, addressInput);
  userEvent.type(city, cityInput);
  userEvent.type(state, stateInput);
  userEvent.type(zip, zipInput);
  userEvent.click(button);

  const nameOutput = screen.getByText(`${firstNameInput} ${lastNameInput}`);
  const addressOutput = screen.getByText(addressInput);
  const cityStateZipOutput = screen.getByText(
    `${cityInput}, ${stateInput} ${zipInput}`
  );

  const success = screen.getByTestId("successMessage");
  expect(success).toBeInTheDocument();
  expect(nameOutput).toBeInTheDocument();
  expect(addressOutput).toBeInTheDocument();
  expect(cityStateZipOutput).toBeInTheDocument();
});
