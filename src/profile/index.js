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

import {
  getBasicInfo,
  postData,
  getData,
  uploadProfPic,
  getImage
} from "./model/Profile_model";

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

// Get and uplaod Upload profile pic
elements.userAvatar.addEventListener("change", async () => {
  const input = document.querySelector("#user-avatar").files[0];
  const form = new FormData();
  form.append("photo", input);
  const response = await uploadProfPic("profilePic", form, userId);
  if (response.status === 200) {
    // console.log(response.status);
    // console.log(response.data.data.photo);
    setTimeout(() => {
      elements.profilePic.setAttribute(
        "src",
        `http://localhost:8000/img/user/${response.data.data.photo}`
      );
    }, 500);
    // const image = await getImage();
    // console.log(image);
    // showImage();
  }
});

// Users Education, Basics and Lifestyle information etc....
queryDbAndRender("ebl");
queryDbAndRender("interest");
queryDbAndRender("family");

async function queryDbAndRender(infoType) {
  const result = await getData(infoType, userId);
  // console.log(result);
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

elements.logoutBtn.addEventListener("click", () => {
  localStorage.clear();
});

// const Uppy = require("@uppy/core");
// const FileInput = require("@uppy/file-input");
// const ThumbnailGenerator = require("@uppy/thumbnail-generator");
// const uppy = new Uppy({ debug: true, autoProceed: false });

// uppy.use(ThumbnailGenerator, {
//   thumbnailWidth: 300,
//   // thumbnailHeight: 200 // optional, use either width or height,
//   waitForThumbnailsBeforeUpload: false
// });
// const fileInput = document.querySelector("#prof-pic");
// fileInput.addEventListener("change", event => {
//   const files = Array.from(event.target.files);

//   files.forEach(file => {
//     try {
//       uppy.addFile({
//         source: "file input",
//         name: file.name,
//         type: file.type,
//         data: file
//       });
//     } catch (err) {
//       if (err.isRestriction) {
//         // handle restrictions
//         console.log("Restriction error:", err);
//       } else {
//         // handle other errors
//         console.error(err);
//       }
//     }
//   });
// });

// uppy.on("file-added", file => {
//   const id = file.id;
//   console.log(file);
//   console.log("Added file", file.id);
// });

// uppy.on("thumbnail:generated", (file, preview) => {
//   document.querySelector("#whatever").setAttribute("src", preview);
//   console.log("done");
// });
