import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Consents from "./Consents";
import Error from "./Error";

const Signup = () => {
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState(null);
  const history = useHistory();
  const consentSelected = useSelector(({ consents }) => consents.selected);
  const handleSubmit = React.useCallback(
    async e => {
      e.preventDefault();

      try {
        await fetch("https://reqres.in/api/users", {
          method: "POST",
          body: JSON.stringify({ email, consentSelected })
        });

        history.push("/thank-you");
      } catch (error) {
        setError(error);
      }
    },
    [email, consentSelected, history]
  );
  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <h1>Sign up now!</h1>
      <div>
        <label htmlFor="email">Email</label>
        <input
          onChange={e => setEmail(e.target.value)}
          id="email"
          type="email"
        />
      </div>
      <Consents />
      {error && <Error />}
      <button type="submit">Sign up</button>
    </form>
  );
};

export default Signup;
