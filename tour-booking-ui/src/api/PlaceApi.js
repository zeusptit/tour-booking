import axios from "axios";
import { postErrorToast, postWarningToast } from "../layouts/Toast";
const getPlaceById = async (id) => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    postWarningToast("Cần đăng nhập để thực hiện!");
    return null; // Không có token
  }
  try {
    const response = await axios.get(
      `http://localhost:8084/api/v1/admin/places/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const result = response.data;
    if (result.status === "error") {
      postWarningToast(result.message);
      return null;
    } else {
      return result.data;
    }
  } catch (error) {
    postErrorToast("Đã có lỗi xảy ra");
    // localStorage.removeItem("accessToken");
    return null;
  }
};

const addPlaces = async (placesData) => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    return null; // Không có token
  }
  try {
    const response = await axios.post(
      "http://localhost:8084/api/v1/admin/places",
      placesData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const result = response.data;
    if (result.status === "error") {
      postWarningToast(result.message);
      return null;
    } else {
      return result.data;
    }
  } catch (error) {
    // localStorage.removeItem("accessToken");
    return null;
  }
};
const editPlaces = async (id, placesData) => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    return null; // Không có token
  }
  try {
    const response = await axios.put(
      `http://localhost:8084/api/v1/admin/places/${id}`,
      placesData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const result = response.data;
    if (result.status === "error") {
      postWarningToast(result.message);
      return null;
    } else {
      return result.data;
    }
  } catch (error) {
    // localStorage.removeItem("accessToken");
    return null;
  }
};
const deletePlaces = async (id) => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    postWarningToast("Cần đăng nhập để thực hiện!");
    return null; // Không có token
  }
  try {
    const response = await axios.delete(
      `http://localhost:8084/api/v1/admin/places/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const result = response.data;
    if (result.status === "error") {
      postWarningToast(result.message);
      return null;
    } else {
      return result.data;
    }
  } catch (error) {
    postErrorToast("Đã có lỗi xảy ra");
    // localStorage.removeItem("accessToken");
    return null;
  }
};
export { addPlaces, getPlaceById, editPlaces, deletePlaces };
