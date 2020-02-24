let flag = 3;
import jwt_decode from "jwt-decode";

import { elements } from "./base";

import {
  getFormInput,
  inputValidator,
  showError,
  formatMessage,
  renderBasicInfo,
  renderEBLform,
  renderInterestform,
  renderFamilyform,
  renderInfo,
  removeHeading,
  prepareUI
} from "./view/profile_view";

import { getBasicInfo, postData, getData } from "./model/Profile_model";

var token = localStorage.getItem("x-auth-toke");
const userId = jwt_decode(token).id;

// Users basic info including name, email etc....
getAndRenderBasicInfo();
async function getAndRenderBasicInfo() {
  // Get basic information from database
  const info = await getBasicInfo("basic", userId);
  // Render Basic information
  renderBasicInfo(info.data);
}

// Users Education, Basics and Lifestyle information etc....
queryDbAndRender("ebl");
queryDbAndRender("interest");
queryDbAndRender("family");

async function queryDbAndRender(infoType) {
  const result = await getData(infoType, userId);
  console.log(result);
  // if status fails show forms on UI to get information...
  if (result.data.status === "fail") {
    if (infoType === "ebl") renderEBLform();
    if (infoType === "interest") renderInterestform();
    if (infoType === "family") renderFamilyform();
  } else if (result.data.status === "success") {
    // if data is present in  database then show data on UI
    renderInfo(result, infoType);
    --flag;
    if (flag === 0) {
      removeHeading();
    }
  }
}

// education basics and lifestyle Details
elements.formsParent.addEventListener("click", async e => {
  e.preventDefault();
  const btn = e.target.closest("#ebl_submit_btn");
  if (btn) {
    getAndPostData("ebl", userId);
  }
});

// Users interest Details
elements.formsParent.addEventListener("click", async e => {
  e.preventDefault();
  const btn = e.target.closest("#interest_submit_btn");
  if (btn) {
    getAndPostData("interest", userId);
  }
});

// Family Details
elements.formsParent.addEventListener("click", async e => {
  e.preventDefault();
  const btn = e.target.closest("#family_submit_btn");
  if (btn) {
    getAndPostData("family", userId);
  }
});

async function getAndPostData(type, userID) {
  const result = getFormInput(`${type}_info`);

  // validate input
  let message = inputValidator(result); //return name of invalid field or will return true
  if (message === true) {
    // If valid Post data to server...
    const response = await postData(result, type, userID);
    if (response) {
      prepareUI(type);
      queryDbAndRender(type);
    }
  } else {
    message = formatMessage(message);
    showError(message, type);
  }
}
