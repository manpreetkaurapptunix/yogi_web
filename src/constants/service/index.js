import { deleteCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { resetAuth } from "../../redux/actions";
import * as Url from "../urls";

export const get = async (url, token, body) => {
  var headers;
  if (token == "" || token == null || token == undefined) {
    headers = {
      "Content-Type": "application/json",
    };
  } else {
    headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }
  const completeUrl = Url.BASE_URL + url;
  // console.log({ completeUrl });

  try {
    const res = await fetch(completeUrl, {
      method: "GET",
      headers,
    });
    const response = await res.json();

    if (response.statusCode == 401) {
      deleteCookie("token");
      deleteCookie("type");
      deleteCookie("userData");

      window?.location?.replace("/");
    }

    return response;
  } catch (error) {
    console.log(error, ">>>>>>>>>>");
    return error;
  }
};

export const getoldchat = async (url, token, hide = false) => {
  var headers;
  if (token == "" || token == null || token == undefined) {
    headers = {
      "Content-Type": "application/json",
    };
  } else {
    headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }
  const completeUrl = Url.BASE_URL + url;
  console.log("completeUrl", completeUrl);
  try {
    const res = await fetch(completeUrl, {
      method: "GET",
      headers,
    });
    const response = await res.json();

    return response;
  } catch (error) {
    console.log(error, ">>>>>>>>>");
    return error;
  }
};

export const post = async (url, token, body) => {
  var headers;
  if (token == "" || token == null || token == undefined) {
    headers = {
      "Content-Type": "application/json",
    };
  } else {
    headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
  }
  const completeUrl = Url.BASE_URL + url;
  console.log("completeUrl", completeUrl);
  let data = JSON.stringify(body);
  try {
    const res = await fetch(completeUrl, {
      method: "POST",
      headers,
      body: data,
    });
    const response = await res.json();
    if (response.statusCode == 401) {
      deleteCookie("token");
      deleteCookie("type");
      deleteCookie("userData");
      window?.location?.replace("/");
    }

    return response;
  } catch (error) {
    console.log(error, ">>>>>>>>>");
    return error;
  }
};

export const put = async (url, token, body, hide = false) => {
  var headers;
  if (token == "" || token == null || token == undefined) {
    headers = {
      "Content-Type": "application/json",
    };
  } else {
    headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
  }
  const completeUrl = Url.BASE_URL + url;
  console.log("completeUrl", completeUrl);
  let data = JSON.stringify(body);
  try {
    const res = await fetch(completeUrl, {
      method: "PUT",
      headers,
      body: data,
    });
    const response = await res.json();
    if (response.statusCode == 401) {
      deleteCookie("token");
      deleteCookie("type");
      deleteCookie("userData");
      window?.location?.replace("/");
    }
    return response;
  } catch (error) {
    console.log(error, ">>>>>>>>>");
    return error;
  }
};

export const uploadImageApi = async (url, token, body, hide = false) => {
  var headers;
  console.log({ token });

  if (token == "" || token == null || token == undefined) {
    headers = {
      Accept: "application/json",
    };
  } else {
    headers = {
      Accept: "application/json",
      Authorization: "Bearer " + token,
    };
  }
  const completeUrl = Url.BASE_URL + url;
  console.log("completeUrl", completeUrl);
  try {
    const res = await fetch(completeUrl, {
      method: "POST",
      headers,
      body,
    });
    let response = await res.json();
    if (response.statusCode == 401) {
      deleteCookie("token");
      deleteCookie("type");
      deleteCookie("userData");

      window?.location?.replace("/");
    }
    return response;
  } catch (error) {
    console.log(error, ">>>>>>>>>");
    return error;
  }
};

export const del = async (url, token, hide = false) => {
  var headers;
  if (token == "" || token == null || token == undefined) {
    headers = {
      "Content-Type": "application/json",
    };
  } else {
    headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
  }
  const completeUrl = Url.BASE_URL + url;
  // let data = JSON.stringify(body);
  console.log("completeUrl", completeUrl, "======");
  try {
    const res = await fetch(completeUrl, {
      method: "DELETE",
      headers,
    });
    const response = await res.json();
    if (response.statusCode == 401) {
      deleteCookie("token");
      deleteCookie("type");
      deleteCookie("userData");

      window?.location?.replace("/");
    }
    return response;
  } catch (error) {
    console.log(error, ">>>>>>>>>");
    return error;
  }
};

export const getHome = async (url, token, body) => {
  var headers;
  if (token == "" || token == null || token == undefined) {
    headers = {
      "Content-Type": "application/json",
    };
  } else {
    headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }
  const completeUrl = Url.BASE_URL + url;
  // console.log({ completeUrl });

  try {
    const res = await fetch(completeUrl, {
      method: "GET",
      headers,
    });
    const response = await res.json();

    return response;
  } catch (error) {
    console.log(error, ">>>>>>>>>>");
    return error;
  }
};
