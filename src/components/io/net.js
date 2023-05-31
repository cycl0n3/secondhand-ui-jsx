import axios from "axios";

import qs from "qs";

const BASE_URL = "http://localhost:8080/api/v1";

const client = axios.create({
  baseURL: BASE_URL,
});

const login = (username, password) => {
  return client.post("/auth/login", qs.stringify({ username, password }), {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
};

const register = (first_name, last_name, email, password) => {
  return client.post(
    "/auth/register",
    qs.stringify({ first_name, last_name, email, password }),
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }
  );
};

const upload = (user, file) => {
  const formData = new FormData();
  formData.append("file", file);

  return client.post(
    "/user/picture/" + user.id,
    formData,
    {
      headers: { 
        "Content-Type": "multipart/form-data",
        "Authorization": "Bearer " + user.tokens.accessToken,
      },
    }
  );
};

export const net = {
  login,
  register,
  upload,
};
