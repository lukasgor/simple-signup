import React, { Component } from "react";
import { connect } from "react-redux";
import Consents from "./Consents";
import Error from "./Error";

class Signup extends Component {
  state = {
    email: "",
    error: null
  };
  async handleSubmit(e) {
    e.preventDefault();
    const { email } = this.state;
    const { consentSelected, history } = this.props;
    try {
      await fetch("https://reqres.in/api/users", {
        method: "POST",
        body: JSON.stringify({ email, consentSelected })
      });

      history.push("/thank-you");
    } catch (error) {
      this.setState({ error });
    }
  }

  handleEmailChange(value) {
    this.setState({
      email: value
    });
  }

  render() {
    const { error } = this.state;
    return (
      <form className="signup-form" onSubmit={this.handleSubmit.bind(this)}>
        <h1>Sign up now!</h1>
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={e => this.handleEmailChange(e.target.value)}
            id="email"
            type="email"
          />
        </div>
        <Consents />
        {error && <Error />}
        <button type="submit">Sign up</button>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    consentSelected: state.consents.selected
  };
};

export default connect(mapStateToProps)(Signup);
