import constants from "../constaints/constants";

const getEmailList = () => ({
  type: constants.FETCH_EMAIL_REQUEST
});
const onChange = (e) => ({
  type: constants.ONCHANGE_EVENT,
  event:e
});
const onsubmit = (name) => ({
  type: constants.ON_NAME_SUBMIT,
  name:name
});

export {getEmailList,onChange,onsubmit };