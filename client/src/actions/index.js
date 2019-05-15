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
const onValidate = (id) => ({
  type: constants.ON_VALIDATE,
  id:id
});

const ifileRequest = (requestData) => ({
  type: constants.ON_REQUEST_DATA,
  data:requestData
});

export {getEmailList,onChange,onsubmit,onValidate,ifileRequest };