import React from "react";
import { fireEvent, screen, wait } from "@testing-library/react";
import { Route } from "react-router-dom";
import { render } from "../helpers/tests";
import Signup from "../Signup";

const sampleEmail = "test@example.com";

let mockFetch;

beforeEach(() => {
  const mockSuccessResponse = {
    json: () =>
      Promise.resolve({
        success: true
      })
  };
  mockFetch = jest
    .spyOn(global, "fetch")
    .mockResolvedValue(mockSuccessResponse);
});

afterEach(() => {
  mockFetch.mockClear();
});

const fillTheForm = () => {
  const emailInput = screen.getByLabelText("Email");
  fireEvent.change(emailInput, {
    target: { value: sampleEmail }
  });
};

const submitTheForm = () => {
  const signUpButton = screen.getByText("Sign up");
  fireEvent.click(signUpButton);
};

it("sends proper data", () => {
  render(<Route exact path="/" component={Signup} />, {
    initialState: {
      consents: {
        consent: "I agree",
        consentsSelected: false
      }
    }
  });
  fillTheForm();
  const consent = screen.getByLabelText("I agree");
  fireEvent.click(consent);
  submitTheForm();
  expect(mockFetch).toHaveBeenCalledWith("https://reqres.in/api/users", {
    method: "POST",
    body: JSON.stringify({ email: sampleEmail, consentSelected: true })
  });
});

it("redirects to thank-you page", async () => {
  const { history } = render(<Route exact path="/" component={Signup} />);
  fillTheForm();
  submitTheForm();
  await wait();
  expect(history.location.pathname).toBe("/thank-you");
});

it("displays error when request fails", async () => {
  const mockFailedResponse = {
    json: () =>
      Promise.resolve({
        success: false,
        status: 400
      })
  };
  mockFetch.mockRejectedValueOnce(mockFailedResponse);
  render(<Route exact path="/" component={Signup} />);
  fillTheForm();
  submitTheForm();
  await wait();
  expect(screen.getByText("Something went wrong.")).toBeInTheDocument();
});
