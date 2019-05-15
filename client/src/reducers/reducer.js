import uuid from "uuid";
import { toast } from "react-toastify";
import constants from "../constaints/constants";
const initialState = {
  name: "",
  items: [],
  validData:[],
  EmailList:[],
  IfileResponse:[],
  loading:true
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.FETCH_EMAIL_SUCCESS:
      return {
        ...state,
        EmailList: action.payload
      };
    case constants.ONCHANGE_EVENT:
      const { event } = action;
      state.name = event.target.value;
      return { ...state };

    case constants.ON_NAME_SUBMIT_SUCCESS:
      const { payload } = action;
      return {
        ...state,
        data: payload
      };
      case constants.ON_VALID_SUCCESS:
      return {
        ...state,
        validData: action.payload
      };
      case constants.ON_REQUEST_DATA_SUCCESS:
      
      toast.success("Downloaded Successfully");
      return {
        ...state,
        loading:false,
        IfileResponse: action.payload
      };


    default:
      return state;
  }
};

export default rootReducer;
