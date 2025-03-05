import axios from "axios";
import { postWarningToast } from "../layouts/Toast";
const isAuthenticated = async () => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    return false; // Không có token
  }
  try {
    const response = await axios.post(
      "http://localhost:8084/api/v1/auth/checkToken",
      { token: accessToken }
    );
    const result = response.data;

    if (result.status === "error") {
      // // localStorage.removeItem("accessToken");
      return false;
    } else {
      return true;
    }
  } catch (error) {
    // // localStorage.removeItem("accessToken");
    return false;
  }
};
const register = async (registerRequest) => {
  try {
    const response = await axios.post(
      "http://localhost:8084/api/v1/auth/register",
      registerRequest
    );
    const result = response.data;
    if (result.status === "error") {
      postWarningToast(result.message);
      return null;
    } else {
      return result.data;
    }
  } catch (error) {
    return null;
  }
};
export { isAuthenticated, register };
