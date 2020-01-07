import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Consents = () => {
  const dispatch = useDispatch();
  const consent = useSelector(state => state.consents.consent);
  return (
    <div>
      <input
        onChange={e => {
          dispatch({ type: "CHANGE_SELECTED", payload: e.target.checked });
        }}
        type="checkbox"
        id="consent"
      />
      <label htmlFor="consent">{consent}</label>
    </div>
  );
};

export default Consents;
