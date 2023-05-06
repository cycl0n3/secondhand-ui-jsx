import axios from "axios";

import qs from "qs";

const BASE_URL = "http://localhost:8080/api/v1";

const client = axios.create({
  baseURL: BASE_URL
});

const login = (username, password) => {
  return client.post(
    "/auth/login",
    qs.stringify({ username, password }),
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    },
  );
};

const register = (username, email, password) => {
  return client.post(
    "/auth/register",
    qs.stringify({ username, email, password }),
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    }
  );
};


export const net = {
  login,
  register
}
