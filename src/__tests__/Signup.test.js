import React from "react";
import { fireEvent, screen, wait } from "@testing-library/react";
import { Route } from "react-router-dom";
import { render } from "../helpers/tests";
import Signup from "../Signup";

const sampleEmail = "test@example.com";

beforeEach(() => {
  const mockSuccessResponse = {
    success: true
  };
  const mockJsonPromise = Promise.resolve(mockSuccessResponse);
  const mockFetchPromise = Promise.resolve({
    json: () => mockJsonPromise
  });
  jest.spyOn(global, "fetch").mockImplementation(() => mockFetchPromise);
});

afterEach(() => {
  global.fetch.mockClear();
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
  expect(global.fetch).toHaveBeenCalledWith("https://reqres.in/api/users", {
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
    success: false,
    status: 400
  };
  const mockJsonPromise = Promise.resolve(mockFailedResponse);
  const mockFetchPromise = Promise.reject({
    json: () => mockJsonPromise
  });
  jest.spyOn(global, "fetch").mockImplementation(() => mockFetchPromise);
  render(<Route exact path="/" component={Signup} />);
  fillTheForm();
  submitTheForm();
  await wait();
  expect(screen.getByText("Something went wrong.")).toBeInTheDocument();
});
