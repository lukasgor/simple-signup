const initialState = {
  consent: "I want to receive marketing emails.",
  selected: false
};

const consentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_SELECTED":
      return {
        ...state,
        selected: action.payload
      };
    default:
      return state;
  }
};

export default consentsReducer;
