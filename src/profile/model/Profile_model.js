import axios from "axios";
import { showError } from "./../view/profile_view";

export const uploadProfPic = async (resource, data, userId) => {
  try {
    let response = await axios.patch(
      `http://localhost:8000/v1/api/users/${resource}/${userId}`,
      data
    );
    return response;
  } catch (ex) {
    console.log(ex);
  }
};

export const getImage = async () => {
  try {
    let response = await axios.get(
      `http://localhost:8000/img/user/userName-1582717102157.jpeg`
    );
    return response;
  } catch (ex) {
    console.log(ex);
  }
};

export const getBasicInfo = async (resource, userId) => {
  try {
    let response = await axios.get(
      `http://localhost:8000/v1/api/users/${resource}/${userId}`
    );
    return response;
  } catch (ex) {
    console.log(ex);
  }
};

export async function postData(data, resource, userId) {
  try {
    // send a post request to api
    let response = await axios.patch(
      `http://localhost:8000/v1/api/users/${resource}/${userId}`,
      data
    );
    console.log(response);
    return response;
  } catch (ex) {
    // log the exception on console
    console.log(ex);

    // if there is any error in input send it to UI
    if (ex.response) {
      showError(ex.response.data.message, resource);
      console.log(ex.response.data.message, resource);
    }
  }
}

export async function getData(resource, userId) {
  try {
    let response = await axios.get(
      `http://localhost:8000/v1/api/users/${resource}/${userId}`
    );
    console.log(response);
    return response;
  } catch (ex) {
    console.log(ex);
  }
}

export async function updateOneDataEl(data, resource, userId) {
  try {
    let response = await axios.post(
      `http://localhost:8000/v1/api/users/${resource}/${userId}`,
      data
    );
    return response;
  } catch (ex) {
    console.log(ex);
  }
}
