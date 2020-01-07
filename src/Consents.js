import React from "react";
import { connect } from "react-redux";

const Consents = ({ consent, selected, dispatch }) => {
  return (
    <div>
      <input
        onChange={e => {
          dispatch({ type: "CHANGE_SELECTED", payload: e.target.checked });
        }}
        type="checkbox"
        id="consent"
        checked={selected}
      />
      <label htmlFor="consent">{consent}</label>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    consent: state.consents.consent
  };
};

export default connect(mapStateToProps)(Consents);
