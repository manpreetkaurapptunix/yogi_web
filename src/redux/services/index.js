import { AlternateEmail } from "@mui/icons-material";
import { getCookie } from "cookies-next";
import * as Service from "../../constants/service";

export const postApi = async (body, url, tempToken) => {
  const token = getCookie("token");

  try {
    const response = await Service.post(
      url,
      token ? token : tempToken ? tempToken : "",
      body
    );
    return response;
  } catch (error) {
    return { message: error };
  }
};

export const getApi = async (body, url) => {
  const token = getCookie("token");

  try {
    const response = await Service.get(url, token || "", body || "");
    return response;
  } catch (error) {
    return { message: error };
  }
};

export const multipartFormApi = async (body, url) => {
  const token = getCookie("token");

  try {
    const response = await Service.uploadImageApi(url, token, body);

    return response;
  } catch (error) {
    return { message: error };
  }
};

export const putApi = async (body, url, tempToken) => {
  const token = getCookie("token");
  try {
    const response = await Service.put(url, token, body);
    if (response) {
      // console.log(response, `${url}-----------`);
    }
    return response;
  } catch (error) {
    // console.log(error, ‘err-----------’);
    return { message: error };
  }
};

export const delete_form = async (url) => {
  const token = getCookie("token");
  try {
    const response = await Service.del(url, token);
    if (response) {
    }
    return response;
  } catch (error) {
    return { message: error };
  }
};

export const getHomeApi = async (body, url) => {
  const token = getCookie("token");

  try {
    const response = await Service.getHome(url, token || "", body || "");
    return response;
  } catch (error) {
    return { message: error };
  }
};
