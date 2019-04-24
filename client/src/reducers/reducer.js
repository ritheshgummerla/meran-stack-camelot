import uuid from "uuid";
import constants from "../constaints/constants";
const initialState = {
  name: "",
  items: [
    {
      id: uuid(),
      name: "egg"
    }
  ]
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.FETCH_EMAIL_SUCCESS:
      return {
        EmailList: action.payload
      };
    case constants.ONCHANGE_EVENT:
      const { event } = action;
      state.name = event.target.value;
      return { ...state };

    case constants.ON_NAME_SUBMIT_SUCCESS:
      const { payload } = action;
      return {
        data: payload
      };

    default:
      return state;
  }
};

export default rootReducer;
