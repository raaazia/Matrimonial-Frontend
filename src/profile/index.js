let flag = 3;

import jwt_decode from "jwt-decode";

import { elements } from "./base";

import {
  getFormInput,
  inputValidator,
  showError,
  renderBasicInfo,
  renderEBLform,
  renderInterestform,
  renderFamilyform,
  renderInfo,
  removeHeading,
  prepareUI,
  formatKey
} from "./view/profile_view";

import {
  getBasicInfo,
  postData,
  getData,
  uploadProfPic,
  updateOneDataEl
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
    setTimeout(() => {
      elements.profilePic.setAttribute(
        "src",
        `http://localhost:8000/img/user/${response.data.data.photo}`
      );
    }, 0);
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

// Get users input and post it to server...
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
    message = `${formatKey(message)} is not Allowed be Empaty.`;
    showError(message, type);
  }
}

// Clear storage to logout user
elements.logoutBtn.addEventListener("click", () => {
  localStorage.clear();
});

function spanToInputNdEditToSave(editBtn) {
  // conversion from Span to Input
  const span = editBtn.parentElement.children[1];
  const spanData = span.textContent;
  const heading = editBtn.parentElement.children[0];
  const input = document.createElement("input");
  input.autofocus = true;
  input.setAttribute("type", "text");
  input.setAttribute("id", "edit__input");
  input.value = spanData;
  editBtn.parentElement.replaceChild(input, span);

  // Conversion of edit btn into save btn
  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Save";
  saveBtn.setAttribute("id", "save__btn");
  saveBtn.className = "ml-auto";
  editBtn.parentElement.replaceChild(saveBtn, editBtn);
  return {
    heading,
    input,
    saveBtn,
    span
  };
}

function backToSpanAndEdit(span, val, input, saveBtn) {
  span.textContent = val;
  input.parentElement.replaceChild(span, input);
  saveBtn.style.display = "none";
  const editBtn =
    '<button id="edit__btn" class="ml-auto text-center">Edit</button>';
  span.parentElement.insertAdjacentHTML("beforeend", editBtn);
}

function createDataEl(input, heading, preKey) {
  const val = input.value;
  let key = heading.getAttribute("id");
  // if preKey (usersEbl, interestInfo, familyInfo) exit then prefix key with them
  if (preKey) key = `${preKey}.${key}`;

  const data = {
    [key]: val
  };
  if (data[key] < 1) {
    alert(
      `${heading.textContent.slice(
        0,
        heading.textContent.length - 2
      )} Should not be Empty...`
    );
    return;
  }
  return { data, val };
}

document.querySelector("#basic-info").addEventListener("click", e => {
  let editBtn = e.target.closest("#edit__btn");

  if (editBtn) {
    const { input, saveBtn, heading, span } = spanToInputNdEditToSave(editBtn);
    saveBtn.addEventListener("click", () => {
      const { data, val } = createDataEl(input, heading);

      console.log(data);
      postData(data, "basic", userId);
      backToSpanAndEdit(span, val, input, saveBtn);
    });
  }
});

// code to update users extended information
document.querySelector("#user-data").addEventListener("click", e => {
  const editBtn = e.target.closest("#edit__btn");
  const ebl = e.target.closest("#ebl");
  const interest = e.target.closest("#interest");
  const family = e.target.closest("#family");

  if (editBtn) {
    const { input, saveBtn, heading, span } = spanToInputNdEditToSave(editBtn);
    saveBtn.addEventListener("click", () => {
      if (ebl) {
        var { data, val } = createDataEl(input, heading, "usersEbl");
        updateOneDataEl(data, "ebl", userId);
      } else if (interest) {
        var { data, val } = createDataEl(input, heading, "userInterest");
        updateOneDataEl(data, "interest", userId);
      } else if (family) {
        var { data, val } = createDataEl(input, heading, "familyInfo");
        updateOneDataEl(data, "family", userId);
      }

      backToSpanAndEdit(span, val, input, saveBtn);
    });
  }
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
